
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AutoExecutionConfig } from "../types";

export interface UseGodModeStateProps {
  userId?: string;
}

const defaultConfig: AutoExecutionConfig = {
  enabled: false,
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
        const { data, error } = await supabase
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
    const newState = !isGodModeEnabled;
    setIsGodModeEnabled(newState);
    
    if (!props?.userId) return;
    
    try {
      const updatedConfig: AutoExecutionConfig = {
        ...autoExecutionConfig,
        enabled: newState
      };
      
      // Salvează configurația în baza de date
      const { error } = await supabase
        .from('user_preferences')
        .upsert({
          user_id: props.userId,
          god_mode_config: updatedConfig,
          updated_at: new Date().toISOString()
        });
      
      if (error) {
        console.error('Error saving God Mode state:', error);
        // Revert starea dacă salvarea a eșuat
        setIsGodModeEnabled(!newState);
        return;
      }
      
      setAutoExecutionConfig(updatedConfig);
    } catch (err) {
      console.error('Exception saving God Mode state:', err);
      // Revert starea dacă salvarea a eșuat
      setIsGodModeEnabled(!newState);
    }
  };
  
  const updateAutoExecutionConfig = async (updates: Partial<AutoExecutionConfig>) => {
    if (!props?.userId) return;
    
    const updatedConfig: AutoExecutionConfig = {
      ...autoExecutionConfig,
      ...updates
    };
    
    try {
      const { error } = await supabase
        .from('user_preferences')
        .upsert({
          user_id: props.userId,
          god_mode_config: updatedConfig,
          updated_at: new Date().toISOString()
        });
      
      if (error) {
        console.error('Error updating God Mode config:', error);
        return;
      }
      
      setAutoExecutionConfig(updatedConfig);
    } catch (err) {
      console.error('Exception updating God Mode config:', err);
    }
  };

  return {
    isGodModeEnabled,
    toggleGodMode,
    autoExecutionConfig,
    updateAutoExecutionConfig
  };
};
