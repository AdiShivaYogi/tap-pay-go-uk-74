
import React from "react";
import { StyledCardHeader, StyledCardTitle, StyledCardDescription } from "@/components/ui/cards";
import { Sparkles } from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface ProjectHeaderProps {
  title: string;
  description: string;
  icon: LucideIcon;
  isAutonomyProject?: boolean;
  executionComplete?: boolean;
}

export const ProjectHeader: React.FC<ProjectHeaderProps> = ({
  title,
  description,
  icon: Icon,
  isAutonomyProject = false,
  executionComplete = false
}) => {
  return (
    <StyledCardHeader>
      <StyledCardTitle className="flex items-center gap-2">
        <Icon className={`h-5 w-5 ${isAutonomyProject ? "text-amber-500" : ""}`} />
        <span>{title}</span>
        {isAutonomyProject && (
          <span className="ml-2">
            <Sparkles className="h-4 w-4 text-amber-500" />
          </span>
        )}
      </StyledCardTitle>
      
      <StyledCardDescription>
        {description}
      </StyledCardDescription>
    </StyledCardHeader>
  );
};
