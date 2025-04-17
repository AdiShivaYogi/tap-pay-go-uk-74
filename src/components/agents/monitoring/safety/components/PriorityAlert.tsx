
import React from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Rocket } from "lucide-react";

interface PriorityAlertProps {
  onDismiss: () => void;
  show: boolean;
}

export const PriorityAlert: React.FC<PriorityAlertProps> = ({ onDismiss, show }) => {
  if (!show) return null;
  
  return (
    <Alert variant="default" className="border-amber-500 bg-amber-100 mb-4">
      <AlertTitle className="flex items-center gap-2 text-amber-800">
        <Rocket className="h-5 w-5" />
        Prioritate #1: Pornire Agenți Autonomi
      </AlertTitle>
      <AlertDescription className="text-amber-700 flex justify-between items-center">
        <span>
          Pentru a accelera dezvoltarea, s-a decis acceptarea unor riscuri inițiale și lansarea agenților 
          în mod autonom. Configurați parametrii de risc acceptați mai jos.
        </span>
        <button 
          onClick={onDismiss}
          className="text-xs text-amber-800 hover:text-amber-900"
        >
          Înțeleg
        </button>
      </AlertDescription>
    </Alert>
  );
};
