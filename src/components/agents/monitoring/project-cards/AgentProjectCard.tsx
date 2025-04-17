
import React from "react";
import { StyledCard, StyledCardContent } from "@/components/ui/cards";
import { ProgressBar } from "./ProgressBar";
import { StatusBadge } from "./StatusBadge";
import { PriorityBadge } from "./PriorityBadge";
import { TimeframeBadge } from "./TimeframeBadge";
import { TaskList } from "./TaskList";
import { AgentProject } from "./types";
import { IntegrationStatusBadge, IntegrationType } from "./IntegrationStatusBadge";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface AgentProjectCardProps {
  project: AgentProject;
}

export const AgentProjectCard: React.FC<AgentProjectCardProps> = ({ project }) => {
  const IconComponent = project.icon;
  const isAutonomyProject = project.title === "Noua Eră a Autonomiei";
  
  // Determinăm datele de integrare bazate pe proiect
  const getIntegrationData = () => {
    // Pentru proiectul "Noua Eră a Autonomiei" și cele din secțiunea "Infrastructură de Siguranță"
    if (isAutonomyProject || project.title.includes("Conectare") || 
        project.title.includes("Algoritm Evaluare") || 
        project.title.includes("Jurnalizare") ||
        project.title.includes("Siguranță Adaptivă") ||
        project.title.includes("Parametri de Monitorizare")) {
      
      // Determinăm tipul de integrare
      let integrationType: IntegrationType = "dataSources";
      
      if (project.title.includes("Conectare") || project.title.includes("Date")) {
        integrationType = "dataSources";
      } else if (project.title.includes("Risc") || project.title.includes("Evaluare")) {
        integrationType = "riskEvaluation";
      } else if (project.title.includes("Monitor")) {
        integrationType = "monitoring";
      } else if (project.title.includes("Jurnal")) {
        integrationType = "logging";
      } else if (project.title.includes("Adaptiv") || project.title.includes("Siguranță Adaptivă")) {
        integrationType = "adaptiveSafety";
      }
      
      // Calculăm progresul pentru acest tip de integrare
      const progress = calculateIntegrationProgress(project);
      
      return { 
        show: true,
        type: integrationType,
        progress: progress
      };
    }
    
    return { show: false };
  };
  
  const calculateIntegrationProgress = (project: AgentProject): number => {
    // Dacă avem un progress direct din proiect, îl folosim
    if (project.integrationProgress) {
      return project.integrationProgress;
    }
    
    // Altfel calculăm bazat pe taskuri completate
    const completedTasks = project.tasks.filter(task => task.completed).length;
    const totalTasks = project.tasks.length;
    return Math.round((completedTasks / totalTasks) * 100);
  };
  
  const integrationData = getIntegrationData();
  
  return (
    <StyledCard className={cn("w-full h-full", 
      isAutonomyProject ? "border-amber-300 shadow-amber-100/50 shadow-md" : "")}>
      <StyledCardContent className="p-0">
        <div className="p-5 border-b border-border">
          <div className="flex justify-between items-start mb-3">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-medium">{project.title}</h3>
                {isAutonomyProject && (
                  <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs py-0.5 px-1.5 flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    Prioritar
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground text-sm mb-3">{project.description}</p>
            </div>
            <div className="text-primary text-xl">
              <IconComponent />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <StatusBadge status={project.status} />
            <PriorityBadge priority={project.priority} />
            <TimeframeBadge timeframe={project.timeframe} />
            
            {integrationData.show && (
              <IntegrationStatusBadge 
                type={integrationData.type} 
                progress={integrationData.progress} 
              />
            )}
          </div>
        </div>
        
        <div className="p-5">
          <ProgressBar timeUsed={project.timeUsed} timeTotal={project.timeTotal} />
          <TaskList tasks={project.tasks} />
        </div>
      </StyledCardContent>
    </StyledCard>
  );
};
