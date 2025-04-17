
import React, { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAutonomousEngine } from "@/components/agents/autonomous-engine/AutonomousEngineProvider";
import { logAgentActivity } from "@/components/agents/monitoring/hooks/utils/activity-processing";

export const AutoExecution = () => {
  const { isRunning, startAgents } = useAutonomousEngine();
  const { toast } = useToast();
  
  // Pornim automat sistemul autonom
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isRunning) {
        startAgents();
        
        logAgentActivity(
          "system", 
          "Sistemul autonom a fost pornit automat pentru a genera activitate", 
          "auto_execution"
        );
        
        toast({
          title: "Agenți porniti automat",
          description: "Sistemul autonom a inițiat agenții pentru generarea de activitate",
        });
      }
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [isRunning, startAgents, toast]);
  
  // Componenta nu afișează nimic - rulează doar în fundal
  return null;
};
