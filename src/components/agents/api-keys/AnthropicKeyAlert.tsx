
import { CheckCircle2, AlertCircle, InfoIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface AnthropicKeyAlertProps {
  status: 'idle' | 'loading' | 'success' | 'error';
  hasKey?: boolean;
  isKeyValid?: boolean;
  errorMessage?: string;
  model?: string;
}

export function AnthropicKeyAlert({ 
  status, 
  hasKey = false,
  isKeyValid = false,
  errorMessage = '',
  model = ''
}: AnthropicKeyAlertProps) {
  if (status === 'idle' && !hasKey) {
    return (
      <Alert className="bg-blue-50 border-blue-200">
        <InfoIcon className="h-4 w-4 text-blue-600" />
        <AlertTitle className="text-blue-800">Configurare necesară</AlertTitle>
        <AlertDescription className="text-blue-700">
          Este necesară adăugarea unei chei API Anthropic pentru a utiliza modelele Claude
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
          Cheia API Anthropic este configurată și funcționează corect.
          {model && (
            <div className="mt-1 text-sm">
              Model disponibil: <span className="font-mono">{model}</span>
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
          {errorMessage || "Cheia API Anthropic nu este validă sau a expirat. Vă rugăm să verificați cheia și să încercați din nou."}
        </AlertDescription>
      </Alert>
    );
  }

  return null;
}
