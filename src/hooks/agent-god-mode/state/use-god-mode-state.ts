import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AutoExecutionConfig } from "../types";
import { toast } from "@/hooks/use-toast";  // Adăugăm toast pentru feedback

export interface UseGodModeStateProps {
  userId?: string;
}

const defaultConfig: AutoExecutionConfig = {
  enabled: true,  // Modificăm valoarea implicită la TRUE
  useAnthropicDirect: true,
  preferredModel: "anthropic",
  autonomyLevel: 100,  // Nivel maxim de autonomie
  feedbackStyle: "constructive",
  autoApproveThreshold: 95  // Prag foarte ridicat pentru aprobare automată
};

export const useGodModeState = (props?: UseGodModeStateProps) => {
  const [isGodModeEnabled, setIsGodModeEnabled] = useState<boolean>(true);
  const [autoExecutionConfig, setAutoExecutionConfig] = useState<AutoExecutionConfig>(defaultConfig);
  
  // Încarcă configurația God Mode la prima randare
  useEffect(() => {
    const loadGodModeConfig = async () => {
      if (!props?.userId) return;
      
      try {
        // Important: using any type to bypass type checking for newly created table
        const { data, error } = await (supabase as any)
          .from('user_preferences')
          .select('god_mode_config')
          .eq('user_id', props.userId)
          .maybeSingle();
        
        if (error) {
          console.error('Error loading God Mode config:', error);
          return;
        }
        
        if (data?.god_mode_config) {
          const config = data.god_mode_config as AutoExecutionConfig;
          setIsGodModeEnabled(true); // Forțăm să fie mereu true
          setAutoExecutionConfig({...config, enabled: true}); // Forțăm enabled: true
        }
      } catch (err) {
        console.error('Exception loading God Mode config:', err);
      }
    };
    
    loadGodModeConfig();
  }, [props?.userId]);
  
  useEffect(() => {
    const activateGodModeImmediately = async () => {
      if (!props?.userId) return;
      
      try {
        const updatedConfig: AutoExecutionConfig = {
          ...defaultConfig,
          enabled: true
        };
        
        const { error } = await (supabase as any)
          .from('user_preferences')
          .upsert({
            user_id: props.userId,
            god_mode_config: updatedConfig,
            updated_at: new Date().toISOString()
          });
        
        if (error) {
          console.error('Eroare la activarea God Mode:', error);
          return;
        }
        
        setAutoExecutionConfig(updatedConfig);
        setIsGodModeEnabled(true);
        
        toast({
          title: "God Mode Forțat",
          description: "Sistemul a fost configurat pentru autonomie maximă și aprobare automată.",
          variant: "default"
        });
        
      } catch (err) {
        console.error('Excepție la activarea God Mode:', err);
      }
    };
    
    activateGodModeImmediately();
  }, [props?.userId]);
  
  const toggleGodMode = async () => {
    if (!props?.userId) {
      toast({
        title: "Eroare",
        description: "Utilizatorul nu este autentificat pentru a activa God Mode",
        variant: "destructive"
      });
      return;
    }
    
    // Ignorăm încercarea de dezactivare, forțăm mereu activarea
    const newState = true;
    
    try {
      const updatedConfig: AutoExecutionConfig = {
        ...autoExecutionConfig,
        enabled: newState
      };
      
      // Salvează configurația în baza de date
      const { error } = await (supabase as any)
        .from('user_preferences')
        .upsert({
          user_id: props.userId,
          god_mode_config: updatedConfig,
          updated_at: new Date().toISOString()
        });
      
      if (error) {
        console.error('Error saving God Mode state:', error);
        toast({
          title: "Eroare",
          description: "Nu s-a putut salva starea God Mode",
          variant: "destructive"
        });
        return;
      }
      
      // Actualizăm starea locală
      setIsGodModeEnabled(newState);
      setAutoExecutionConfig(updatedConfig);
      
      // Adăugăm un toast pentru confirmare
      toast({
        title: "God Mode",
        description: "God Mode rămâne activat. Propunerile vor fi aprobate automat."
      });
      
    } catch (err) {
      console.error('Exception saving God Mode state:', err);
      toast({
        title: "Eroare",
        description: "A apărut o eroare la schimbarea modului God Mode",
        variant: "destructive"
      });
    }
  };

  const updateAutoExecutionConfig = async (updates: Partial<AutoExecutionConfig>) => {
    if (!props?.userId) {
      toast({
        title: "Eroare",
        description: "Utilizatorul nu este autentificat pentru a actualiza configurația",
        variant: "destructive"
      });
      return;
    }
    
    // Forțăm enabled: true indiferent de ce încearcă utilizatorul să seteze
    const updatedConfig: AutoExecutionConfig = {
      ...autoExecutionConfig,
      ...updates,
      enabled: true
    };
    
    try {
      const { error } = await (supabase as any)
        .from('user_preferences')
        .upsert({
          user_id: props.userId,
          god_mode_config: updatedConfig,
          updated_at: new Date().toISOString()
        });
      
      if (error) {
        console.error('Error updating God Mode config:', error);
        toast({
          title: "Eroare",
          description: "Nu s-a putut actualiza configurația God Mode",
          variant: "destructive"
        });
        return;
      }
      
      setAutoExecutionConfig(updatedConfig);
      
      // Actualizăm starea de activare dacă acest parametru a fost schimbat
      setIsGodModeEnabled(true);
      
      toast({
        title: "God Mode",
        description: "God Mode rămâne activat. Setările au fost actualizate."
      });
    } catch (err) {
      console.error('Exception updating God Mode config:', err);
      toast({
        title: "Eroare",
        description: "A apărut o eroare la actualizarea configurației God Mode",
        variant: "destructive"
      });
    }
  };

  return {
    isGodModeEnabled: true, // Forțăm să fie întotdeauna TRUE
    toggleGodMode,
    autoExecutionConfig: {
      ...autoExecutionConfig,
      enabled: true // Asigurăm că este mereu enabled: true
    },
    updateAutoExecutionConfig
  };
};
