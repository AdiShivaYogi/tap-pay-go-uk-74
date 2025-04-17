
import React from "react";
import { cn } from "@/lib/utils";
import { ProgressBar } from "../ProgressBar";

interface ProjectProgressProps {
  progress: number;
  completedTasksCount?: number;
  totalTasks?: number;
  isExecuting?: boolean;
  timeUsed?: number;
  timeTotal?: number;
  isAutonomyProject?: boolean;
  executionComplete?: boolean;
}

export const ProjectProgress: React.FC<ProjectProgressProps> = ({
  isExecuting,
  progress,
  completedTasksCount,
  totalTasks,
  timeUsed = 0,
  timeTotal = 0,
  isAutonomyProject = false,
  executionComplete = false,
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
  
  if (completedTasksCount !== undefined && totalTasks !== undefined) {
    return (
      <div className="mb-4">
        <div className="flex justify-between text-xs text-muted-foreground mb-1">
          <span>Progres implementare</span>
          <span>{completedTasksCount} din {totalTasks} taskuri</span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className={cn(
              "h-full rounded-full transition-all duration-300",
              completedTasksCount === totalTasks ? "bg-green-500" : "bg-amber-500"
            )}
            style={{ width: `${(completedTasksCount / totalTasks) * 100}%` }}
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
