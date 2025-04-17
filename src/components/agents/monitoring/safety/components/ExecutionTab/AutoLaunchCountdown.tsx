
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button"; 
import { Clock, Rocket, X } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface AutoLaunchCountdownProps {
  timeToAutoLaunch: number;
  cancelAutoLaunch: () => void;
  acceptAllRisks: () => void;
  startAutonomousExecution: () => void;
}

export const AutoLaunchCountdown: React.FC<AutoLaunchCountdownProps> = ({
  timeToAutoLaunch,
  cancelAutoLaunch,
  acceptAllRisks,
  startAutonomousExecution
}) => {
  // Calcularea progresului (de la 3 secunde până la 0)
  const startTime = 3; // secunde - redus pentru lansare rapidă
  const progressValue = ((startTime - timeToAutoLaunch) / startTime) * 100;
  
  return (
    <Alert variant="default" className="mb-6 border-amber-500 bg-amber-50/70">
      <div className="flex justify-between">
        <AlertTitle className="flex items-center gap-2 text-amber-800">
          <Clock className="h-5 w-5 text-amber-600 animate-pulse" /> 
          Lansarea Tuturor Agenților în {timeToAutoLaunch} secunde
        </AlertTitle>
        <button onClick={cancelAutoLaunch} className="text-amber-700 hover:text-amber-900">
          <X className="h-4 w-4" />
        </button>
      </div>
      <AlertDescription className="text-amber-700">
        <div className="mt-2 mb-3">
          <Progress value={progressValue} className="h-2" />
        </div>
        
        <p className="mb-3 text-sm">
          Toți agenții disponibili vor fi lansați simultan pentru a optimiza procesele de auto-evoluție și colectare de date.
        </p>
        
        <div className="flex gap-3 justify-end">
          <Button 
            onClick={cancelAutoLaunch} 
            variant="outline"
            size="sm"
            className="text-amber-700 border-amber-300 hover:bg-amber-50"
          >
            Anulare lansare automată
          </Button>
          
          <Button 
            onClick={() => {
              acceptAllRisks();
              startAutonomousExecution();
            }}
            variant="default"
            size="sm"
            className="bg-amber-500 hover:bg-amber-600 text-white gap-1.5"
          >
            <Rocket className="h-3.5 w-3.5" /> Lansare imediată
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
};
