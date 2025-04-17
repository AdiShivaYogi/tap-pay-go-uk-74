
import { CheckCircle2, AlertCircle, InfoIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface OpenRouterKeyAlertProps {
  status: 'idle' | 'loading' | 'success' | 'error';
  hasKey?: boolean;
  isKeyValid?: boolean;
  errorMessage?: string;
  claudeAvailable?: boolean;
  availableModels?: string[];
}

export function OpenRouterKeyAlert({ 
  status, 
  hasKey = false,
  isKeyValid = false,
  errorMessage = '',
  claudeAvailable = false,
  availableModels = []
}: OpenRouterKeyAlertProps) {
  if (status === 'idle' && !hasKey) {
    return (
      <Alert className="bg-blue-50 border-blue-200">
        <InfoIcon className="h-4 w-4 text-blue-600" />
        <AlertTitle className="text-blue-800">Configurare necesară</AlertTitle>
        <AlertDescription className="text-blue-700">
          Este necesară adăugarea unei chei API OpenRouter pentru a utiliza modelele Claude prin OpenRouter
        </AlertDescription>
      </Alert>
    );
  }
  
  if (status === 'idle' && hasKey && isKeyValid) {
    return (
      <Alert className="bg-green-50 border-green-200">
        <CheckCircle2 className="h-4 w-4 text-green-600" />
        <AlertTitle className="text-green-800">Cheie API validă</AlertTitle>
        <AlertDescription className="text-green-700">
          Cheia API OpenRouter este configurată și funcționează corect.
          {claudeAvailable && (
            <div className="mt-1 text-sm">
              Modelele Claude sunt disponibile prin OpenRouter!
            </div>
          )}
          {availableModels && availableModels.length > 0 && (
            <div className="mt-1 text-xs font-mono">
              Modele disponibile: {availableModels.slice(0, 3).join(', ')}{availableModels.length > 3 ? '...' : ''}
            </div>
          )}
        </AlertDescription>
      </Alert>
    );
  }

  if ((status === 'idle' && hasKey && !isKeyValid) || status === 'error') {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Cheie API invalidă</AlertTitle>
        <AlertDescription>
          {errorMessage || "Cheia API OpenRouter nu este validă sau a expirat. Vă rugăm să verificați cheia și să încercați din nou."}
        </AlertDescription>
      </Alert>
    );
  }

  return null;
}
