
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/types-extension";

export const useAgentApi = () => {
  const [hasDeepseekKey, setHasDeepseekKey] = useState<boolean | null>(null);
  const [isApiLoading, setIsApiLoading] = useState(false);
  
  // Verificăm dacă există o cheie API Deepseek configurată
  useEffect(() => {
    const checkDeepseekKey = async () => {
      try {
        // Încercăm să obținem o confirmare că există o cheie API configurată
        setIsApiLoading(true);
        const { data, error } = await supabase.functions.invoke('check-deepseek-key', {
          body: {}
        });
        
        if (!error && data?.hasKey) {
          setHasDeepseekKey(true);
          console.log('Cheie Deepseek API configurată corect:', data.keyInfo);
        } else {
          setHasDeepseekKey(false);
          console.log('Nu există o cheie Deepseek API configurată sau a apărut o eroare:', error);
        }
      } catch (err) {
        console.error('Eroare la verificarea cheii Deepseek:', err);
        setHasDeepseekKey(false);
      } finally {
        setIsApiLoading(false);
      }
    };
    
    checkDeepseekKey();
  }, []);

  return { 
    hasDeepseekKey, 
    isApiLoading 
  };
};
