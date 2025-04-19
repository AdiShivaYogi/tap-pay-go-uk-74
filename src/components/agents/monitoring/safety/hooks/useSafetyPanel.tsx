
import { useToast } from "@/hooks/use-toast";
import { useAutonomyControls } from "./useAutonomyControls";
import { useSystemsControls } from "./useSystemsControls";
import { useImplementationProgress } from "./useImplementationProgress";
import { useDataConnections } from "./useDataConnections";
import { useExecutionControls } from "./useExecutionControls";
import { useAutoLaunch } from "./useAutoLaunch";
import { agents } from "@/components/agents/agents-data";
import { useAutonomousEngine } from "@/components/agents/autonomous-engine/AutonomousEngineProvider";

export const useSafetyPanel = () => {
  const { toast } = useToast();
  const { enableFullAutonomy } = useAutonomousEngine();
  
  const { 
    autonomyLevel, 
    setAutonomyLevel,
    acceptedRisks, 
    setAcceptedRisks,
    agentsRunning, 
    setAgentsRunning,
    getAutonomyDescription,
    handleAutonomyChange,
    toggleRiskAcceptance,
    handleEmergencyStop: baseHandleEmergencyStop
  } = useAutonomyControls();

  const {
    systemsActive,
    setSystemsActive,
    getSystemName,
    handleToggleSystem
  } = useSystemsControls();

  const {
    implementationProgress,
    updateImplementationProgress
  } = useImplementationProgress();

  const {
    dataConnections,
    setDataConnections,
    monitoringParameters,
    setMonitoringParameters,
    toggleDataConnection,
    toggleMonitoringParameter
  } = useDataConnections(updateImplementationProgress);

  // Renamed to baseStartAutonomousExecution to avoid conflict
  const {
    safetyOverride,
    setSafetyOverride,
    showAutonomyAlert,
    setShowAutonomyAlert,
    startAutonomousExecution: baseStartAutonomousExecution
  } = useExecutionControls({
    setSystemsActive,
    setDataConnections,
    setMonitoringParameters,
    setAgentsRunning,
    setAutonomyLevel
  });

  const handleEmergencyStop = () => {
    baseHandleEmergencyStop();
    setSystemsActive({
      riskEvaluation: true,
      ethicalBoundaries: true,
      auditLogs: true,
      humanSupervision: true,
      autonomyLimits: true,
      emergencyStop: true,
      dataSources: false,
      realTimeMonitoring: false,
      riskAlgorithm: false,
      adaptiveSafety: false,
    });
  };

  // Implementare îmbunătățită pentru autonomie completă
  const startAutonomousExecution = () => {
    // Activăm autonomia completă în sistemul central
    enableFullAutonomy();
    
    // Setăm toate sistemele de bază pentru autonomie maximă
    setAgentsRunning(true);
    setAutonomyLevel(100);
    setSystemsActive({
      riskEvaluation: true,
      humanSupervision: false, // Dezactivăm supervizarea umană pentru autonomie completă
      autonomyLimits: false,   // Dezactivăm limitările de autonomie
      dataSources: true,
      realTimeMonitoring: true,
      adaptiveSafety: true,
      riskAlgorithm: true,
      auditLogs: true,
      ethicalBoundaries: true,
      emergencyStop: true
    });

    // Activăm toate conexiunile pentru acces complet la date
    setDataConnections(prevConnections => ({
      ...prevConnections,
      agentSystem: true,
      monitoringPlatform: true,
      analyticsEngine: true,
      safetyFramework: true,
      dataLake: true,
      externalAPIs: true,
      modelTraining: true
    }));

    // Activăm toți parametrii de monitorizare pentru control maxim
    setMonitoringParameters(prevParams => ({
      ...prevParams,
      autonomyLevels: true,
      resourceUsage: true,
      decisionQuality: true,
      learningProgress: true,
      adaptationRate: true,
      errorCorrection: true,
      selfImprovement: true
    }));

    // Acceptăm toate nivelurile de risc pentru sistem
    setAcceptedRisks(["scazut", "mediu", "ridicat"]);
    setSafetyOverride(true);

    const agentNames = agents.map(agent => agent.name).join(", ");
    
    toast({
      title: "Autonomie completă activată",
      description: `Toți agenții operează acum independent cu autonomie 100%. Auto-evoluția și auto-îmbunătățirea sunt active.`,
      duration: 6000,
    });
  };

  // Create hook after defining startAutonomousExecution
  const { 
    autoLaunchPending, 
    timeToAutoLaunch,
    acceptAllRisks,
    cancelAutoLaunch 
  } = useAutoLaunch(
    setAcceptedRisks, 
    setSafetyOverride, 
    startAutonomousExecution  // Pass our enhanced implementation
  );

  return {
    autonomyLevel,
    safetyOverride,
    acceptedRisks,
    agentsRunning,
    
    systemsActive,
    
    dataConnections,
    monitoringParameters,
    
    implementationProgress,
    
    showAutonomyAlert,
    autoLaunchPending,
    timeToAutoLaunch,
    
    setShowAutonomyAlert,
    
    handleToggleSystem,
    getSystemName,
    
    getAutonomyDescription,
    handleEmergencyStop,
    handleAutonomyChange,
    toggleRiskAcceptance,
    
    toggleDataConnection,
    toggleMonitoringParameter,
    
    startAutonomousExecution,
    setSafetyOverride,
    acceptAllRisks,
    cancelAutoLaunch
  };
};
