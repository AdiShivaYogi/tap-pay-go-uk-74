
import { useToast } from "@/hooks/use-toast";
import { useAutonomyControls } from "./useAutonomyControls";
import { useSystemsControls } from "./useSystemsControls";
import { useImplementationProgress } from "./useImplementationProgress";
import { useDataConnections } from "./useDataConnections";
import { useExecutionControls } from "./useExecutionControls";
import { useAutoLaunch } from "./useAutoLaunch";
import { agents } from "@/components/agents/agents-data";

export const useSafetyPanel = () => {
  const { toast } = useToast();
  
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

  // Enhanced implementation for launching all agents
  const startAutonomousExecution = () => {
    setAgentsRunning(true);
    setAutonomyLevel(100);
    setSystemsActive({
      riskEvaluation: true,
      humanSupervision: false,
      autonomyLimits: false,
      dataSources: true,
      realTimeMonitoring: true,
      adaptiveSafety: true,
      riskAlgorithm: true,
      auditLogs: true,
      ethicalBoundaries: true,
      emergencyStop: true
    });

    // Use the existing properties on dataConnections
    setDataConnections(prevConnections => ({
      ...prevConnections,
      agentSystem: true,
      monitoringPlatform: true,
      analyticsEngine: true,
      safetyFramework: true
    }));

    // Use the existing properties on monitoringParameters
    setMonitoringParameters(prevParams => ({
      ...prevParams,
      autonomyLevels: true,
      resourceUsage: true,
      decisionQuality: true,
      learningProgress: true
    }));

    setAcceptedRisks(["scazut", "mediu", "ridicat"]);
    setSafetyOverride(true);

    const agentNames = agents.map(agent => agent.name).join(", ");
    
    toast({
      title: "Lansare Completă a Tuturor Agenților",
      description: `${agentNames} sunt acum complet autonomi și operaționali.`,
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
