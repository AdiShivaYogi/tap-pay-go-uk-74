
import React, { useEffect, useState } from 'react';
import { AutoExecution } from '@/features/agent-autonomy/AutoExecution';
import { useAuth } from '@/hooks/use-auth';
import { useGodModeState } from '@/hooks/agent-god-mode/state/use-god-mode-state';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { AnthropicApiKeyDialog } from '@/components/agents/AnthropicApiKeyDialog';
import { Rocket, Zap, Bug } from 'lucide-react';

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
  const [lastGeneratedProposal, setLastGeneratedProposal] = useState<string | null>(null);
  const [debugLog, setDebugLog] = useState<string[]>([]);

  const addDebugLog = (message: string) => {
    console.log(`[AutonomyEngine Debug] ${message}`);
    setDebugLog(prev => [...prev.slice(-9), message]);
  };

  useEffect(() => {
    console.group('AutonomyEngine Render Debug');
    console.log('User ID:', userId);
    console.log('Is God Mode Enabled:', isGodModeEnabled);
    console.log('Is Generating Proposals:', isGeneratingProposals);
    console.log('Anthropic Connected:', anthropicConnected);
    console.log('Proposals Monitoring Active:', proposalsMonitoringActive);
    console.log('Current Route:', window.location.pathname);
    console.groupEnd();
  }, [userId, isGodModeEnabled, isGeneratingProposals, anthropicConnected, proposalsMonitoringActive]);

  useEffect(() => {
    const checkAnthropicConnection = async () => {
      if (!userId) return;
      
      try {
        setTestingConnection(true);
        addDebugLog('Verificare conexiune Anthropic...');
        
        const { data, error } = await supabase.functions.invoke('check-anthropic-key');
        
        if (error) {
          console.error('Eroare la verificarea cheii Anthropic:', error);
          setAnthropicConnected(false);
          setShowAnthropicStatus(true);
          addDebugLog(`Eroare verificare Anthropic: ${error.message}`);
          
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
        addDebugLog(`Conexiune Anthropic: ${isValid ? 'validă' : 'invalidă'}`);
        
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
        addDebugLog(`Excepție verificare Anthropic: ${err instanceof Error ? err.message : String(err)}`);
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
        addDebugLog('Activare God Mode și configurare sistem autonom...');
        const { data, error } = await supabase.rpc('user_has_role', { _role: 'admin' });
        
        if (error) {
          console.error('Eroare la verificarea rolului:', error);
          addDebugLog(`Eroare verificare rol admin: ${error.message}`);
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
        
        addDebugLog('Configurare sistem autonom completă');
        toast({
          title: "Sistem autonom activat",
          description: "Generarea de propuneri și execuția automată au fost activate.",
        });
        
        setInitialized(true);
        
        await generateAutomaticProposals(true);
      } catch (err) {
        console.error('Eroare la activarea sistemului autonom:', err);
        addDebugLog(`Eroare activare sistem: ${err instanceof Error ? err.message : String(err)}`);
      }
    };
    
    activateGodMode();
  }, [userId, updateAutoExecutionConfig, initialized, toast]);
  
  useEffect(() => {
    if (!initialized || proposalsMonitoringActive || !userId) return;
    
    const startProposalsMonitoring = async () => {
      try {
        addDebugLog('Pornire monitorizare propuneri...');
        const { data, error } = await supabase.functions.invoke('agent-task-monitor', {
          body: { 
            action: 'startMonitoring',
            userId: userId
          }
        });
        
        if (error) {
          console.error('Eroare la pornirea monitorizării:', error);
          addDebugLog(`Eroare pornire monitorizare: ${error.message}`);
          return;
        }
        
        setProposalsMonitoringActive(true);
        addDebugLog('Monitorizare propuneri activată cu succes');
        
        toast({
          title: "Monitorizare propuneri activă",
          description: "Sistemul monitorizează și procesează automat propunerile vitale pentru ecosistem."
        });
        
        await generateAutomaticProposals(true);
      } catch (err) {
        console.error('Eroare la monitorizarea propunerilor:', err);
        addDebugLog(`Excepție monitorizare: ${err instanceof Error ? err.message : String(err)}`);
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
      addDebugLog('Generare activitate test pentru API Anthropic...');
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
        addDebugLog(`Test API eșuat: ${error.message}`);
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
        category: "api-test"
      });
      
      addDebugLog('Test API Anthropic reușit');
      toast({
        title: "Test API Anthropic reușit",
        description: "S-a generat cu succes un răspuns de la modelul Claude folosind API-ul Anthropic.",
      });
      
      await generateAutomaticProposals(true);
    } catch (err) {
      console.error('Eroare la testarea API-ului Anthropic:', err);
      addDebugLog(`Excepție test API: ${err instanceof Error ? err.message : String(err)}`);
    }
  };
  
  const generateAutomaticProposals = async (showNotifications = false) => {
    if (!userId || isGeneratingProposals) return;
    
    try {
      setIsGeneratingProposals(true);
      console.log('Generare propuneri noi...');
      addDebugLog('Începere generare propuneri noi...');
      
      // 1. Generează o propunere directă în baza de date
      try {
        // Obține un ID valid de task din baza de date
        const { data: tasks, error: tasksError } = await supabase
          .from('roadmap_tasks')
          .select('id')
          .limit(1);
          
        if (tasksError) {
          console.error('Eroare la obținerea ID-ului de task:', tasksError);
          addDebugLog(`Eroare obținere task ID: ${tasksError.message}`);
          throw tasksError;
        }
        
        if (!tasks || tasks.length === 0) {
          addDebugLog('Nu s-au găsit task-uri în baza de date pentru a crea o propunere');
          
          // Crează un task nou dacă nu există
          const { data: newTask, error: createTaskError } = await supabase
            .from('roadmap_tasks')
            .insert({
              title: 'Îmbunătățire sistem de agenți autonomi',
              description: 'Task generat automat pentru testarea sistemului de propuneri',
              category: 'autonomy',
              status: 'pending'
            })
            .select();
            
          if (createTaskError) {
            console.error('Eroare la crearea unui task nou:', createTaskError);
            addDebugLog(`Eroare creare task nou: ${createTaskError.message}`);
            throw createTaskError;
          }
          
          addDebugLog(`Task nou creat cu ID: ${newTask?.[0]?.id}`);
          
          // Folosește task-ul nou creat
          const taskProposal = {
            agent_id: "ai-assistant",
            task_id: newTask?.[0]?.id,
            proposed_changes: "VITAL: Propunere generată automat pentru a îmbunătăți performanța sistemului de agenți autonomi. Este necesară integrarea completă a unui sistem de verificare a rezultatelor generate de agenți.",
            proposed_status: "in_progress",
            proposed_progress: 25,
            notes: "Propunere generată automat de sistemul de agenți autonomi",
            approval_status: "pending"
          };
          
          const { data: directSubmission, error: directError } = await supabase
            .from('agent_task_submissions')
            .insert(taskProposal)
            .select();
          
          if (directError) {
            console.error('Eroare la inserarea propunerii directe:', directError);
            addDebugLog(`Eroare inserare propunere: ${directError.message}`);
          } else {
            console.log('Propunere inserată direct în baza de date:', directSubmission);
            addDebugLog(`Propunere inserată cu ID: ${directSubmission?.[0]?.id}`);
            setLastGeneratedProposal(directSubmission?.[0]?.id || null);
            
            if (showNotifications) {
              toast({
                title: "Propunere nouă creată",
                description: "O propunere vitală a fost generată și este disponibilă pentru aprobare.",
                duration: 8000,
              });
            }
          }
        } else {
          // Folosește un task existent
          const taskId = tasks[0].id;
          addDebugLog(`Folosesc task-ul existent cu ID: ${taskId}`);
          
          const taskProposal = {
            agent_id: "ai-assistant",
            task_id: taskId,
            proposed_changes: "VITAL: Propunere generată automat pentru a îmbunătăți performanța sistemului de agenți autonomi. Este necesară integrarea completă a unui sistem de verificare a rezultatelor generate de agenți.",
            proposed_status: "in_progress",
            proposed_progress: 25,
            notes: "Propunere generată automat de sistemul de agenți autonomi",
            approval_status: "pending"
          };
          
          const { data: directSubmission, error: directError } = await supabase
            .from('agent_task_submissions')
            .insert(taskProposal)
            .select();
          
          if (directError) {
            console.error('Eroare la inserarea propunerii directe:', directError);
            addDebugLog(`Eroare inserare propunere: ${directError.message}`);
          } else {
            console.log('Propunere inserată direct în baza de date:', directSubmission);
            addDebugLog(`Propunere inserată cu ID: ${directSubmission?.[0]?.id || 'necunoscut'}`);
            setLastGeneratedProposal(directSubmission?.[0]?.id || null);
            
            if (showNotifications) {
              toast({
                title: "Propunere nouă creată",
                description: "O propunere vitală a fost generată și este disponibilă pentru aprobare.",
                duration: 8000,
              });
            }
          }
        }
      } catch (err) {
        console.error('Eroare la crearea propunerii directe:', err);
        addDebugLog(`Excepție creare propunere directă: ${err instanceof Error ? err.message : String(err)}`);
      }
      
      // 2. Încearcă să folosească funcția pentru generarea de propuneri multiple
      try {
        addDebugLog('Apelare funcție generate-agent-proposals...');
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
          addDebugLog(`Eroare generare propuneri: ${error.message}`);
          return;
        }
        
        console.log('Propuneri generate cu succes:', data);
        addDebugLog(`Propuneri generate via API: ${data?.count || 0}`);
        
        if (showNotifications) {
          toast({
            title: "Propuneri noi generate",
            description: "Au fost generate mai multe propuneri noi, dintre care unele vitale pentru ecosistem.",
            duration: 8000,
          });
        }
      } catch (err) {
        console.error('Eroare la generarea propunerilor via API:', err);
        addDebugLog(`Excepție generare propuneri: ${err instanceof Error ? err.message : String(err)}`);
      }
      
      // 3. Creează și o propunere de cod
      try {
        addDebugLog('Generare propunere de cod...');
        const codeProposal = {
          agent_id: "code-assistant",
          proposed_files: JSON.stringify(["src/components/agents/AutoAgentUpdater.tsx"]),
          proposed_code: "import React from 'react';\n\nexport const AutoAgentUpdater = () => {\n  return <div>Aceasta este o propunere de cod generată automat</div>;\n};",
          motivation: "VITAL: Această componentă este necesară pentru actualizarea automată a agenților și asigurarea funcționalității optime a sistemului autonom.",
          status: "pending"
        };
        
        const { data: codeSubmission, error: codeError } = await supabase
          .from('code_proposals')
          .insert(codeProposal)
          .select();
        
        if (codeError) {
          console.error('Eroare la inserarea propunerii de cod:', codeError);
          addDebugLog(`Eroare inserare cod: ${codeError.message}`);
        } else {
          console.log('Propunere de cod inserată în baza de date:', codeSubmission);
          addDebugLog(`Propunere cod inserată cu ID: ${codeSubmission?.[0]?.id || 'necunoscut'}`);
          
          if (showNotifications) {
            toast({
              title: "Propunere de cod creată",
              description: "O propunere de cod vitală a fost generată și este disponibilă pentru aprobare.",
              duration: 8000,
            });
          }
        }
      } catch (err) {
        console.error('Eroare la crearea propunerii de cod:', err);
        addDebugLog(`Excepție creare propunere cod: ${err instanceof Error ? err.message : String(err)}`);
      }
    } catch (err) {
      console.error('Eroare generală la generarea propunerilor:', err);
      addDebugLog(`Eroare generală: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setIsGeneratingProposals(false);
      addDebugLog('Proces generare propuneri finalizat');
      
      // Forțează o reîncărcare a listelor de propuneri pentru a reflecta noile adăugări
      try {
        const refreshEvent = new CustomEvent('refresh-proposals', { 
          detail: { timestamp: new Date().getTime() } 
        });
        window.dispatchEvent(refreshEvent);
        addDebugLog('Eveniment refresh-proposals trimis');
      } catch (e) {
        console.error('Eroare la trimiterea evenimentului de refresh:', e);
      }
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
        {lastGeneratedProposal && <p>Last Proposal: {lastGeneratedProposal.substring(0, 8)}...</p>}
      </div>
      
      <div className="fixed bottom-4 left-4 z-50">
        <button 
          onClick={() => {
            console.log('Generate Proposals Button Clicked');
            addDebugLog('Buton generare propuneri apăsat');
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
      
      {/* Debug panel */}
      <div className="fixed bottom-20 left-4 z-50 max-w-md bg-gray-900 bg-opacity-90 text-white p-3 rounded-lg text-xs overflow-hidden">
        <div className="flex items-center gap-2 mb-1">
          <Bug className="h-3.5 w-3.5" />
          <span className="font-mono">Debug Log</span>
        </div>
        <div className="max-h-[200px] overflow-y-auto">
          {debugLog.length === 0 ? (
            <p>Nu există informații de debug</p>
          ) : (
            debugLog.map((log, idx) => (
              <p key={idx} className="font-mono text-[10px] opacity-80 truncate mb-0.5">
                {log}
              </p>
            ))
          )}
        </div>
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
