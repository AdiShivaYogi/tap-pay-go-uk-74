
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2, KeyRound } from "lucide-react";

interface DeepseekKeyAlertProps {
  status: 'idle' | 'loading' | 'success' | 'error';
  hasKey: boolean;
  errorMessage?: string;
}

export function DeepseekKeyAlert({ status, hasKey, errorMessage }: DeepseekKeyAlertProps) {
  if (status === 'idle' && !hasKey) {
    return (
      <Alert variant="default" className="bg-slate-50 border-slate-200">
        <KeyRound className="h-4 w-4 text-slate-500" />
        <AlertTitle>Configurare inițială</AlertTitle>
        <AlertDescription className="text-slate-600">
          Introduceți o cheie API Deepseek pentru a accesa capacități avansate pentru agenți.
        </AlertDescription>
      </Alert>
    );
  }

  if (status === 'error') {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Eroare de validare</AlertTitle>
        <AlertDescription>
          {errorMessage || 'A apărut o eroare la salvarea cheii API. Vă rugăm să încercați din nou.'}
        </AlertDescription>
      </Alert>
    );
  }

  if (status === 'success' || (status === 'idle' && hasKey)) {
    return (
      <Alert className="bg-green-50 border-green-200">
        <CheckCircle2 className="h-4 w-4 text-green-600" />
        <AlertTitle className="text-green-800">API Configurat</AlertTitle>
        <AlertDescription className="text-green-700">
          Cheia API Deepseek este configurată și funcțională.
        </AlertDescription>
      </Alert>
    );
  }

  return null;
}
