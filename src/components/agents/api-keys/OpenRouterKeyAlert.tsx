
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2, KeyRound } from "lucide-react";

interface OpenRouterKeyAlertProps {
  hasKey: boolean;
  isKeyValid: boolean;
  claudeAvailable: boolean;
  availableModels: string[];
}

export function OpenRouterKeyAlert({ 
  hasKey, 
  isKeyValid,
  claudeAvailable,
  availableModels = []
}: OpenRouterKeyAlertProps) {
  if (!hasKey) {
    return (
      <Alert variant="default" className="bg-slate-50 border-slate-200">
        <KeyRound className="h-4 w-4 text-slate-500" />
        <AlertTitle>Configurare inițială</AlertTitle>
        <AlertDescription className="text-slate-600">
          Introduceți o cheie API OpenRouter pentru a accesa modelele Claude și alte modele AI
        </AlertDescription>
      </Alert>
    );
  }

  if (hasKey && !isKeyValid) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Eroare de validare</AlertTitle>
        <AlertDescription>
          Cheia API OpenRouter configurată nu este validă sau a expirat. Vă rugăm să introduceți o cheie nouă.
        </AlertDescription>
      </Alert>
    );
  }

  if (hasKey && isKeyValid && !claudeAvailable) {
    return (
      <Alert className="bg-amber-50 border-amber-200">
        <AlertCircle className="h-4 w-4 text-amber-500" />
        <AlertTitle className="text-amber-800">Lipsesc modelele Claude</AlertTitle>
        <AlertDescription className="text-amber-700">
          Cheia API OpenRouter este validă, dar nu aveți acces la modelele Claude. 
          Verificați setările contului OpenRouter pentru a activa aceste modele.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert className="bg-green-50 border-green-200">
      <CheckCircle2 className="h-4 w-4 text-green-600" />
      <AlertTitle className="text-green-800">API Configurat</AlertTitle>
      <AlertDescription className="text-green-700">
        <p className="mb-1">Cheia API OpenRouter este configurată și funcțională.</p>
        {claudeAvailable && (
          <p className="text-xs">
            Modele Claude disponibile: {availableModels.filter(m => 
              m.toLowerCase().includes('claude') || 
              m.toLowerCase().includes('anthropic')
            ).join(', ')}
          </p>
        )}
      </AlertDescription>
    </Alert>
  );
}
