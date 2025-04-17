
import React from "react";
import { TestAgentActivity } from "../TestAgentActivity";

interface TestToolsSectionProps {
  showTestTools: boolean;
}

export const TestToolsSection: React.FC<TestToolsSectionProps> = ({
  showTestTools
}) => {
  if (!showTestTools) {
    return null;
  }
  
  return (
    <div className="md:col-span-1">
      <TestAgentActivity />
    </div>
  );
};
