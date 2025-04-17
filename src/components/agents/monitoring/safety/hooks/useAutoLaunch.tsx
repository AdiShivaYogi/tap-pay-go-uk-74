
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { RiskLevel } from "../types";
import { agents } from "@/components/agents/agents-data";

export const useAutoLaunch = (
  setAcceptedRisks: React.Dispatch<React.SetStateAction<RiskLevel[]>>,
  setSafetyOverride: React.Dispatch<React.SetStateAction<boolean>>,
  startAutonomousExecution: () => void
) => {
  const { toast } = useToast();
  const [autoLaunchPending, setAutoLaunchPending] = useState(true);
  const [timeToAutoLaunch, setTimeToAutoLaunch] = useState(3); // Reducem timpul la 3 secunde pentru lansare rapidă

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
      
      const agentNames = agents.map(agent => agent.name).join(", ");
      toast({
        title: "Lansare automată completă",
        description: `Toți agenții au fost lansați cu succes: ${agentNames}`,
        duration: 6000,
      });
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [autoLaunchPending, timeToAutoLaunch, toast, setAcceptedRisks, setSafetyOverride, startAutonomousExecution]);

  const acceptAllRisks = () => {
    setAcceptedRisks(["scazut", "mediu", "ridicat"]);
    toast({
      title: "Toate riscurile acceptate",
      description: "Toate nivelurile de risc au fost acceptate pentru a permite lansarea completă a agenților.",
      duration: 3000,
    });
  };

  const cancelAutoLaunch = () => {
    setAutoLaunchPending(false);
    toast({
      title: "Lansare automată anulată",
      description: "Puteți lansa agenții manual când sunteți pregătiți.",
      duration: 3000,
    });
  };

  return {
    autoLaunchPending,
    timeToAutoLaunch,
    acceptAllRisks,
    cancelAutoLaunch,
  };
};
