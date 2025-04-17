
import React from "react";
import { useSafetyPanel } from "../hooks/useSafetyPanel";
import { AutoLaunchCountdown } from "./ExecutionTab/AutoLaunchCountdown";
import { PriorityAlert } from "./PriorityAlert";

export const AutoLaunchContainer: React.FC = () => {
  const {
    autoLaunchPending,
    timeToAutoLaunch,
    showAutonomyAlert,
    setShowAutonomyAlert,
    acceptAllRisks,
    cancelAutoLaunch,
    startAutonomousExecution
  } = useSafetyPanel();
  
  return (
    <>
      <PriorityAlert 
        onDismiss={() => setShowAutonomyAlert(false)} 
        show={showAutonomyAlert} 
      />
      
      {autoLaunchPending && timeToAutoLaunch > 0 && (
        <AutoLaunchCountdown 
          timeToAutoLaunch={timeToAutoLaunch}
          cancelAutoLaunch={cancelAutoLaunch}
          acceptAllRisks={acceptAllRisks}
          startAutonomousExecution={startAutonomousExecution}
        />
      )}
    </>
  );
};

