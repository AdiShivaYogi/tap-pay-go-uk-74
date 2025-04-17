
import React from "react";
import { StyledCard, StyledCardContent } from "@/components/ui/cards";
import { ProgressBar } from "./ProgressBar";
import { StatusBadge } from "./StatusBadge";
import { PriorityBadge } from "./PriorityBadge";
import { TimeframeBadge } from "./TimeframeBadge";
import { TaskList } from "./TaskList";
import { AgentProject } from "./types";

interface AgentProjectCardProps {
  project: AgentProject;
}

export const AgentProjectCard: React.FC<AgentProjectCardProps> = ({ project }) => {
  return (
    <StyledCard className="w-full h-full">
      <StyledCardContent className="p-0">
        <div className="p-5 border-b border-border">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-lg font-medium mb-2">{project.title}</h3>
              <p className="text-muted-foreground text-sm mb-3">{project.description}</p>
            </div>
            <div className="text-primary text-xl">{project.icon}</div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <StatusBadge status={project.status} />
            <PriorityBadge priority={project.priority} />
            <TimeframeBadge timeframe={project.timeframe} />
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
