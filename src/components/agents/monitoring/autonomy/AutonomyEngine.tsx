
import React, { useEffect, useState } from 'react';
import { AutoExecution } from '@/features/agent-autonomy/AutoExecution';
import { useAuth } from '@/hooks/use-auth';
import { useGodModeState } from '@/hooks/agent-god-mode/state/use-god-mode-state';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const AutonomyEngine: React.FC = () => {
  const { user } = useAuth();
  const userId = user?.id;
  const { toast } = useToast();
  const { isGodModeEnabled, toggleGodMode, autoExecutionConfig, updateAutoExecutionConfig } = useGodModeState({ userId });
  const [initialized, setInitialized] = useState<boolean>(false);
  const [proposalsMonitoringActive, setProposalsMonitoringActive] = useState<boolean>(false);

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
    
    // Setăm un interval pentru a genera propuneri automat la fiecare 5 minute
    const interval = setInterval(() => {
      generateAutomaticProposals();
    }, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [initialized, proposalsMonitoringActive, userId, toast]);
  
  // Funcție pentru generarea automată de propuneri
  const generateAutomaticProposals = async () => {
    if (!userId) return;
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-agent-proposals', {
        body: { 
          action: 'generate',
          count: 3,  // Generăm 3 propuneri importante
          priority: 'high',
          userId: userId
        }
      });
      
      if (error) {
        console.error('Eroare la generarea propunerilor:', error);
        return;
      }
      
      console.log('Propuneri generate cu succes:', data);
    } catch (err) {
      console.error('Eroare la generarea propunerilor:', err);
    }
  };

  return (
    <>
      <AutoExecution />
    </>
  );
};
