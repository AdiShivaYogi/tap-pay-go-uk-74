
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AutoExecutionConfig } from "../types";
import { toast } from "@/hooks/use-toast";  // Adăugăm toast pentru feedback

export interface UseGodModeStateProps {
  userId?: string;
}

const defaultConfig: AutoExecutionConfig = {
  enabled: false,  // Asigurăm că valoarea implicită este false
  useAnthropicDirect: true,
  preferredModel: "anthropic",
  autonomyLevel: 80,
  feedbackStyle: "constructive",
  autoApproveThreshold: 85
};

export const useGodModeState = (props?: UseGodModeStateProps) => {
  const [isGodModeEnabled, setIsGodModeEnabled] = useState<boolean>(false);
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
          setIsGodModeEnabled(config.enabled || false);
          setAutoExecutionConfig(config);
        }
      } catch (err) {
        console.error('Exception loading God Mode config:', err);
      }
    };
    
    loadGodModeConfig();
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
    
    const newState = !isGodModeEnabled;
    
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
        description: newState 
          ? "God Mode a fost activat. Propunerile vor fi aprobate automat." 
          : "God Mode a fost dezactivat. Propunerile vor necesita aprobare manuală."
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
    
    const updatedConfig: AutoExecutionConfig = {
      ...autoExecutionConfig,
      ...updates
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
      if (updates.hasOwnProperty('enabled')) {
        setIsGodModeEnabled(!!updatedConfig.enabled);
        
        toast({
          title: "God Mode",
          description: updatedConfig.enabled 
            ? "God Mode a fost activat. Propunerile vor fi aprobate automat." 
            : "God Mode a fost dezactivat. Propunerile vor necesita aprobare manuală."
        });
      } else {
        toast({
          title: "Configurație actualizată",
          description: "Setările God Mode au fost actualizate cu succes."
        });
      }
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
    isGodModeEnabled,
    toggleGodMode,
    autoExecutionConfig,
    updateAutoExecutionConfig
  };
};
