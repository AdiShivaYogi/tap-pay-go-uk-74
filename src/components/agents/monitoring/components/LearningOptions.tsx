
import React from "react";
import { AgentLearningPanel } from "../AgentLearningPanel";
import { AgentLearningProgress } from "../AgentLearningProgress";
import { AgentAutoLearning } from "./learning/AgentAutoLearning";
import { AgentLearningReports } from "../AgentLearningReports";

interface LearningOptionsProps {
  showLearning: boolean;
  showAutoLearning: boolean;
}

export const LearningOptions: React.FC<LearningOptionsProps> = ({
  showLearning,
  showAutoLearning
}) => {
  return (
    <>
      {showLearning && (
        <div className="mb-6">
          <AgentLearningPanel />
        </div>
      )}
      
      {showAutoLearning && (
        <div className="mb-6">
          <AgentAutoLearning />
        </div>
      )}
      
      <AgentLearningProgress />
      
      {showAutoLearning && <AgentLearningReports />}
    </>
  );
};
