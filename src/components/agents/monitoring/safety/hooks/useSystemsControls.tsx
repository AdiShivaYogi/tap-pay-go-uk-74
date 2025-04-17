
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const useSystemsControls = () => {
  const { toast } = useToast();
  
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
      // Funcția pentru actualizarea progresului este definită în useImplementationProgress
      // și va fi apelată din hook-ul principal
    }
  };

  return {
    systemsActive,
    setSystemsActive,
    getSystemName,
    handleToggleSystem
  };
};
