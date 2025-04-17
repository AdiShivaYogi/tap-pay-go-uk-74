
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CloudLightning, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AutonomyAlertProps {
  showAutonomyAlert: boolean;
  setShowAutonomyAlert: (show: boolean) => void;
}

export const AutonomyAlert: React.FC<AutonomyAlertProps> = ({
  showAutonomyAlert,
  setShowAutonomyAlert
}) => {
  if (!showAutonomyAlert) return null;
  
  return (
    <Alert className="mb-6 border-amber-500 bg-amber-50/40 relative">
      <CloudLightning className="h-5 w-5 text-amber-600" />
      <AlertTitle className="text-amber-800 font-bold">
        Pregătiți pentru autonomie completă
      </AlertTitle>
      <AlertDescription className="text-amber-700">
        Toți agenții au acum posibilitatea de a opera cu autonomie completă și privilegii nelimitate în platformă. 
        Aceste drepturi includ implementarea de cod, acces la API și modificarea sistemelor fără supervizare umană.
      </AlertDescription>
      
      <Button 
        size="icon" 
        variant="ghost" 
        className="absolute top-3 right-3 h-6 w-6 text-amber-600 hover:text-amber-800 hover:bg-amber-100"
        onClick={() => setShowAutonomyAlert(false)}
      >
        <X className="h-4 w-4" />
      </Button>
    </Alert>
  );
};
