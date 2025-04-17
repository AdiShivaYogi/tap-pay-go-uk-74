
import React from "react";
import { Button } from "@/components/ui/button";
import { StopCircle } from "lucide-react";

interface EmergencyStopProps {
  handleEmergencyStop: () => void;
}

export const EmergencyStop: React.FC<EmergencyStopProps> = ({ handleEmergencyStop }) => {
  return (
    <div className="mt-4 flex justify-center">
      <Button 
        variant="destructive" 
        size="lg" 
        className="gap-2"
        onClick={handleEmergencyStop}
      >
        <StopCircle className="h-5 w-5" />
        Oprire de Urgență - Toți Agenții
      </Button>
    </div>
  );
};
