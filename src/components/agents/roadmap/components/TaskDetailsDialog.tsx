
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Brain, Zap, Clock, DollarSign, Check, Play, Loader2, FileCode, MessageSquareText, LightbulbIcon } from "lucide-react";
import { AgentTaskExtended } from '../types/task.types';
import { 
  getTaskDifficultyLabel, 
  getDifficultyColor, 
  getTimeEstimate, 
  getPriorityLevel
} from '../utils/task-calculations';

interface TaskDetailsDialogProps {
  task: AgentTaskExtended | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAssign: (taskId: string) => void;
  isAssigning: boolean;
}

export const TaskDetailsDialog: React.FC<TaskDetailsDialogProps> = ({
  task,
  isOpen,
  onOpenChange,
  onAssign,
  isAssigning
}) => {
  if (!task) return null;
  
  // Extragerea implementării din descriere, dacă există
  const hasImplementationDetails = task.description?.includes("Implementare:");
  const descriptionParts = hasImplementationDetails ? 
    task.description.split(/Implementare:|Beneficii:/i) : 
    [task.description];
  
  const mainDescription = descriptionParts[0]?.trim();
  const benefits = descriptionParts[1]?.trim();
  const implementation = descriptionParts[2]?.trim() || descriptionParts[1]?.includes("function") ? descriptionParts[1] : "";
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">{task.title}</DialogTitle>
          <DialogDescription className="flex items-center gap-2 mt-2">
            <Badge variant={
              task.status === "completed" ? "outline" : 
              task.status === "inProgress" ? "secondary" : "default"
            }>
              {task.status === "completed" ? "Finalizat" : 
               task.status === "inProgress" ? "În progres" : "Planificat"}
            </Badge>
            {task.category && (
              <Badge variant="outline" className="bg-primary/10 border-primary/20">
                {task.category}
              </Badge>
            )}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="mb-6">
            <h4 className="text-sm font-medium mb-2">Descriere</h4>
            <p className="text-sm text-muted-foreground">{mainDescription}</p>
          </div>
          
          {benefits && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <LightbulbIcon className="h-4 w-4 text-yellow-500" />
                <h4 className="text-sm font-medium">Beneficii</h4>
              </div>
              <p className="text-sm text-muted-foreground">{benefits}</p>
            </div>
          )}
          
          {implementation && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <FileCode className="h-4 w-4 text-blue-500" />
                <h4 className="text-sm font-medium">Detalii Implementare</h4>
              </div>
              <div className="bg-muted p-3 rounded-md overflow-x-auto">
                <pre className="text-xs font-mono whitespace-pre-wrap">{implementation}</pre>
              </div>
            </div>
          )}
          
          <div className="mb-6">
            <h4 className="text-sm font-medium mb-2">Progres</h4>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-muted-foreground">Stadiu actual</span>
              <span className="text-xs font-medium">{task.progress || 0}%</span>
            </div>
            <Progress value={task.progress || 0} className="h-2" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="rounded-lg border p-3">
              <div className="flex items-center gap-2 mb-1">
                <Zap className={`h-4 w-4 ${getDifficultyColor(task.difficulty)}`} />
                <h4 className="text-sm font-medium">Dificultate</h4>
              </div>
              <p className="text-sm">{task.difficulty}</p>
            </div>
            
            <div className="rounded-lg border p-3">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="h-4 w-4 text-orange-500" />
                <h4 className="text-sm font-medium">Timp Estimat</h4>
              </div>
              <p className="text-sm">{getTimeEstimate(task.difficulty)}</p>
            </div>
            
            <div className="rounded-lg border p-3">
              <div className="flex items-center gap-2 mb-1">
                <DollarSign className="h-4 w-4 text-green-500" />
                <h4 className="text-sm font-medium">Prioritate</h4>
              </div>
              <p className="text-sm">{getPriorityLevel(task.recommendationScore)}</p>
            </div>
          </div>
          
          <div className="rounded-lg border p-3 mb-6">
            <div className="flex items-center gap-2 mb-1">
              <Brain className="h-4 w-4 text-blue-500" />
              <h4 className="text-sm font-medium">Stadiu Dezvoltare</h4>
            </div>
            <Badge variant="outline" className="bg-primary/5 border-primary/10 text-xs">
              {getTaskDifficultyLabel(task.progress || 0)}
            </Badge>
          </div>
          
          {task.notes && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-1">
                <MessageSquareText className="h-4 w-4 text-purple-500" />
                <h4 className="text-sm font-medium">Note</h4>
              </div>
              <p className="text-sm text-muted-foreground">{task.notes}</p>
            </div>
          )}
        </div>
        
        <Separator />
        
        <DialogFooter className="mt-4">
          <Button 
            variant={task.assigned ? "outline" : "default"}
            disabled={isAssigning || task.assigned}
            onClick={() => onAssign(task.id)}
            className="flex items-center gap-2"
          >
            {isAssigning ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Se atribuie...</span>
              </>
            ) : task.assigned ? (
              <>
                <Check className="h-4 w-4" />
                <span>Atribuit</span>
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                <span>Atribuie task</span>
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
