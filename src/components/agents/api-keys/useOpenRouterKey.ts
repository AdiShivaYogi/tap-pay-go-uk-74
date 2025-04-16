
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

        if (!error && data?.hasKey) {
          setHasKey(true);
          console.log("Există o cheie OpenRouter configurată:", data.keyInfo);
        } else {
          setHasKey(false);
          console.log("Nu există o cheie OpenRouter configurată");
        }
      } catch (err) {
        console.error("Eroare la verificarea cheii existente:", err);
        setHasKey(false);
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
        toast({
          title: "Cheie API salvată",
          description: "Cheia API OpenRouter a fost salvată cu succes",
        });
        
        // Închide dialogul după o scurtă întârziere
        setTimeout(() => {
          setIsOpen(false);
          setStatus("idle");
          setApiKey("");
        }, 2000);
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
    isChecking, 
    handleSaveApiKey 
  };
}
