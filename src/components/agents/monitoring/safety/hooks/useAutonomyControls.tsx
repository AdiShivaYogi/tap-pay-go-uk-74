
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { RiskLevel } from "../types";

export const useAutonomyControls = () => {
  const { toast } = useToast();
  const [autonomyLevel, setAutonomyLevel] = useState(65);
  const [acceptedRisks, setAcceptedRisks] = useState<RiskLevel[]>(["mediu"]);
  const [agentsRunning, setAgentsRunning] = useState(false);
  
  const getAutonomyDescription = (): string => {
    if (autonomyLevel < 20) return "Supervizare umană strictă - Agenții necesită aprobare pentru majoritatea acțiunilor";
    if (autonomyLevel < 40) return "Autonomie limitată - Agenții pot executa sarcini de bază fără aprobare";
    if (autonomyLevel < 60) return "Semi-autonom - Agenții pot lua decizii în cadrul parametrilor definiți";
    if (autonomyLevel < 80) return "Majoritar autonom - Intervenție umană doar pentru decizii critice";
    return "Complet autonom - Intervenție umană minimă, doar în cazuri excepționale";
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

  const handleEmergencyStop = () => {
    setAutonomyLevel(0);
    setAgentsRunning(false);
    toast({
      title: "OPRIRE DE URGENȚĂ ACTIVATĂ",
      description: "Toți agenții au fost opriți. Sistemele de siguranță sunt acum în control total.",
      variant: "destructive"
    });
    // Restul logicii pentru oprirea de urgență va fi apelată din hook-ul principal
  };

  return {
    autonomyLevel,
    setAutonomyLevel,
    acceptedRisks,
    setAcceptedRisks,
    agentsRunning,
    setAgentsRunning,
    getAutonomyDescription,
    handleAutonomyChange,
    toggleRiskAcceptance,
    handleEmergencyStop
  };
};
