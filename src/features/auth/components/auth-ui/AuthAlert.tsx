
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

interface AuthAlertProps {
  title?: string;
  description: string;
  variant?: "default" | "destructive";
}

export const AuthAlert = ({ 
  title, 
  description, 
  variant = "destructive" 
}: AuthAlertProps) => {
  return (
    <Alert variant={variant} className="mb-4">
      <AlertTriangle className="h-4 w-4" />
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};
