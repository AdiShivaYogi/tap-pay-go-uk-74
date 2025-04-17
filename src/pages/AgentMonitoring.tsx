
import React, { useEffect } from "react";
import { BaseMonitoringPage } from "@/components/agents/monitoring/BaseMonitoringPage";
import { useAutonomousEngine } from "@/components/agents/autonomous-engine/AutonomousEngineProvider";
import { useToast } from "@/hooks/use-toast";
import { logAgentActivity } from "@/components/agents/monitoring/hooks/utils/activity-processing";

const AgentMonitoring = () => {
  const { isRunning, startAgents } = useAutonomousEngine();
  const { toast } = useToast();

  useEffect(() => {
    // Pornește automat agenții când pagina se încarcă
    if (!isRunning) {
      const timer = setTimeout(() => {
        startAgents();
        
        // Log activitate
        logAgentActivity(
          "system",
          "Agenții au fost porniți automat din pagina de monitorizare",
          "autonomy"
        );
        
        toast({
          title: "Monitorizare activă",
          description: "Toți agenții au fost activați automat pentru monitorizare completă",
          duration: 5000,
        });
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isRunning, startAgents, toast]);

  return (
    <BaseMonitoringPage tabs="unified" />
  );
};

export default AgentMonitoring;
