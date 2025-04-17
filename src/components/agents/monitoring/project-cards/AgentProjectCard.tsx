
import React from "react";
import { StyledCard, StyledCardContent } from "@/components/ui/cards";
import { ProgressBar } from "./ProgressBar";
import { StatusBadge } from "./StatusBadge";
import { PriorityBadge } from "./PriorityBadge";
import { TimeframeBadge } from "./TimeframeBadge";
import { TaskList } from "./TaskList";
import { AgentProject } from "./types";
import { IntegrationStatusBadge } from "./IntegrationStatusBadge";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface AgentProjectCardProps {
  project: AgentProject;
}

export const AgentProjectCard: React.FC<AgentProjectCardProps> = ({ project }) => {
  const IconComponent = project.icon;
  const isAutonomyProject = project.title === "Noua Eră a Autonomiei";
  
  return (
    <StyledCard 
      className={cn(
        "w-full h-full", 
        isAutonomyProject ? "border-amber-300 shadow-amber-100/50 shadow-md" : ""
      )}
    >
      <StyledCardContent className="p-0">
        <div className="p-5 border-b border-border">
          <div className="flex justify-between items-start mb-3">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-medium">{project.title}</h3>
                {isAutonomyProject && (
                  <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs py-0.5 px-1.5 flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    Nouă Eră
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
            
            {project.integrationProgress !== undefined && (
              <IntegrationStatusBadge 
                type="autonomy" 
                progress={project.integrationProgress} 
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
