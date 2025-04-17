import React, { useEffect, useState } from 'react';
import { AutoExecution } from '@/features/agent-autonomy/AutoExecution';
import { useAuth } from '@/hooks/use-auth';
import { useGodModeState } from '@/hooks/agent-god-mode/state/use-god-mode-state';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { AnthropicApiKeyDialog } from '@/components/agents/AnthropicApiKeyDialog';
import { Rocket, Zap } from 'lucide-react';

export const AutonomyEngine: React.FC = () => {
  const { user } = useAuth();
  const userId = user?.id;
  const { toast } = useToast();
  const { isGodModeEnabled, toggleGodMode, autoExecutionConfig, updateAutoExecutionConfig } = useGodModeState({ userId });
  const [initialized, setInitialized] = useState<boolean>(false);
  const [proposalsMonitoringActive, setProposalsMonitoringActive] = useState<boolean>(false);
  const [showAnthropicStatus, setShowAnthropicStatus] = useState<boolean>(false);
  const [anthropicConnected, setAnthropicConnected] = useState<boolean>(false);
  const [testingConnection, setTestingConnection] = useState<boolean>(false);
  const [isGeneratingProposals, setIsGeneratingProposals] = useState<boolean>(false);

  useEffect(() => {
    console.group('AutonomyEngine Render Debug');
    console.log('User ID:', userId);
    console.log('Is God Mode Enabled:', isGodModeEnabled);
    console.log('Is Generating Proposals:', isGeneratingProposals);
    console.log('Anthropic Connected:', anthropicConnected);
    console.log('Proposals Monitoring Active:', proposalsMonitoringActive);
    console.groupEnd();
  }, [userId, isGodModeEnabled, isGeneratingProposals, anthropicConnected, proposalsMonitoringActive]);

  useEffect(() => {
    const checkAnthropicConnection = async () => {
      if (!userId) return;
      
      try {
        setTestingConnection(true);
        
        const { data, error } = await supabase.functions.invoke('check-anthropic-key');
        
        if (error) {
          console.error('Eroare la verificarea cheii Anthropic:', error);
          setAnthropicConnected(false);
          setShowAnthropicStatus(true);
          
          toast({
            title: "Eroare API Anthropic",
            description: "Conexiunea cu API-ul Claude (Anthropic) nu funcționează. Verificați cheia API.",
            variant: "destructive",
          });
          
          return;
        }
        
        const isValid = data?.isValid === true;
        setAnthropicConnected(isValid);
        setShowAnthropicStatus(true);
        
        if (isValid) {
          console.log("Conexiune Anthropic validată cu succes!");
          toast({
            title: "API Anthropic funcțional",
            description: "Conexiunea cu modelul Claude de la Anthropic funcționează corect.",
            duration: 5000,
          });
          
          await generateTestActivity();
          
          await generateAutomaticProposals(true);
        } else {
          toast({
            title: "Problemă API Anthropic",
            description: "Cheia API există dar nu este validă sau a expirat.",
            variant: "destructive",
          });
        }
      } catch (err) {
        console.error('Excepție la verificarea API Anthropic:', err);
        setAnthropicConnected(false);
      } finally {
        setTestingConnection(false);
      }
    };
    
    checkAnthropicConnection();
  }, [userId, toast]);

  useEffect(() => {
    const activateGodMode = async () => {
      if (!userId || initialized) return;

      try {
        const { data, error } = await supabase.rpc('user_has_role', { _role: 'admin' });
        
        if (error) {
          console.error('Eroare la verificarea rolului:', error);
          return;
        }
        
        await updateAutoExecutionConfig({
          enabled: true,
          autonomyLevel: 100,
          autoApproveThreshold: 90,
          feedbackStyle: "constructive",
          useAnthropicDirect: true,
          preferredModel: "anthropic"
        });
        
        toast({
          title: "Sistem autonom activat",
          description: "Generarea de propuneri și execuția automată au fost activate.",
        });
        
        setInitialized(true);
        
        await generateAutomaticProposals(true);
      } catch (err) {
        console.error('Eroare la activarea sistemului autonom:', err);
      }
    };
    
    activateGodMode();
  }, [userId, updateAutoExecutionConfig, initialized, toast]);
  
  useEffect(() => {
    if (!initialized || proposalsMonitoringActive || !userId) return;
    
    const startProposalsMonitoring = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('agent-task-monitor', {
          body: { 
            action: 'startMonitoring',
            userId: userId
          }
        });
        
        if (error) {
          console.error('Eroare la pornirea monitorizării:', error);
          return;
        }
        
        setProposalsMonitoringActive(true);
        
        toast({
          title: "Monitorizare propuneri activă",
          description: "Sistemul monitorizează și procesează automat propunerile vitale pentru ecosistem."
        });
        
        await generateAutomaticProposals(true);
      } catch (err) {
        console.error('Eroare la monitorizarea propunerilor:', err);
      }
    };
    
    startProposalsMonitoring();
    
    const interval = setInterval(() => {
      generateAutomaticProposals();
    }, 60 * 1000);
    
    return () => clearInterval(interval);
  }, [initialized, proposalsMonitoringActive, userId, toast]);
  
  const generateTestActivity = async () => {
    if (!userId) return;
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-agent-response', {
        body: {
          message: "Verificare conexiune API Anthropic Claude",
          model: "anthropic",
          systemRole: "Agent de verificare conexiune",
          isCodeProposal: false
        }
      });
      
      if (error) {
        console.error('Eroare la testarea API-ului Anthropic:', error);
        toast({
          title: "Test eșuat",
          description: "Nu s-a putut genera un răspuns de test prin API-ul Anthropic.",
          variant: "destructive",
        });
        return;
      }
      
      await supabase.from('agent_activity_logs').insert({
        agent_id: "anthropic-api-test",
        agent_name: "Test API Anthropic",
        description: "Test conexiune API Anthropic reușit: " + data.response.substring(0, 30) + "...",
        category: "api-test",
        timestamp: new Date().toISOString()
      });
      
      toast({
        title: "Test API Anthropic reușit",
        description: "S-a generat cu succes un răspuns de la modelul Claude folosind API-ul Anthropic.",
      });
      
      await generateAutomaticProposals(true);
    } catch (err) {
      console.error('Eroare la testarea API-ului Anthropic:', err);
    }
  };
  
  const generateAutomaticProposals = async (showNotifications = false) => {
    if (!userId || isGeneratingProposals) return;
    
    try {
      setIsGeneratingProposals(true);
      console.log('Generare propuneri noi...');
      
      const taskProposal = {
        agent_id: "ai-assistant",
        task_id: "00000000-0000-0000-0000-000000000000",
        proposed_changes: "VITAL: Propunere generată automat pentru a îmbunătăți performanța sistemului de agenți autonomi. Este necesară integrarea completă a unui sistem de verificare a rezultatelor generate de agenți pentru a asigura calitatea și siguranța acestora.",
        proposed_status: "pending",
        proposed_progress: 0,
        notes: "Propunere generată automat de sistemul de agenți autonomi",
        approval_status: "pending"
      };
      
      const { data: directSubmission, error: directError } = await supabase
        .from('agent_task_submissions')
        .insert(taskProposal);
      
      if (directError) {
        console.error('Eroare la inserarea propunerii directe:', directError);
      } else {
        console.log('Propunere inserată direct în baza de date');
        
        if (showNotifications) {
          toast({
            title: "Propunere nouă creată",
            description: "O propunere vitală a fost generată și este disponibilă pentru aprobare.",
            duration: 8000,
          });
        }
      }
      
      const { data, error } = await supabase.functions.invoke('generate-agent-proposals', {
        body: { 
          action: 'generate',
          count: 3,
          priority: 'high',
          userId: userId,
          vitalCount: 2,
          forceGenerate: true
        }
      });
      
      if (error) {
        console.error('Eroare la generarea propunerilor:', error);
        return;
      }
      
      console.log('Propuneri generate cu succes:', data);
      
      if (showNotifications) {
        toast({
          title: "Propuneri noi generate",
          description: "Au fost generate mai multe propuneri noi, dintre care unele vitale pentru ecosistem.",
          duration: 8000,
        });
      }
    } catch (err) {
      console.error('Eroare la generarea propunerilor:', err);
    } finally {
      setIsGeneratingProposals(false);
    }
  };

  return (
    <>
      <AutoExecution />
      
      <div className="fixed top-4 right-4 z-50 bg-yellow-100 p-2 rounded-lg text-xs">
        <p>User ID: {userId || 'No User'}</p>
        <p>God Mode: {isGodModeEnabled ? 'Enabled' : 'Disabled'}</p>
        <p>Generating: {isGeneratingProposals ? 'Yes' : 'No'}</p>
        <p>Anthropic: {anthropicConnected ? 'Connected' : 'Disconnected'}</p>
      </div>
      
      <div className="fixed bottom-4 left-4 z-50">
        <button 
          onClick={() => {
            console.log('Generate Proposals Button Clicked');
            generateAutomaticProposals(true);
          }}
          disabled={isGeneratingProposals}
          className={`
            flex items-center justify-center gap-2 
            bg-gradient-to-r from-purple-600 to-indigo-600 
            text-white px-4 py-2 rounded-lg 
            shadow-lg hover:from-purple-700 hover:to-indigo-700 
            transition-all duration-300 ease-in-out
            ${isGeneratingProposals ? 'opacity-60 cursor-not-allowed' : 'hover:scale-105'}
          `}
        >
          {isGeneratingProposals ? (
            <>
              <Zap className="animate-pulse h-5 w-5" />
              Generare...
            </>
          ) : (
            <>
              <Rocket className="h-5 w-5" />
              Generează Propuneri
            </>
          )}
        </button>
      </div>
      
      {showAnthropicStatus && !anthropicConnected && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 shadow-lg max-w-md">
            <h4 className="font-medium text-amber-800 mb-2">Conexiune API Anthropic necesară</h4>
            <p className="text-sm text-amber-700 mb-3">
              Pentru funcționarea optimă a agenților autonomi, configurați API-ul Claude (Anthropic).
            </p>
            <div className="mt-2">
              <AnthropicApiKeyDialog />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
