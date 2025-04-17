
import React from "react";
import { Separator } from "@/components/ui/separator";
import { LearningRuleItem } from "./LearningRuleItem";
import { AgentLearningRule } from "../../hooks/types/agent-monitoring.types";

interface LearningRulesListProps {
  learningRules: AgentLearningRule[];
  testAgents: { id: string; name: string }[];
  toggleLearningRule: (sourceId: string, targetId: string) => void;
  removeLearningRule: (sourceId: string, targetId: string) => void;
}

export const LearningRulesList: React.FC<LearningRulesListProps> = ({
  learningRules,
  testAgents,
  toggleLearningRule,
  removeLearningRule
}) => {
  if (learningRules.length === 0) {
    return null;
  }
  
  return (
    <>
      <Separator />
      <div>
        <h3 className="text-sm font-medium mb-2">Reguli de auto-învățare active:</h3>
        <div className="space-y-2">
          {learningRules.map((rule, index) => (
            <LearningRuleItem
              key={index}
              rule={rule}
              index={index}
              agentNames={testAgents}
              toggleLearningRule={toggleLearningRule}
              removeLearningRule={removeLearningRule}
            />
          ))}
        </div>
      </div>
    </>
  );
};
