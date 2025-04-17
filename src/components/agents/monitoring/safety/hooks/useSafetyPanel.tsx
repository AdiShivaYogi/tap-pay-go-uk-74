
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { RiskLevel } from "../types";

export const useSafetyPanel = () => {
  const { toast } = useToast();
  const [autonomyLevel, setAutonomyLevel] = useState(65);
  const [safetyOverride, setSafetyOverride] = useState(true);
  const [acceptedRisks, setAcceptedRisks] = useState<RiskLevel[]>(["mediu"]);
  const [showAutonomyAlert, setShowAutonomyAlert] = useState(true);
  
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
    
    if (value[0] > 70 && !safetyOverride) {
      toast({
        title: "Nivelul de autonomie este ridicat",
        description: "Activați suprascrierea de siguranță pentru a permite un nivel mai ridicat de autonomie.",
        variant: "destructive"
      });
      setAutonomyLevel(70);
    }
  };

  const toggleRiskAcceptance = (risk: RiskLevel) => {
    if (acceptedRisks.includes(risk)) {
      setAcceptedRisks(prev => prev.filter(r => r !== risk));
    } else {
      setAcceptedRisks(prev => [...prev, risk]);
      
      if (risk === "ridicat") {
        toast({
          title: "Risc ridicat acceptat",
          description: "Ați acceptat riscuri ridicate. Agenții vor putea opera cu autonomie maximă.",
          variant: "warning"
        });
      }
    }
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
    if (!acceptedRisks.includes("ridicat")) {
      toast({
        title: "Risc ridicat neacceptat",
        description: "Pentru execuție complet autonomă trebuie să acceptați riscurile ridicate.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Execuție autonomă activată",
      description: "Agenții au fost lansați în modul autonom conform parametrilor configurați.",
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
    setSafetyOverride
  };
};
