
import React from "react";
import { AgentAutonomyOverview } from "./autonomy/AgentAutonomyOverview";
import { AutonomyCard } from "./autonomy/AutonomyCard";
import { AutoExecutionButton } from "./autonomy/AutoExecutionButton";

interface AutonomyOverviewSectionProps {
  autonomyLevel: number;
  agentsRunning: boolean;
}

export const AutonomyOverviewSection: React.FC<AutonomyOverviewSectionProps> = ({
  autonomyLevel,
  agentsRunning
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-2">
          <AgentAutonomyOverview autonomyLevel={autonomyLevel} agentsRunning={agentsRunning} />
        </div>
        <div className="md:col-span-1">
          <AutonomyCard />
        </div>
      </div>
      
      <div className="mb-6">
        <AutoExecutionButton />
      </div>
    </>
  );
};
