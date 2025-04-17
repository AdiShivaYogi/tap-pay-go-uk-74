
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { RiskLevel } from "../types";

export const useSafetyPanel = () => {
  const { toast } = useToast();
  const [autonomyLevel, setAutonomyLevel] = useState(65);
  const [safetyOverride, setSafetyOverride] = useState(true);
  const [acceptedRisks, setAcceptedRisks] = useState<RiskLevel[]>(["mediu"]);
  const [showAutonomyAlert, setShowAutonomyAlert] = useState(true);
  const [agentsRunning, setAgentsRunning] = useState(false);
  const [autoLaunchPending, setAutoLaunchPending] = useState(true);
  const [timeToAutoLaunch, setTimeToAutoLaunch] = useState(15); // secunde
  
  const [systemsActive, setSystemsActive] = useState({
    riskEvaluation: true,
    ethicalBoundaries: true,
    auditLogs: true,
    humanSupervision: false,
    autonomyLimits: false,
    emergencyStop: true,
    dataSources: false,
    realTimeMonitoring: false,
    riskAlgorithm: false,
    adaptiveSafety: false,
  });

  // State for data connections and monitoring parameters
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

  const [implementationProgress, setImplementationProgress] = useState({
    dataSources: 15,
    riskEvaluation: 25,
    monitoring: 30,
    logging: 20,
    adaptiveSafety: 10,
  });

  // Auto lansare - reduce timpul înainte de lansarea automată
  useEffect(() => {
    let timer: number | null = null;
    
    if (autoLaunchPending && timeToAutoLaunch > 0) {
      timer = window.setTimeout(() => {
        setTimeToAutoLaunch(prev => prev - 1);
      }, 1000);
    } else if (autoLaunchPending && timeToAutoLaunch === 0) {
      // Auto-acceptăm riscurile și pornim agenții automat
      setAcceptedRisks(["scazut", "mediu", "ridicat"]);
      setSafetyOverride(true);
      setAutoLaunchPending(false);
      startAutonomousExecution();
      toast({
        title: "Lansare automată activată",
        description: "Agenții autonomi au fost lansați automat cu acceptarea riscurilor necesare.",
      });
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [autoLaunchPending, timeToAutoLaunch, toast]);

  const handleToggleSystem = (system: keyof typeof systemsActive) => {
    setSystemsActive(prev => ({ ...prev, [system]: !prev[system] }));
    
    toast({
      title: systemsActive[system] ? "Sistem dezactivat" : "Sistem activat",
      description: `Sistemul de ${getSystemName(system)} a fost ${systemsActive[system] ? "dezactivat" : "activat"}.`,
    });

    // Dacă activăm unul dintre noile sisteme, actualizăm progresul
    if (!systemsActive[system] && 
        (system === 'dataSources' || system === 'realTimeMonitoring' || 
         system === 'riskAlgorithm' || system === 'adaptiveSafety')) {
      // Incrementăm progresul de implementare pentru acest sistem
      const progressKey = system === 'dataSources' ? 'dataSources' :
                         system === 'realTimeMonitoring' ? 'monitoring' :
                         system === 'riskAlgorithm' ? 'riskEvaluation' : 'adaptiveSafety';
      
      setImplementationProgress(prev => ({
        ...prev,
        [progressKey]: Math.min(prev[progressKey as keyof typeof prev] + 10, 100)
      }));
    }
  };

  const getSystemName = (system: string): string => {
    const names: Record<string, string> = {
      riskEvaluation: "evaluare a riscurilor",
      ethicalBoundaries: "limite etice",
      auditLogs: "jurnalizare audit",
      humanSupervision: "supervizare umană",
      autonomyLimits: "limitare autonomie",
      emergencyStop: "oprire de urgență",
      dataSources: "conectare surse de date",
      realTimeMonitoring: "monitorizare în timp real",
      riskAlgorithm: "algoritm evaluare risc",
      adaptiveSafety: "siguranță adaptivă"
    };
    return names[system] || system;
  };

  const getAutonomyDescription = (): string => {
    if (autonomyLevel < 20) return "Supervizare umană strictă - Agenții necesită aprobare pentru majoritatea acțiunilor";
    if (autonomyLevel < 40) return "Autonomie limitată - Agenții pot executa sarcini de bază fără aprobare";
    if (autonomyLevel < 60) return "Semi-autonom - Agenții pot lua decizii în cadrul parametrilor definiți";
    if (autonomyLevel < 80) return "Majoritar autonom - Intervenție umană doar pentru decizii critice";
    return "Complet autonom - Intervenție umană minimă, doar în cazuri excepționale";
  };

  const handleEmergencyStop = () => {
    setAutonomyLevel(0);
    setAgentsRunning(false);
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
    toast({
      title: "OPRIRE DE URGENȚĂ ACTIVATĂ",
      description: "Toți agenții au fost opriți. Sistemele de siguranță sunt acum în control total.",
      variant: "destructive"
    });
  };

  const handleAutonomyChange = (value: number[]) => {
    setAutonomyLevel(value[0]);
    
    // Am eliminat restricția pentru niveluri înalte de autonomie
    // pentru a facilita auto-lansarea și evoluția agenților
  };

  const toggleRiskAcceptance = (risk: RiskLevel) => {
    if (acceptedRisks.includes(risk)) {
      setAcceptedRisks(prev => prev.filter(r => r !== risk));
    } else {
      setAcceptedRisks(prev => [...prev, risk]);
    }
  };

  // Setare automată pentru toate riscurile (pentru auto-lansare)
  const acceptAllRisks = () => {
    setAcceptedRisks(["scazut", "mediu", "ridicat"]);
    toast({
      title: "Toate riscurile acceptate",
      description: "Toate nivelurile de risc au fost acceptate pentru a permite lansarea rapidă a agenților.",
    });
  };

  const cancelAutoLaunch = () => {
    setAutoLaunchPending(false);
    toast({
      title: "Lansare automată anulată",
      description: "Puteți lansa agenții manual când sunteți pregătiți.",
    });
  };

  const toggleDataConnection = (connection: keyof typeof dataConnections) => {
    setDataConnections(prev => ({ ...prev, [connection]: !prev[connection] }));
    
    // Incrementăm progresul de implementare pentru surse de date
    setImplementationProgress(prev => ({
      ...prev,
      dataSources: Math.min(prev.dataSources + 5, 100)
    }));
    
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
    autonomyLevel,
    safetyOverride,
    acceptedRisks,
    systemsActive,
    dataConnections,
    monitoringParameters,
    implementationProgress,
    showAutonomyAlert,
    agentsRunning,
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
