
import React from "react";
import { RiskAcceptance } from "./RiskAcceptance";
import { AgentAutonomyLevel } from "./AgentAutonomyLevel";
import { AutoExecutionSystems } from "./AutoExecutionSystems";
import { ExecutionPolicies } from "./ExecutionPolicies";
import { RiskLevel } from "../../types";

interface ExecutionTabProps {
  autonomyLevel: number;
  safetyOverride: boolean;
  acceptedRisks: RiskLevel[];
  getAutonomyDescription: () => string;
  handleAutonomyChange: (value: number[]) => void;
  toggleRiskAcceptance: (risk: RiskLevel) => void;
  startAutonomousExecution: () => void;
}

export const ExecutionTab: React.FC<ExecutionTabProps> = ({
  autonomyLevel,
  safetyOverride,
  acceptedRisks,
  getAutonomyDescription,
  handleAutonomyChange,
  toggleRiskAcceptance,
  startAutonomousExecution
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RiskAcceptance 
          acceptedRisks={acceptedRisks}
          toggleRiskAcceptance={toggleRiskAcceptance}
          startAutonomousExecution={startAutonomousExecution}
        />
        <AgentAutonomyLevel 
          autonomyLevel={autonomyLevel}
          safetyOverride={safetyOverride}
          getAutonomyDescription={getAutonomyDescription}
          handleAutonomyChange={handleAutonomyChange}
        />
      </div>
      
      <AutoExecutionSystems />
      <ExecutionPolicies />
    </div>
  );
};
