
import React from "react";
import { AgentInnerWorldVisualization } from '@/components/3d-visualizations/AgentInnerWorldVisualization';
import { agents } from "@/components/agents/agents-data";

export const InnerWorldTab: React.FC = () => {
  return (
    <>
      <div className="mb-4">
        <h2 className="text-xl font-medium mb-2">Lumea Interioară a Agenților</h2>
        <p className="text-muted-foreground">
          Explorați sistemele interne și procesele cognitive ale fiecărui agent.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {agents.map(agent => (
          <div key={agent.id} className="h-[300px] border rounded-lg p-2">
            <h3 className="text-center mb-2">{agent.name}</h3>
            <AgentInnerWorldVisualization agentId={agent.id} />
          </div>
        ))}
      </div>
    </>
  );
};
