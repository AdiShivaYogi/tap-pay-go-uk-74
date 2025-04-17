
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAnthropicKey } from "./api-keys/useAnthropicKey";
import { AnthropicKeyForm } from "./api-keys/AnthropicKeyForm";
import { AnthropicKeyAlert } from "./api-keys/AnthropicKeyAlert";
import { Loader2, KeyRound } from "lucide-react";

interface AnthropicApiKeyDialogProps {
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
}

export const AnthropicApiKeyDialog = ({ isOpen, setIsOpen }: AnthropicApiKeyDialogProps) => {
  const { 
    isOpen: internalIsOpen, 
    setIsOpen: setInternalIsOpen, 
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
  } = useAnthropicKey();
  
  // Folosim starea internă sau prop-ul, în funcție de ce e disponibil
  const dialogIsOpen = isOpen !== undefined ? isOpen : internalIsOpen;
  const setDialogIsOpen = setIsOpen || setInternalIsOpen;

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <KeyRound className="h-4 w-4" />
          <span>API Claude (Anthropic)</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Configurare API Claude (Anthropic)</DialogTitle>
          <DialogDescription>
            Conectați contul Anthropic pentru a utiliza modelele Claude în aplicație
          </DialogDescription>
        </DialogHeader>

        {isChecking ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">Se verifică configurația API...</p>
          </div>
        ) : (
          <>
            <AnthropicKeyAlert 
              hasKey={hasKey}
              isKeyValid={isKeyValid}
              model={model}
            />

            <div className="space-y-4 py-4 px-1">
              <AnthropicKeyForm 
                apiKey={apiKey}
                onChange={setApiKey}
                disabled={isSubmitting}
              />
              
              <div className="flex justify-end">
                <Button 
                  type="button"
                  onClick={handleSaveApiKey}
                  disabled={isSubmitting || !apiKey.trim()}
                  className="gap-2"
                >
                  {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                  {status === 'loading' ? 'Se salvează...' : 'Salvează cheia API'}
                </Button>
              </div>
              
              {status === 'error' && (
                <p className="text-sm text-destructive mt-2">{errorMessage || 'A apărut o eroare la salvarea cheii API'}</p>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
