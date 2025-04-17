
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2, KeyRound } from "lucide-react";

interface AnthropicKeyAlertProps {
  hasKey: boolean;
  isKeyValid: boolean;
  model?: string;
}

export function AnthropicKeyAlert({ 
  hasKey, 
  isKeyValid,
  model
}: AnthropicKeyAlertProps) {
  if (!hasKey) {
    return (
      <Alert variant="default" className="bg-slate-50 border-slate-200">
        <KeyRound className="h-4 w-4 text-slate-500" />
        <AlertTitle>Configurare inițială</AlertTitle>
        <AlertDescription className="text-slate-600">
          Introduceți o cheie API Anthropic pentru a accesa modelele Claude direct
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
          Cheia API Anthropic configurată nu este validă sau a expirat. Vă rugăm să introduceți o cheie nouă.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert className="bg-green-50 border-green-200">
      <CheckCircle2 className="h-4 w-4 text-green-600" />
      <AlertTitle className="text-green-800">API Configurat</AlertTitle>
      <AlertDescription className="text-green-700">
        <p>Cheia API Anthropic este configurată și funcțională.</p>
        {model && <p className="text-xs mt-1">Model utilizat: {model}</p>}
      </AlertDescription>
    </Alert>
  );
}
