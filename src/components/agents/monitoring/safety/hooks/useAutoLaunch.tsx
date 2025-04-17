
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { RiskLevel } from "../types";

export const useAutoLaunch = (
  setAcceptedRisks: React.Dispatch<React.SetStateAction<RiskLevel[]>>,
  setSafetyOverride: React.Dispatch<React.SetStateAction<boolean>>,
  startAutonomousExecution: () => void
) => {
  const { toast } = useToast();
  const [autoLaunchPending, setAutoLaunchPending] = useState(true);
  const [timeToAutoLaunch, setTimeToAutoLaunch] = useState(15); // secunde

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
  }, [autoLaunchPending, timeToAutoLaunch, toast, setAcceptedRisks, setSafetyOverride, startAutonomousExecution]);

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

  return {
    autoLaunchPending,
    timeToAutoLaunch,
    acceptAllRisks,
    cancelAutoLaunch,
  };
};
