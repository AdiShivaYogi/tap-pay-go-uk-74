
import { Network, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ImportantNotice } from "./api-keys/ImportantNotice";
import { OpenRouterKeyForm } from "./api-keys/OpenRouterKeyForm";
import { OpenRouterKeyAlert } from "./api-keys/OpenRouterKeyAlert";
import { useOpenRouterKey } from "./api-keys/useOpenRouterKey";

export function OpenRouterApiKeyDialog() {
  const { 
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
  } = useOpenRouterKey();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Network className="h-4 w-4" />
          Configurare OpenRouter (Claude)
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Network className="h-5 w-5 text-primary" /> Configurare API OpenRouter
          </DialogTitle>
          <DialogDescription>
            Adaugă cheia API OpenRouter pentru a activa modelele Claude și alte modele avansate pentru agenții AI
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
              <OpenRouterKeyAlert 
                status={status} 
                hasKey={hasKey}
                isKeyValid={isKeyValid}
                claudeAvailable={claudeAvailable}
                availableModels={availableModels}
                errorMessage={errorMessage} 
              />
              
              <ImportantNotice />

              <OpenRouterKeyForm 
                apiKey={apiKey} 
                onChange={setApiKey} 
                disabled={status === "loading" || status === "success"} 
              />
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
                <Network className="h-4 w-4" /> Salvează cheia API
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
