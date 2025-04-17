
import React from "react";
import { CheckCircle, Circle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskItemProps {
  task: {
    name: string;
    completed: boolean;
    inProgress?: boolean;
  };
}

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  return (
    <div className="flex items-center gap-2">
      {task.completed ? (
        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
      ) : task.inProgress ? (
        <Loader2 className="h-4 w-4 text-amber-500 flex-shrink-0 animate-spin" />
      ) : (
        <Circle className="h-4 w-4 text-muted-foreground flex-shrink-0" />
      )}
      <span
        className={cn(
          "text-sm",
          task.completed ? "text-foreground" : 
          task.inProgress ? "text-amber-700" : "text-muted-foreground"
        )}
      >
        {task.name}
      </span>
    </div>
  );
};
