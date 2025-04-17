
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

type SetSystemsActiveType = React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
type SetDataConnectionsType = React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
type SetMonitoringParametersType = React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
type SetAgentsRunningType = React.Dispatch<React.SetStateAction<boolean>>;
type SetAutonomyLevelType = React.Dispatch<React.SetStateAction<number>>;

interface ExecutionControlsParams {
  setSystemsActive: SetSystemsActiveType;
  setDataConnections: SetDataConnectionsType; 
  setMonitoringParameters: SetMonitoringParametersType;
  setAgentsRunning: SetAgentsRunningType;
  setAutonomyLevel: SetAutonomyLevelType;
}

export const useExecutionControls = ({
  setSystemsActive,
  setDataConnections,
  setMonitoringParameters,
  setAgentsRunning,
  setAutonomyLevel
}: ExecutionControlsParams) => {
  const { toast } = useToast();
  const [safetyOverride, setSafetyOverride] = useState(true);
  const [showAutonomyAlert, setShowAutonomyAlert] = useState(true);

  const startAutonomousExecution = () => {
    // Am eliminat verificarea pentru riscuri ridicate pentru a facilita lansarea rapidă
    
    // Activăm agenții cu setări speciale pentru evoluție autonomă
    setAgentsRunning(true);
    setAutonomyLevel(85);
    setSystemsActive(prev => ({
      ...prev,
      riskEvaluation: true,
      humanSupervision: false,
      autonomyLimits: false,
      dataSources: true,
      realTimeMonitoring: true,
      adaptiveSafety: true
    }));
    
    // Activăm conexiunile necesare
    setDataConnections({
      agentSystem: true,
      monitoringPlatform: true,
      analyticsEngine: true,
      safetyFramework: true
    });
    
    // Actualizăm parametrii de monitorizare
    setMonitoringParameters({
      autonomyLevels: true,
      resourceUsage: true,
      decisionQuality: true,
      learningProgress: true
    });

    toast({
      title: "Execuție autonomă activată",
      description: "Agenții au fost lansați în modul autonom și vor începe să colecteze date în timp real pentru evoluție.",
    });
  };

  return {
    safetyOverride,
    setSafetyOverride,
    showAutonomyAlert,
    setShowAutonomyAlert,
    startAutonomousExecution
  };
};
