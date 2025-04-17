
import React from 'react';
import { RiskAcceptance } from "../safety/components/ExecutionTab/RiskAcceptance";
import { useSafetyPanel } from "../safety/hooks/useSafetyPanel";

export const AutonomyTab: React.FC = () => {
  const safetyPanelData = useSafetyPanel();
  
  // Asigurăm că acceptedRisks și celelalte proprietăți sunt disponibile
  const { 
    toggleRiskAcceptance, 
    startAutonomousExecution
  } = safetyPanelData;
  
  // Asigurăm că acceptedRisks este un array (dacă nu este definit, folosim un array gol)
  const acceptedRisks = safetyPanelData.acceptedRisks || [];
  
  // Asigurăm că autonomyLevel este număr
  const autonomyLevel: number = typeof safetyPanelData.autonomyLevel === 'number' 
    ? safetyPanelData.autonomyLevel 
    : 0;

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
