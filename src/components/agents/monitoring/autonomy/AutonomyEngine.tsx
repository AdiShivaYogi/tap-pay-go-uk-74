
import React, { useEffect, useState } from 'react';
import { AutoExecution } from '@/features/agent-autonomy/AutoExecution';
import { useAuth } from '@/hooks/use-auth';
import { useGodModeState } from '@/hooks/agent-god-mode/state/use-god-mode-state';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { AnthropicApiKeyDialog } from '@/components/agents/AnthropicApiKeyDialog';

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

  // Verifică explicit starea conexiunii Anthropic la încărcare
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
          
          // Generăm o activitate de test pentru a demonstra că sistemul funcționează
          await generateTestActivity();
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
    
    // Verificăm conexiunea la încărcare
    checkAnthropicConnection();
  }, [userId, toast]);

  // Activează automat God Mode la prima încărcare
  useEffect(() => {
    const activateGodMode = async () => {
      if (!userId || initialized) return;

      try {
        // Verifică dacă utilizatorul are rol de admin sau activăm pentru toți
        const { data, error } = await supabase.rpc('user_has_role', { _role: 'admin' });
        
        if (error) {
          console.error('Eroare la verificarea rolului:', error);
          return;
        }
        
        // Activăm God Mode și nivel maxim de autonomie
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
      } catch (err) {
        console.error('Eroare la activarea sistemului autonom:', err);
      }
    };
    
    activateGodMode();
  }, [userId, updateAutoExecutionConfig, initialized, toast]);
  
  // Monitorizare continuă pentru propuneri noi și implementare automată
  useEffect(() => {
    if (!initialized || proposalsMonitoringActive || !userId) return;
    
    const startProposalsMonitoring = async () => {
      try {
        // Activăm monitorizarea propunerilor
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
      } catch (err) {
        console.error('Eroare la monitorizarea propunerilor:', err);
      }
    };
    
    // Pornim monitorizarea propunerilor
    startProposalsMonitoring();
    
    // Setăm un interval pentru a genera propuneri automat la fiecare 3 minute
    const interval = setInterval(() => {
      generateAutomaticProposals();
    }, 3 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [initialized, proposalsMonitoringActive, userId, toast]);
  
  // Generează o activitate de test pentru a demonstra că sistemul funcționează
  const generateTestActivity = async () => {
    if (!userId) return;
    
    try {
      // Testăm interogarea directă a modelului Claude
      const { data, error } = await supabase.functions.invoke('generate-agent-response', {
        body: {
          message: "Verificare conexiune API Anthropic Claude",
          model: "anthropic", // Folosim direct modelul Anthropic
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
      
      // Înregistrăm activitatea reușită
      await supabase.from('agent_activity_logs').insert({
        agent_id: "anthropic-api-test",
        agent_name: "Test API Anthropic", // Added missing agent_name field
        description: "Test conexiune API Anthropic reușit: " + data.response.substring(0, 30) + "...",
        category: "api-test",
        timestamp: new Date().toISOString()
      });
      
      toast({
        title: "Test API Anthropic reușit",
        description: "S-a generat cu succes un răspuns de la modelul Claude folosind API-ul Anthropic.",
      });
      
      // Generăm și propunere de task
      generateAutomaticProposals();
    } catch (err) {
      console.error('Eroare la testarea API-ului Anthropic:', err);
    }
  };
  
  // Funcție pentru generarea automată de propuneri
  const generateAutomaticProposals = async () => {
    if (!userId) return;
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-agent-proposals', {
        body: { 
          action: 'generate',
          count: 3,  // Generăm 3 propuneri importante
          priority: 'high',
          userId: userId,
          vitalCount: 2 // Dintre care 2 vitale
        }
      });
      
      if (error) {
        console.error('Eroare la generarea propunerilor:', error);
        return;
      }
      
      console.log('Propuneri generate cu succes:', data);
      
      toast({
        title: "Propuneri noi generate",
        description: "Au fost generate 3 propuneri noi, dintre care 2 vitale pentru ecosistem.",
      });
    } catch (err) {
      console.error('Eroare la generarea propunerilor:', err);
    }
  };

  return (
    <>
      <AutoExecution />
      
      {/* Dialog pentru configurare API Anthropic când e nevoie */}
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
