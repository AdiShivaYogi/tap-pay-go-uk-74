
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Sparkles, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface ProjectHeaderProps {
  title: string;
  description: string;
  icon: LucideIcon;
  isAutonomyProject: boolean;
  executionComplete: boolean;
}

export const ProjectHeader: React.FC<ProjectHeaderProps> = ({
  title,
  description,
  icon: IconComponent,
  isAutonomyProject,
  executionComplete,
}) => {
  return (
    <div className="flex justify-between items-start mb-3">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-lg font-medium">{title}</h3>
          {isAutonomyProject && (
            <>
              <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs py-0.5 px-1.5 flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                Nouă Eră
              </Badge>
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs py-0.5 px-1.5 flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" />
                Implementat
              </Badge>
            </>
          )}
          {executionComplete && !isAutonomyProject && (
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs py-0.5 px-1.5 flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" />
              Implementat
            </Badge>
          )}
        </div>
        <p className="text-muted-foreground text-sm mb-3">{description}</p>
      </div>
      <div className="text-primary text-xl">
        <IconComponent />
      </div>
    </div>
  );
};
