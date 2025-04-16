
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, Key, AlertTriangle, CheckCircle2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function AgentApiKeyDialog() {
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
        const { data, error } = await supabase.functions.invoke("check-deepseek-key", {
          body: {}
        });

        if (!error && data?.hasKey) {
          setHasKey(true);
          console.log("Există o cheie Deepseek configurată:", data.keyInfo);
        } else {
          setHasKey(false);
          console.log("Nu există o cheie Deepseek configurată");
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

      console.log("Se trimite cheia pentru salvare...");
      const { data, error } = await supabase.functions.invoke("set-deepseek-key", {
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
          description: "Cheia API Deepseek a fost salvată cu succes",
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

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Key className="h-4 w-4" />
          Configurare API Deepseek
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" /> Configurare API Deepseek
          </DialogTitle>
          <DialogDescription>
            Adaugă cheia API Deepseek pentru a activa capacități avansate pentru agenții AI
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {isChecking ? (
            <div className="flex justify-center items-center py-6">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <span className="ml-2">Se verifică configurația existentă...</span>
            </div>
          ) : (
            <>
              {hasKey && status !== "error" && (
                <Alert className="bg-green-50 border-green-200">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-800">Cheie API configurată</AlertTitle>
                  <AlertDescription className="text-green-700">
                    Există deja o cheie API Deepseek configurată. Poți introduce o nouă cheie pentru a o înlocui.
                  </AlertDescription>
                </Alert>
              )}

              <div className="bg-amber-50 border-amber-200 border p-3 rounded-md flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-amber-800">
                  <p className="font-medium">Important</p>
                  <p>Cheia API va fi stocată securizat și nu va fi expusă în frontend.</p>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="apiKey" className="text-sm font-medium">
                  Cheia API Deepseek
                </label>
                <Input
                  id="apiKey"
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk_deepseek_..."
                  disabled={status === "loading" || status === "success"}
                />
                <p className="text-xs text-muted-foreground">
                  Poți obține o cheie API de la{" "}
                  <a
                    href="https://platform.deepseek.com/"
                    className="text-primary underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Deepseek Platform
                  </a>
                </p>
              </div>

              {status === "error" && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Eroare la salvarea cheii API</AlertTitle>
                  <AlertDescription>
                    {errorMessage || "Nu s-a putut salva cheia API. Te rugăm să încerci din nou."}
                  </AlertDescription>
                </Alert>
              )}

              {status === "success" && (
                <Alert className="bg-green-50 border-green-200">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-800">Cheie API salvată cu succes</AlertTitle>
                  <AlertDescription className="text-green-700">
                    Agenții AI pot acum utiliza capacități avansate.
                  </AlertDescription>
                </Alert>
              )}
            </>
          )}
        </div>

        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            disabled={isSubmitting || isChecking}
          >
            Anulează
          </Button>
          <Button
            onClick={handleSaveApiKey}
            disabled={isSubmitting || status === "success" || !apiKey.trim() || isChecking}
            className="gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Salvare...
              </>
            ) : (
              <>
                <Shield className="h-4 w-4" /> Salvează cheia API
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
