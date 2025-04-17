
import React from 'react';
import { Check, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AgentTask } from './types';

interface TaskItemProps {
  task: AgentTask & { inProgress?: boolean };
}

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  return (
    <div className={cn(
      "flex items-center justify-between p-2 rounded-md border",
      task.completed ? "border-green-100 bg-green-50/50" : 
      task.inProgress ? "border-amber-100 bg-amber-50/50 animate-pulse" : 
      "border-gray-100 bg-gray-50/50"
    )}>
      <div className="flex items-center gap-2">
        <div className={cn(
          "w-5 h-5 flex items-center justify-center rounded-full text-white",
          task.completed ? "bg-green-500" : 
          task.inProgress ? "bg-amber-500" : 
          "bg-gray-300"
        )}>
          {task.completed ? (
            <Check className="h-3 w-3" />
          ) : task.inProgress ? (
            <Loader2 className="h-3 w-3 animate-spin" />
          ) : (
            <span className="block w-2 h-2 bg-white rounded-full" />
          )}
        </div>
        <span className={cn(
          "text-sm",
          task.completed ? "text-green-800" : 
          task.inProgress ? "text-amber-800" : 
          "text-gray-700"
        )}>
          {task.name}
          {task.inProgress && (
            <span className="text-amber-600 text-xs ml-2">
              implementare...
            </span>
          )}
        </span>
      </div>
    </div>
  );
};
