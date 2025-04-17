
import React, { useState } from "react";
import { AgentProjectCard } from "./AgentProjectCard";
import { normalizedAgentProjects } from "./data"; // Use normalized projects
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export const AgentProjectCards: React.FC = () => {
  const [category, setCategory] = useState<string>("all");
  
  // Filtrăm proiectele în funcție de categorie
  const filteredProjects = category === "all" 
    ? normalizedAgentProjects 
    : category === "safety" 
      ? normalizedAgentProjects.filter(project => 
          project.title.includes("Conectare") ||
          project.title.includes("Algoritm") ||
          project.title.includes("Jurnalizare") ||
          project.title.includes("Siguranță") ||
          project.title.includes("Parametri de Monitorizare") ||
          project.title.includes("Raportare") ||
          project.title.includes("Securitate") ||
          project.title.includes("Limitare") ||
          project.title === "Noua Eră a Autonomiei"
        )
      : category === "autonomy"
        ? normalizedAgentProjects.filter(project => 
            project.title.includes("Autonomie") || 
            project.title.includes("Auto-") ||
            project.title.includes("Creativitate") ||
            project.title.includes("Planificare") ||
            project.title.includes("Execuție Autonomă") ||
            project.title === "Noua Eră a Autonomiei"
          )
        : normalizedAgentProjects.filter(project => 
            !project.title.includes("Conectare") &&
            !project.title.includes("Algoritm") &&
            !project.title.includes("Jurnalizare") &&
            !project.title.includes("Siguranță") &&
            !project.title.includes("Parametri") &&
            !project.title.includes("Raportare") &&
            !project.title.includes("Securitate") &&
            !project.title.includes("Limitare") &&
            !project.title.includes("Autonomie") &&
            !project.title.includes("Auto-") &&
            !project.title.includes("Creativitate") &&
            !project.title.includes("Planificare") &&
            !project.title.includes("Execuție Autonomă") &&
            project.title !== "Noua Eră a Autonomiei"
          );

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all" onValueChange={setCategory} value={category}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">Toate proiectele</TabsTrigger>
          <TabsTrigger value="safety">Infrastructură de siguranță</TabsTrigger>
          <TabsTrigger value="autonomy">Proiecte de autonomie</TabsTrigger>
          <TabsTrigger value="other">Alte proiecte</TabsTrigger>
        </TabsList>
        
        <TabsContent value={category} className="mt-0">
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <AgentProjectCard key={index} project={project} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
