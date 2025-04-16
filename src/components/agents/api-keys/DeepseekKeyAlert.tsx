
import { CheckCircle2, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface DeepseekKeyAlertProps {
  status: "idle" | "loading" | "success" | "error";
  hasKey: boolean;
  errorMessage?: string;
}

export function DeepseekKeyAlert({ status, hasKey, errorMessage }: DeepseekKeyAlertProps) {
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
          Agenții AI pot acum utiliza capacități avansate.
        </AlertDescription>
      </Alert>
    );
  }

  if (hasKey && status !== "loading") {
    return (
      <Alert className="bg-green-50 border-green-200">
        <CheckCircle2 className="h-4 w-4 text-green-600" />
        <AlertTitle className="text-green-800">Cheie API configurată</AlertTitle>
        <AlertDescription className="text-green-700">
          Există deja o cheie API Deepseek configurată. Poți introduce o nouă cheie pentru a o înlocui.
        </AlertDescription>
      </Alert>
    );
  }

  return null;
}
