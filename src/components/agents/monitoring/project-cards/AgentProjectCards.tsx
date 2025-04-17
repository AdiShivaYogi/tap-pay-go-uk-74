
import React from "react";
import { AgentProjectCard } from "./AgentProjectCard";
import { agentProjects } from "./projectsData";

export const AgentProjectCards: React.FC = () => {
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {agentProjects.map((project, index) => (
        <AgentProjectCard key={index} project={project} />
      ))}
    </div>
  );
};
