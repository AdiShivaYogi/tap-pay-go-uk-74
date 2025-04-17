
import { CheckCircle2, AlertTriangle, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface OpenRouterKeyAlertProps {
  status: "idle" | "loading" | "success" | "error";
  hasKey: boolean;
  isKeyValid?: boolean;
  claudeAvailable?: boolean;
  availableModels?: string[];
  errorMessage?: string;
}

export function OpenRouterKeyAlert({ 
  status, 
  hasKey, 
  isKeyValid = true,
  claudeAvailable = false,
  availableModels = [],
  errorMessage 
}: OpenRouterKeyAlertProps) {
  if (status === "error") {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Eroare la salvarea cheii API</AlertTitle>
        <AlertDescription>
          {errorMessage || "Nu s-a putut salva cheia API. Te rugăm să încerci din nou."}
        </AlertDescription>
      </Alert>
    );
  }

  if (status === "success") {
    return (
      <Alert className="bg-green-50 border-green-200">
        <CheckCircle2 className="h-4 w-4 text-green-600" />
        <AlertTitle className="text-green-800">Cheie API salvată cu succes</AlertTitle>
        <AlertDescription className="text-green-700">
          {claudeAvailable ? (
            <>
              Agenții AI pot acum utiliza modelele Claude prin OpenRouter.
              {availableModels.length > 0 && (
                <div className="mt-1 text-xs">
                  <span className="font-semibold">Modele disponibile:</span> {availableModels.join(', ')}
                </div>
              )}
            </>
          ) : (
            "Cheia API a fost salvată, dar nu am detectat acces la modelele Claude. Verifică abonamentul OpenRouter."
          )}
        </AlertDescription>
      </Alert>
    );
  }

  if (hasKey && (status === "idle" || status === "loading")) {
    if (!isKeyValid) {
      return (
        <Alert className="bg-amber-50 border-amber-200">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertTitle className="text-amber-800">Cheie API invalidă</AlertTitle>
          <AlertDescription className="text-amber-700">
            Există o cheie API OpenRouter configurată, dar pare să fie invalidă. 
            Introduceți o nouă cheie pentru a remedia problema.
          </AlertDescription>
        </Alert>
      );
    }
    
    return (
      <Alert className={claudeAvailable ? "bg-green-50 border-green-200" : "bg-blue-50 border-blue-200"}>
        <Info className={`h-4 w-4 ${claudeAvailable ? "text-green-600" : "text-blue-600"}`} />
        <AlertTitle className={claudeAvailable ? "text-green-800" : "text-blue-800"}>
          Cheie API configurată
        </AlertTitle>
        <AlertDescription className={claudeAvailable ? "text-green-700" : "text-blue-700"}>
          {claudeAvailable ? (
            <>
              Există deja o cheie API OpenRouter configurată cu acces la modelele Claude.
              {availableModels.length > 0 && (
                <div className="mt-1 text-xs">
                  <span className="font-semibold">Modele disponibile:</span> {availableModels.join(', ')}
                </div>
              )}
            </>
          ) : (
            "Există deja o cheie API OpenRouter configurată. Poți introduce o nouă cheie pentru a o înlocui."
          )}
        </AlertDescription>
      </Alert>
    );
  }

  return null;
}
