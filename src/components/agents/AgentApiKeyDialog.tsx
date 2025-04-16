
import { useState } from "react";
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
import { Shield, Key, AlertTriangle, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function AgentApiKeyDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const { toast } = useToast();

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
        </div>

        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            disabled={isSubmitting}
          >
            Anulează
          </Button>
          <Button
            onClick={handleSaveApiKey}
            disabled={isSubmitting || status === "success" || !apiKey.trim()}
            className="gap-2"
          >
            {isSubmitting ? (
              <>Salvare...</>
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
