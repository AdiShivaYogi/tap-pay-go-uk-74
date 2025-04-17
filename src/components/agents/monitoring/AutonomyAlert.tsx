
import React from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Zap } from "lucide-react";
import { agents } from "@/components/agents/agents-data";

interface AutonomyAlertProps {
  showAutonomyAlert: boolean;
  setShowAutonomyAlert: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AutonomyAlert: React.FC<AutonomyAlertProps> = ({
  showAutonomyAlert,
  setShowAutonomyAlert
}) => {
  if (!showAutonomyAlert) return null;
  
  return (
    <Alert variant="default" className="mb-6 border-amber-500 bg-amber-50">
      <AlertTitle className="flex items-center gap-2 text-amber-800">
        <Zap className="h-5 w-5 text-amber-600" /> 
        Lansare Completă Pentru Toți Agenții
      </AlertTitle>
      <AlertDescription className="text-amber-700 flex justify-between items-center">
        <div>
          <p className="mb-1">
            Pentru accelerarea dezvoltării, au fost lansați toți agenții disponibili ({agents.length}) 
            cu praguri de siguranță reduse pentru autonomie maximă.
          </p>
          <p className="text-xs">
            Agenți activi: {agents.map(agent => agent.name).join(", ")}
          </p>
        </div>
        <button 
          onClick={() => setShowAutonomyAlert(false)}
          className="text-xs text-amber-800 hover:text-amber-900"
        >
          Înțeleg
        </button>
      </AlertDescription>
    </Alert>
  );
};
