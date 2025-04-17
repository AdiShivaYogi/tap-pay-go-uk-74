
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const useDataConnections = (updateImplementationProgress: (system: string) => void) => {
  const { toast } = useToast();
  
  const [dataConnections, setDataConnections] = useState({
    agentSystem: false,
    monitoringPlatform: false,
    analyticsEngine: false,
    safetyFramework: false,
  });

  const [monitoringParameters, setMonitoringParameters] = useState({
    autonomyLevels: false,
    resourceUsage: false,
    decisionQuality: false,
    learningProgress: false,
  });

  const toggleDataConnection = (connection: keyof typeof dataConnections) => {
    setDataConnections(prev => ({ ...prev, [connection]: !prev[connection] }));
    
    // Incrementăm progresul de implementare pentru surse de date
    updateImplementationProgress('dataSources');
    
    toast({
      title: dataConnections[connection] ? "Conexiune dezactivată" : "Conexiune activată",
      description: `Conexiunea cu ${connection} a fost ${dataConnections[connection] ? "dezactivată" : "activată"}.`,
    });
  };

  const toggleMonitoringParameter = (parameter: keyof typeof monitoringParameters) => {
    setMonitoringParameters(prev => ({
      ...prev,
      [parameter]: !prev[parameter]
    }));
  };

  return {
    dataConnections,
    setDataConnections,
    monitoringParameters,
    setMonitoringParameters,
    toggleDataConnection,
    toggleMonitoringParameter
  };
};
