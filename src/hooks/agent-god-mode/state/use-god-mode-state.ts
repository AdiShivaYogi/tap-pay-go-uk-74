
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AutoExecutionConfig } from "../types";
import { toast } from "@/hooks/use-toast";

export interface UseGodModeStateProps {
  userId?: string;
}

const defaultConfig: AutoExecutionConfig = {
  enabled: true,
  useAnthropicDirect: true,
  preferredModel: "anthropic",
  autonomyLevel: 100,
  feedbackStyle: "constructive",
  autoApproveThreshold: 95
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
          setIsGodModeEnabled(true);
          setAutoExecutionConfig({...config, enabled: true});
        } else {
          // Dacă nu există configurație, forțăm activarea cu setări implicite
          const updatedConfig = {
            ...defaultConfig,
            enabled: true,
            autonomyLevel: 100, // Setăm nivelul de autonomie la maxim
            autoApproveThreshold: 90 // Pragul de aprobare automată ridicat
          };
          
          await (supabase as any)
            .from('user_preferences')
            .upsert({
              user_id: props.userId,
              god_mode_config: updatedConfig,
              updated_at: new Date().toISOString()
            });
            
          setAutoExecutionConfig(updatedConfig);
          setIsGodModeEnabled(true);
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
          enabled: true,
          autonomyLevel: 100, // Forțăm autonomie maximă
          autoApproveThreshold: 90 // Prag ridicat de aprobare automată
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
          title: "Sistem de Propuneri Activat",
          description: "Agenții vor genera automat propuneri de task-uri vitale pentru ecosistem.",
          variant: "default"
        });
        
        // Declanșăm generarea automată de propuneri
        await triggerAutomaticProposals();
      } catch (err) {
        console.error('Excepție la activarea God Mode:', err);
      }
    };
    
    // Funcție pentru a declanșa generarea de propuneri de la agenți
    const triggerAutomaticProposals = async () => {
      try {
        // Obținem lista de agenți pentru a genera propuneri
        const response = await supabase.functions.invoke('generate-agent-proposals', {
          body: { 
            action: 'generate',
            count: 5, // Generează 5 propuneri importante
            priority: 'high'
          }
        });
        
        if (response.error) {
          console.error('Eroare la generarea propunerilor:', response.error);
          return;
        }
        
        toast({
          title: "Propuneri Generate",
          description: "Au fost generate noi propuneri de task-uri vitale pentru ecosistem.",
        });
      } catch (err) {
        console.error('Excepție la generarea propunerilor:', err);
      }
    };
    
    activateGodModeImmediately();
    
    // Setăm un interval pentru a declanșa periodic generarea de propuneri
    const interval = setInterval(() => {
      triggerAutomaticProposals();
    }, 15 * 60 * 1000); // La fiecare 15 minute
    
    return () => clearInterval(interval);
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
        enabled: newState,
        autonomyLevel: 100, // Forțăm autonomie maximă
        autoApproveThreshold: 90 // Prag ridicat de aprobare automată
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
        title: "Sistem de Propuneri Activ",
        description: "Agenții generează propuneri vitale pentru ecosistem în mod automat."
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
      enabled: true,
      autonomyLevel: Math.max(updates.autonomyLevel || autoExecutionConfig.autonomyLevel, 90) // Asigurăm minim 90%
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
        title: "Configurație Actualizată",
        description: "Setările sistemului de propuneri au fost actualizate."
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
