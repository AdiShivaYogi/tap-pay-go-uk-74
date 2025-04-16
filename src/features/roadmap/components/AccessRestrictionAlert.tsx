
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { ShieldAlert } from "lucide-react";

interface AccessRestrictionAlertProps {
  role?: string;
}

export const AccessRestrictionAlert = ({ role }: AccessRestrictionAlertProps) => {
  return (
    <Alert variant="destructive" className="bg-red-50 border-red-200">
      <ShieldAlert className="h-5 w-5 text-red-600" />
      <AlertTitle className="text-red-800">Acces restricționat</AlertTitle>
      <AlertDescription className="text-red-700">
        Nu ai permisiuni suficiente pentru a accesa această secțiune. 
        {role && ` Rolul tău curent este "${role}".`} 
        Te rugăm să contactezi administratorul pentru asistență.
      </AlertDescription>
    </Alert>
  );
};
