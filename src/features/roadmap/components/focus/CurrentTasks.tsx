
import React from 'react';
import { AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SubTask {
  name: string;
  completed: boolean;
}

interface Task {
  title: string;
  description: string;
  progress: number;
  priority: "high" | "medium" | "low";
  daysLeft: number;
  subtasks: SubTask[];
}

interface CurrentTasksProps {
  tasks: Task[];
}

export const CurrentTasks = ({ tasks }: CurrentTasksProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Clock className="h-4 w-4 text-primary" />
        <span>În lucru acum</span>
      </h3>
      
      <div className="grid gap-4 md:grid-cols-2">
        {tasks.map((task, index) => (
          <div key={index} className="border rounded-lg p-4 bg-background/60 backdrop-blur-sm">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium">{task.title}</h4>
              <Badge variant={task.priority === "high" ? "destructive" : "secondary"}>
                {task.priority === "high" ? "Prioritate înaltă" : "Prioritate medie"}
              </Badge>
            </div>
            
            <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
            
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Progres</span>
                <span className="font-medium">{task.progress}%</span>
              </div>
              <Progress value={task.progress} className="h-2" />
            </div>
            
            <div className="mt-3 flex items-center gap-1 text-xs text-amber-600">
              <AlertCircle className="h-3 w-3" />
              <span>{task.daysLeft} zile rămase</span>
            </div>
            
            <div className="mt-3 space-y-1">
              {task.subtasks.map((subtask, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs">
                  <span className={cn(
                    "w-3 h-3 rounded-full flex items-center justify-center",
                    subtask.completed ? "bg-green-500" : "bg-gray-200"
                  )}>
                    {subtask.completed && (
                      <CheckCircle2 className="h-2 w-2 text-white" />
                    )}
                  </span>
                  <span className={subtask.completed ? "line-through text-muted-foreground" : ""}>
                    {subtask.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
