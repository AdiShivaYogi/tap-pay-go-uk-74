
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

  // Activează automat God Mode la prima încărcare dacă utilizatorul este admin
  useEffect(() => {
    const activateGodMode = async () => {
      if (!userId || initialized) return;

      try {
        // Verifică dacă utilizatorul are rol de admin
        const { data, error } = await supabase.rpc('user_has_role', { _role: 'admin' });
        
        if (error) {
          console.error('Eroare la verificarea rolului:', error);
          return;
        }
        
        // Dacă utilizatorul este admin și God Mode nu este activat, activează-l
        if (data && !isGodModeEnabled) {
          await updateAutoExecutionConfig({
            enabled: true,
            autonomyLevel: 85,
            autoApproveThreshold: 80,
            feedbackStyle: "constructive",
            useAnthropicDirect: true,
            preferredModel: "anthropic"
          });
          
          toast({
            title: "God Mode activat automat",
            description: "Sistemul de aprobare automată și generare de feedback a fost activat pentru agenți.",
          });
        }
        
        setInitialized(true);
      } catch (err) {
        console.error('Eroare la activarea God Mode:', err);
      }
    };
    
    activateGodMode();
  }, [userId, isGodModeEnabled, updateAutoExecutionConfig, initialized, toast]);

  return (
    <>
      <AutoExecution />
    </>
  );
};
