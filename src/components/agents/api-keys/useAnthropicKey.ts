
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export function useAnthropicKey() {
  const [isOpen, setIsOpen] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [hasKey, setHasKey] = useState(false);
  const [isKeyValid, setIsKeyValid] = useState(false);
  const [model, setModel] = useState('');
  const [isChecking, setIsChecking] = useState(true);
  const { toast } = useToast();

  // Verifică cheia existentă la încărcarea componentei
  useEffect(() => {
    const checkExistingKey = async () => {
      try {
        setIsChecking(true);
        const { data, error } = await supabase.functions.invoke('check-anthropic-key');

        if (error) {
          console.error('Error checking Anthropic key:', error);
          return;
        }

        if (data) {
          setHasKey(data.hasKey);
          setIsKeyValid(data.isValid);
          
          if (data.model) {
            setModel(data.model);
          }
        }
      } catch (err) {
        console.error('Exception in checking Anthropic key:', err);
      } finally {
        setIsChecking(false);
      }
    };

    checkExistingKey();
  }, []);

  const handleSaveApiKey = async () => {
    if (!apiKey.trim()) {
      toast({
        title: "Cheie invalidă",
        description: "Vă rugăm să introduceți o cheie API validă",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    setStatus('loading');
    setErrorMessage('');

    try {
      const { data, error } = await supabase.functions.invoke('set-anthropic-key', {
        body: { key: apiKey }
      });

      if (error) {
        throw new Error(error.message || 'A apărut o eroare la salvarea cheii API');
      }

      if (data.validated) {
        setStatus('success');
        setHasKey(true);
        setIsKeyValid(true);
        
        if (data.availableModel) {
          setModel(data.availableModel);
        }
        
        toast({
          title: "Cheie API salvată",
          description: "Cheia API Anthropic a fost configurată cu succes",
        });
      } else {
        throw new Error(data.error || 'Validarea cheii a eșuat');
      }
    } catch (err) {
      console.error('Error saving Anthropic key:', err);
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Eroare necunoscută');
      setIsKeyValid(false);
      
      toast({
        title: "Eroare",
        description: err instanceof Error ? err.message : 'Eroare la salvarea cheii API',
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isOpen, 
    setIsOpen, 
    apiKey, 
    setApiKey, 
    isSubmitting, 
    status, 
    errorMessage, 
    hasKey,
    isKeyValid,
    model,
    isChecking,
    handleSaveApiKey
  };
}
