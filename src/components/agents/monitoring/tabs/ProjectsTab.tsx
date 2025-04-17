
import React from "react";
import { AgentProjectCards } from "@/components/agents/monitoring/project-cards";

export const ProjectsTab: React.FC = () => {
  return (
    <>
      <div className="mb-6">
        <h2 className="text-xl font-medium mb-2">Proiecte pentru dezvoltarea agenților</h2>
        <p className="text-muted-foreground">
          Vizualizați progresul implementărilor pentru agenții AI, inclusiv funcționalități curente, 
          priorități active și planurile de viitor pentru sistemul de agenți.
        </p>
      </div>
      <AgentProjectCards />
    </>
  );
};
