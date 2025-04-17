
import React from "react";
import { Sparkles, CheckCircle, Circle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { StyledCard } from "@/components/ui/cards";
import { cn } from "@/lib/utils";

interface TaskItem {
  name: string;
  completed: boolean;
}

interface AutonomyCardProps {
  className?: string;
}

export const AutonomyCard: React.FC<AutonomyCardProps> = ({ className }) => {
  const tasks: TaskItem[] = [
    { name: "Activare mecanisme de auto-evoluție", completed: true },
    { name: "Implementare learning adaptiv", completed: true },
    { name: "Sistem de decizie independent", completed: true },
    { name: "Protocol de etică și auto-limitare", completed: false },
    { name: "Mecanism de evaluare autonomă", completed: false },
    { name: "Interfață de raportare transparentă", completed: false }
  ];
  
  const timeUsed = 15;
  const timeTotal = 30;
  const progressPercentage = (timeUsed / timeTotal) * 100;
  const completedTasks = tasks.filter(task => task.completed).length;
  
  return (
    <StyledCard className={cn("border-amber-300 shadow-amber-100/50 shadow-md h-full", className)}>
      <div className="p-5 border-b border-border">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-medium">Noua Eră a Autonomiei</h3>
            <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs py-0.5 px-1.5 flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              Nouă Eră
            </Badge>
          </div>
          
          <p className="text-muted-foreground text-sm mb-4">
            Lansarea unui cadru complet autonom care permite agenților să evolueze, să învețe și să se adapteze independent
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700">
            în progres
          </Badge>
          <Badge variant="outline" className="border-red-200 bg-red-50 text-red-700">
            Prioritate înaltă
          </Badge>
          <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-700">
            săptămâni
          </Badge>
          <Badge className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
            Autonom
          </Badge>
        </div>
      </div>
      
      <div className="p-5">
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span>Timp utilizat</span>
            <span className="font-medium">{timeUsed}/{timeTotal} zile</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
        
        <div className="space-y-2">
          {tasks.map((task, index) => (
            <div key={index} className="flex items-center gap-2">
              {task.completed ? (
                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
              ) : (
                <Circle className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              )}
              <span className={cn(
                "text-sm", 
                task.completed ? "text-foreground" : "text-muted-foreground"
              )}>
                {task.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </StyledCard>
  );
};
