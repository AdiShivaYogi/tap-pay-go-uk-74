
import React, { useEffect } from 'react';
import { AgentTaskExtended } from '../types/task.types';
import { TaskItem } from './TaskItem';
import { Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sortTasks } from '../utils/task-calculations';

interface TasksListProps {
  tasks: AgentTaskExtended[];
  sortBy: string;
  loading: boolean;
  assigningTask: string | null;
  isCreatingTask: boolean;
  onAssignTask: (taskId: string) => void;
  onCreateTask: () => void;
}

export const TasksList: React.FC<TasksListProps> = ({
  tasks,
  sortBy,
  loading,
  assigningTask,
  isCreatingTask,
  onAssignTask,
  onCreateTask
}) => {
  // Adăugăm un efect pentru a loga când se schimbă criteriul de sortare sau taskurile
  useEffect(() => {
    console.log("TasksList: sortBy changed to", sortBy);
  }, [sortBy]);
  
  // Sortăm taskurile conform criteriului selectat
  const sortedTasks = sortTasks(tasks, sortBy);
  
  // Adăugăm un log pentru a verifica rezultatul sortării
  console.log("Sorted tasks:", sortedTasks.map(t => `${t.title} (${t.progress}%, score: ${t.recommendationScore})`));
  
  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }
  
  if (sortedTasks.length === 0) {
    return (
      <div className="text-center py-6 text-muted-foreground">
        <p>Nu există taskuri disponibile pentru acest agent.</p>
        
        <div className="mt-4 flex justify-center">
          <Button 
            size="sm" 
            variant="outline" 
            onClick={onCreateTask}
            disabled={isCreatingTask}
            className="flex items-center gap-1"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Generează o propunere de task</span>
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {sortedTasks.map((task) => (
        <TaskItem 
          key={task.id} 
          task={task} 
          onAssign={onAssignTask} 
          isAssigning={assigningTask === task.id}
        />
      ))}
    </div>
  );
};
