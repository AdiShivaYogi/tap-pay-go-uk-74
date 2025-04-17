
import React, { useState } from 'react';
import { AgentTaskExtended } from '../types/task.types';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Check, Loader2, Play, Brain, Zap, Clock, DollarSign } from "lucide-react";
import { 
  getTaskDifficultyLabel, 
  getDifficultyColor, 
  getTimeEstimate,
  getPriorityLevel
} from '../utils/task-calculations';
import { TaskDetailsDialog } from './TaskDetailsDialog';

interface TaskItemProps {
  task: AgentTaskExtended;
  onAssign: (taskId: string) => void;
  isAssigning: boolean;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onAssign, isAssigning }) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  
  return (
    <>
      <div 
        className="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors cursor-pointer shadow-sm hover:shadow-md"
        onClick={() => setIsDetailsOpen(true)}
      >
        <div className="flex justify-between items-start mb-2">
          <div>
            <h4 className="font-medium text-base">{task.title}</h4>
            <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>
          </div>
          <Badge variant={
            task.status === "completed" ? "outline" : 
            task.status === "inProgress" ? "secondary" : "default"
          } className="ml-2 whitespace-nowrap">
            {task.status === "completed" ? "Finalizat" : 
             task.status === "inProgress" ? "În progres" : "Planificat"}
          </Badge>
        </div>
        
        <div className="mt-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-muted-foreground">Progres</span>
            <span className="text-xs font-medium">{task.progress || 0}%</span>
          </div>
          <Progress value={task.progress || 0} className="h-1.5" />
        </div>
        
        <div className="mt-4 grid grid-cols-3 gap-2 mb-3">
          <div className="flex items-center gap-1 text-xs">
            <Zap className={`h-3.5 w-3.5 ${getDifficultyColor(task.difficulty)}`} />
            <span>Dificultate: <span className="font-medium">{task.difficulty}</span></span>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <Clock className="h-3.5 w-3.5 text-orange-500" />
            <span>Timp: <span className="font-medium">{getTimeEstimate(task.difficulty)}</span></span>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <DollarSign className="h-3.5 w-3.5 text-green-500" />
            <span>Prioritate: <span className="font-medium">{getPriorityLevel(task.recommendationScore)}</span></span>
          </div>
        </div>
        
        <div className="mt-3 flex justify-between items-center">
          <div className="flex items-center">
            <Badge variant="outline" className="text-xs bg-primary/5 border-primary/10 flex items-center gap-1">
              <Brain className="h-3 w-3" />
              <span>{getTaskDifficultyLabel(task.progress || 0)}</span>
            </Badge>
          </div>
          
          <Button 
            size="sm" 
            variant={task.assigned ? "outline" : "default"}
            disabled={isAssigning || task.assigned}
            onClick={(e) => {
              e.stopPropagation();
              onAssign(task.id);
            }}
            className="flex items-center gap-1"
          >
            {isAssigning ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>Se atribuie...</span>
              </>
            ) : task.assigned ? (
              <>
                <Check className="h-3.5 w-3.5" />
                <span>Atribuit</span>
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5" />
                <span>Atribuie</span>
              </>
            )}
          </Button>
        </div>
      </div>
      
      <TaskDetailsDialog 
        task={task}
        isOpen={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        onAssign={onAssign}
        isAssigning={isAssigning}
      />
    </>
  );
};
