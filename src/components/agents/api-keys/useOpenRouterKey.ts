
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export function useOpenRouterKey() {
  const [isOpen, setIsOpen] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [hasKey, setHasKey] = useState(false);
  const [isKeyValid, setIsKeyValid] = useState(true);
  const [claudeAvailable, setClaudeAvailable] = useState(false);
  const [availableModels, setAvailableModels] = useState<string[]>([]);
  const [isChecking, setIsChecking] = useState(true);
  const { toast } = useToast();

  // Verificăm dacă există deja o cheie API configurată
  useEffect(() => {
    const checkExistingKey = async () => {
      try {
        setIsChecking(true);
        const { data, error } = await supabase.functions.invoke("check-openrouter-key", {
          body: {}
        });

        if (!error) {
          setHasKey(data?.hasKey || false);
          setIsKeyValid(data?.isValid !== false);
          
          // Actualizăm informațiile despre modelele disponibile
          if (data?.models && Array.isArray(data.models)) {
            const claudeModels = data.models.filter((model: string) => 
              model.includes('claude') || model.includes('anthropic')
            );
            setClaudeAvailable(claudeModels.length > 0);
            setAvailableModels(claudeModels);
          }
          
          console.log("Status cheie OpenRouter:", data);
        } else {
          setHasKey(false);
          setIsKeyValid(true);
          console.log("Eroare la verificarea cheii OpenRouter:", error);
        }
      } catch (err) {
        console.error("Eroare la verificarea cheii existente:", err);
        setHasKey(false);
        setIsKeyValid(true);
      } finally {
        setIsChecking(false);
      }
    };

    if (isOpen) {
      checkExistingKey();
    }
  }, [isOpen]);

  const handleSaveApiKey = async () => {
    // Validare de bază
    if (!apiKey.trim()) {
      toast({
        title: "Cheie invalidă",
        description: "Te rugăm să introduci o cheie API validă",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      setStatus("loading");
      setErrorMessage("");

      console.log("Se trimite cheia OpenRouter pentru salvare...");
      const { data, error } = await supabase.functions.invoke("set-openrouter-key", {
        body: { key: apiKey },
      });

      if (error) {
        console.error("Eroare la setarea cheii API:", error);
        setStatus("error");
        setErrorMessage(error.message);
        toast({
          variant: "destructive",
          title: "Eroare",
          description: "Nu s-a putut salva cheia API. Verifică consola pentru detalii.",
        });
      } else {
        setStatus("success");
        setHasKey(true);
        setIsKeyValid(true);
        setClaudeAvailable(data?.claudeAvailable || false);
        setAvailableModels(data?.availableModels || []);
        
        toast({
          title: "Cheie API salvată",
          description: data?.claudeAvailable 
            ? "Cheia API OpenRouter a fost salvată cu succes și are acces la modelele Claude" 
            : "Cheia API OpenRouter a fost salvată, dar nu are acces la modelele Claude",
        });
        
        // Închide dialogul după o scurtă întârziere
        setTimeout(() => {
          setIsOpen(false);
          setStatus("idle");
          setApiKey("");
        }, 3000);
      }
    } catch (err) {
      console.error("Excepție la setarea cheii API:", err);
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Eroare necunoscută");
      toast({
        variant: "destructive",
        title: "Eroare",
        description: "Excepție la salvarea cheii API",
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
    claudeAvailable,
    availableModels,
    isChecking, 
    handleSaveApiKey 
  };
}
