
import React, { useEffect } from "react";
import { BaseMonitoringPage } from "@/components/agents/monitoring/BaseMonitoringPage";
import { AutonomousEngineProvider } from "@/components/agents/autonomous-engine/AutonomousEngineProvider";
import { useToast } from "@/hooks/use-toast";
import { logAgentActivity } from "@/components/agents/monitoring/hooks/utils/activity-processing";
import { AutonomyEngine } from "@/components/agents/monitoring/autonomy/AutonomyEngine";
import { ScrollArea } from "@/components/ui/scroll-area";

const AgentMonitoring = () => {
  const { toast } = useToast();

  useEffect(() => {
    // Pornește automat agenții când pagina se încarcă
    const timer = setTimeout(() => {
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
  }, [toast]);

  return (
    <AutonomousEngineProvider>
      <ScrollArea className="h-screen">
        <div className="pb-12">
          <BaseMonitoringPage tabs="unified" />
        </div>
      </ScrollArea>
      <AutonomyEngine />
    </AutonomousEngineProvider>
  );
};

export default AgentMonitoring;
