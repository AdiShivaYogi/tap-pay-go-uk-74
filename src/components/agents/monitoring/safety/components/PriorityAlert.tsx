
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lightbulb, X, Sparkles } from "lucide-react";

interface PriorityAlertProps {
  onDismiss: () => void;
  show: boolean;
}

export const PriorityAlert: React.FC<PriorityAlertProps> = ({ 
  onDismiss, 
  show 
}) => {
  if (!show) return null;
  
  return (
    <Alert variant="default" className="mb-6 border-amber-500 bg-amber-50">
      <div className="flex justify-between">
        <AlertTitle className="flex items-center gap-2 text-amber-800">
          <Sparkles className="h-5 w-5 text-amber-600" /> 
          Prioritate #1: Inițierea Agenților Autonomi
        </AlertTitle>
        <button onClick={onDismiss} className="text-amber-700 hover:text-amber-900">
          <X className="h-4 w-4" />
        </button>
      </div>
      <AlertDescription className="text-amber-700">
        <p className="mb-1">
          Ne aflăm în paradoxul "oul și găina": agenții au nevoie să colecteze date pentru a evolua, dar nu pot colecta date fără a fi lansați.
        </p>
        <p className="text-xs font-medium">
          Activați execuția autonomă din tab-ul "Execuție Autonomă" acceptând toate nivelurile de risc pentru a permite agenților să înceapă ciclul de auto-dezvoltare.
        </p>
      </AlertDescription>
    </Alert>
  );
};
