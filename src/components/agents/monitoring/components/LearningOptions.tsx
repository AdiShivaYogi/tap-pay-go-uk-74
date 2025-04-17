
import React from "react";
import { AgentLearningPanel } from "../AgentLearningPanel";
import { AgentAutoLearning } from "../AgentAutoLearning";
import { AgentLearningProgress } from "../AgentLearningProgress";

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
    </>
  );
};
