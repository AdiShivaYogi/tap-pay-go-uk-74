
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/types-extension";
import { useToast } from "@/hooks/use-toast";

export const useAgentApi = () => {
  const [hasDeepseekKey, setHasDeepseekKey] = useState<boolean | null>(null);
  const [hasAnthropicKey, setHasAnthropicKey] = useState<boolean | null>(null);
  const [hasOpenRouterKey, setHasOpenRouterKey] = useState<boolean | null>(null);
  const [isApiLoading, setIsApiLoading] = useState(true);
  const [isAnthropicValid, setIsAnthropicValid] = useState<boolean | null>(null);
  const [anthropicModel, setAnthropicModel] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Verificăm dacă există chei API configurate
  useEffect(() => {
    const checkApiKeys = async () => {
      try {
        setIsApiLoading(true);
        
        // Verificăm cheia Anthropic - verificare detaliată
        const { data: anthropicData, error: anthropicError } = await supabase.functions.invoke('check-anthropic-key', {
          body: {}
        });
        
        if (!anthropicError && anthropicData?.hasKey) {
          setHasAnthropicKey(true);
          setIsAnthropicValid(anthropicData?.isValid === true);
          setAnthropicModel(anthropicData?.model || null);
          
          console.log('Cheie Anthropic API configurată:', anthropicData);
          
          // Afișăm notificare doar în cazul unei validări reușite
          if (anthropicData?.isValid) {
            toast({
              title: "API Anthropic configurat corect",
              description: `Model disponibil: ${anthropicData?.model || 'Claude'}`,
              duration: 3000,
            });
          }
        } else {
          setHasAnthropicKey(false);
          setIsAnthropicValid(false);
          console.log('Nu există o cheie Anthropic API configurată sau a apărut o eroare:', anthropicError);
        }
        
        // Verificăm cheia Deepseek
        const { data: deepseekData, error: deepseekError } = await supabase.functions.invoke('check-deepseek-key', {
          body: {}
        });
        
        if (!deepseekError && deepseekData?.hasKey) {
          setHasDeepseekKey(true);
          console.log('Cheie Deepseek API configurată corect:', deepseekData.keyInfo);
        } else {
          setHasDeepseekKey(false);
          console.log('Nu există o cheie Deepseek API configurată sau a apărut o eroare:', deepseekError);
        }
        
        // Verificăm cheia OpenRouter
        const { data: openRouterData, error: openRouterError } = await supabase.functions.invoke('check-openrouter-key', {
          body: {}
        });
        
        if (!openRouterError && openRouterData?.hasKey) {
          setHasOpenRouterKey(true);
          console.log('Cheie OpenRouter API configurată corect');
        } else {
          setHasOpenRouterKey(false);
          console.log('Nu există o cheie OpenRouter API configurată sau a apărut o eroare:', openRouterError);
        }
      } catch (err) {
        console.error('Eroare la verificarea cheilor API:', err);
        setHasDeepseekKey(false);
        setHasAnthropicKey(false);
        setHasOpenRouterKey(false);
        setIsAnthropicValid(false);
      } finally {
        setIsApiLoading(false);
      }
    };
    
    checkApiKeys();
  }, [toast]);

  return { 
    hasDeepseekKey,
    hasAnthropicKey,
    hasOpenRouterKey,
    isAnthropicValid,
    anthropicModel,
    isApiLoading 
  };
};
