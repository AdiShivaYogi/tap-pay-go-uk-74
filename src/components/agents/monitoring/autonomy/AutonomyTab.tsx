import React from 'react';
import { RiskAcceptance } from "../safety/components/ExecutionTab/RiskAcceptance";
import { useSafetyPanel } from "../safety/hooks/useSafetyPanel";

export const AutonomyTab: React.FC = () => {
  const { 
    acceptedRisks, 
    toggleRiskAcceptance, 
    startAutonomousExecution,
    autonomyLevel = 0 // Adăugăm un default pentru a rezolva eroarea de tip
  } = useSafetyPanel();

  return (
    <div>
      <RiskAcceptance
        acceptedRisks={acceptedRisks}
        toggleRiskAcceptance={toggleRiskAcceptance}
        startAutonomousExecution={startAutonomousExecution}
      />
      {/* Alte componente pentru fila de autonomie */}
    </div>
  );
};
