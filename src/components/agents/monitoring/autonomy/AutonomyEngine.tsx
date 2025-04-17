
import React, { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { logAgentActivity } from "../hooks/utils/activity-processing";
import { AgentLearningProgress } from "../AgentLearningProgress";
import { EthicsProtocol } from "./EthicsProtocol";
import { EvaluationMechanism } from "./EvaluationMechanism";

export const AutonomyEngine = () => {
  const { toast } = useToast();
  
  // Inițializăm motorul de autonomie la încărcarea componentei
  useEffect(() => {
    const initializeAutonomyEngine = () => {
      // Înregistrăm inițializarea motorului de autonomie
      logAgentActivity(
        "system-core",
        "Motorul de autonomie a fost inițializat cu protecție etică și capacitate de auto-evaluare",
        "autonomy"
      );
      
      toast({
        title: "Motorul de Autonomie activat",
        description: "Toate sistemele de autonomie sunt active și funcționale",
        duration: 5000,
      });
    };
    
    // Inițializăm cu întârziere pentru a permite încărcarea celorlalte componente
    const timer = setTimeout(() => {
      initializeAutonomyEngine();
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [toast]);
  
  return (
    <div className="space-y-6 mt-6">
      <AgentLearningProgress />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <EthicsProtocol />
        <EvaluationMechanism />
      </div>
    </div>
  );
};
