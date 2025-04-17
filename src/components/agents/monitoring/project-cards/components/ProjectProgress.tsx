
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Loader2, CheckCircle2 } from "lucide-react";

export interface ProjectProgressProps {
  progress: number;
  completedTasks: number;
  totalTasks: number;
  isExecuting: boolean;
}

export const ProjectProgress: React.FC<ProjectProgressProps> = ({ 
  progress, 
  completedTasks, 
  totalTasks,
  isExecuting
}) => {
  const completionPercentage = Math.round((completedTasks / totalTasks) * 100);
  
  return (
    <div className="mt-4 mb-2">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-medium text-muted-foreground">
          {isExecuting ? (
            <span className="flex items-center text-amber-600">
              <Loader2 className="h-3 w-3 mr-1 animate-spin" />
              Execuție automată...
            </span>
          ) : completedTasks === totalTasks ? (
            <span className="flex items-center text-green-600">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Complet implementat
            </span>
          ) : (
            `${completedTasks} din ${totalTasks} taskuri finalizate`
          )}
        </span>
        <span className="text-xs font-medium">{completionPercentage}%</span>
      </div>
      
      <Progress 
        value={isExecuting ? progress : completionPercentage} 
        className="h-1.5"
      />
    </div>
  );
};
