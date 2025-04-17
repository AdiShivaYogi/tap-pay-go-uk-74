
import { useToast } from "@/hooks/use-toast";
import { useAutonomyControls } from "./useAutonomyControls";
import { useSystemsControls } from "./useSystemsControls";
import { useImplementationProgress } from "./useImplementationProgress";
import { useDataConnections } from "./useDataConnections";
import { useExecutionControls } from "./useExecutionControls";
import { useAutoLaunch } from "./useAutoLaunch";

export const useSafetyPanel = () => {
  const { toast } = useToast();
  
  // Import hooks for different functionalities
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

  const {
    safetyOverride,
    setSafetyOverride,
    showAutonomyAlert,
    setShowAutonomyAlert,
    startAutonomousExecution
  } = useExecutionControls({
    setSystemsActive,
    setDataConnections,
    setMonitoringParameters,
    setAgentsRunning,
    setAutonomyLevel
  });

  // Wrapper pentru handleEmergencyStop pentru a include restul funcționalităților
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

  // Integrare cu hook-ul de auto lansare
  const { 
    autoLaunchPending, 
    timeToAutoLaunch,
    acceptAllRisks,
    cancelAutoLaunch 
  } = useAutoLaunch(
    setAcceptedRisks, 
    setSafetyOverride, 
    startAutonomousExecution
  );

  return {
    // State și funcții pentru nivelul de autonomie
    autonomyLevel,
    safetyOverride,
    acceptedRisks,
    agentsRunning,
    
    // State și funcții pentru sistemele active
    systemsActive,
    
    // State și funcții pentru conexiunile de date
    dataConnections,
    monitoringParameters,
    
    // State pentru progresul implementării
    implementationProgress,
    
    // State pentru alerte și auto-lansare
    showAutonomyAlert,
    autoLaunchPending,
    timeToAutoLaunch,
    
    // Setteri
    setShowAutonomyAlert,
    
    // Funcții pentru sisteme
    handleToggleSystem,
    getSystemName,
    
    // Funcții pentru autonomie
    getAutonomyDescription,
    handleEmergencyStop,
    handleAutonomyChange,
    toggleRiskAcceptance,
    
    // Funcții pentru conexiuni de date
    toggleDataConnection,
    toggleMonitoringParameter,
    
    // Funcții pentru execuție și lansare
    startAutonomousExecution,
    setSafetyOverride,
    acceptAllRisks,
    cancelAutoLaunch
  };
};
