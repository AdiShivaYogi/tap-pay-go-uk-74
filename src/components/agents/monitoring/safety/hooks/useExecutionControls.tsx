
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { agents } from "@/components/agents/agents-data";

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
    // Lansăm toți agenții rămași și activăm toate sistemele pentru evoluție maximă
    
    // Activăm agenții cu setări pentru autonomie completă
    setAgentsRunning(true);
    setAutonomyLevel(100); // Nivel maxim de autonomie
    setSystemsActive({
      riskEvaluation: true,
      humanSupervision: false, // Dezactivăm supervizarea umană pentru autonomie completă
      autonomyLimits: false,   // Dezactivăm limitările de autonomie
      dataSources: true,
      realTimeMonitoring: true,
      adaptiveSafety: true,
      riskAlgorithm: true,     // Activăm algoritmul de risc
      auditLogs: true,         // Menținem jurnalele de audit pentru trasabilitate
      ethicalBoundaries: true, // Menținem limitele etice
      emergencyStop: true      // Păstrăm opțiunea de oprire de urgență
    });
    
    // Activăm toate conexiunile pentru acces complet la date
    setDataConnections({
      agentSystem: true,
      monitoringPlatform: true,
      analyticsEngine: true,
      safetyFramework: true,
      dataLake: true,          // Adăugăm acces la toate sursele de date
      externalAPIs: true,      // Permitem conectare la API-uri externe
      modelTraining: true      // Permitem training de modele
    });
    
    // Actualizăm parametrii de monitorizare pentru control maxim
    setMonitoringParameters({
      autonomyLevels: true,
      resourceUsage: true,
      decisionQuality: true,
      learningProgress: true,
      adaptationRate: true,    // Monitorizăm rata de adaptare
      errorCorrection: true,   // Monitorizăm corecția de erori
      selfImprovement: true    // Monitorizăm auto-îmbunătățirea
    });

    // Notificăm utilizatorul despre lansarea tuturor agenților
    const agentNames = agents.map(agent => agent.name).join(", ");
    
    toast({
      title: "Toți agenții au fost lansați",
      description: `${agentNames} operează acum la capacitate maximă cu autonomie completă.`,
      duration: 6000,
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
