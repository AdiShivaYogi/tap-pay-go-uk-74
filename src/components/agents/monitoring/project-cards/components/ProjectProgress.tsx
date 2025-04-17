
import React from "react";
import { cn } from "@/lib/utils";
import { ProgressBar } from "../ProgressBar";

interface ProjectProgressProps {
  isExecuting: boolean;
  progress: number;
  timeUsed: number;
  timeTotal: number;
  isAutonomyProject: boolean;
  executionComplete: boolean;
}

export const ProjectProgress: React.FC<ProjectProgressProps> = ({
  isExecuting,
  progress,
  timeUsed,
  timeTotal,
  isAutonomyProject,
  executionComplete,
}) => {
  if (isExecuting) {
    return (
      <div className="w-full">
        <div className="flex justify-between text-xs text-muted-foreground mb-1">
          <span>Implementare automată în curs...</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className={cn(
              "h-full rounded-full transition-all duration-500 ease-out",
              progress < 30 ? "bg-amber-500" : 
              progress < 70 ? "bg-amber-400" : "bg-green-500"
            )}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    );
  }
  
  return (
    <ProgressBar 
      timeUsed={isAutonomyProject ? 30 : timeUsed} 
      timeTotal={timeTotal} 
      completed={isAutonomyProject || executionComplete}
    />
  );
};
