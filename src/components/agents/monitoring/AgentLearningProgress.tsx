
import React, { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { useAgentMonitoring } from "./hooks";
import { BrainCircuit, Clock, AlertTriangle, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDistance } from "date-fns";
import { ro } from "date-fns/locale";
import { StyledCard, StyledCardContent, StyledCardHeader, StyledCardTitle } from "@/components/ui/cards";

export const AgentLearningProgress: React.FC = () => {
  const { learningProgress } = useAgentMonitoring();
  const [now, setNow] = useState(new Date());
  
  // Actualizăm timpul curent la fiecare secundă pentru a avea estimări precise
  useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);
  
  // Filtrăm progresul activ - modificat pentru array în loc de Map
  const activeProgress = learningProgress.filter(p => p.status === 'in-progress');
  
  if (activeProgress.length === 0) {
    return null;
  }
  
  return (
    <StyledCard className="mb-4 bg-amber-50/30 border-amber-200">
      <StyledCardHeader className="pb-3">
        <StyledCardTitle className="text-lg flex items-center gap-2">
          <Zap className="h-5 w-5 text-amber-500" />
          Procese de Auto-Îmbunătățire în Curs
        </StyledCardTitle>
      </StyledCardHeader>
      <StyledCardContent className="space-y-4">
        {activeProgress.map((progress) => {
          const timeRemaining = progress.estimatedEndTime.getTime() - now.getTime();
          const timeOverdue = now.getTime() - progress.estimatedEndTime.getTime();
          const isOverdue = timeRemaining <= 0;
          
          const timeRemainingText = isOverdue 
            ? formatDistance(now, progress.estimatedEndTime, { locale: ro }) + " peste timp estimat"
            : formatDistance(now, progress.estimatedEndTime, { locale: ro }) + " rămas";
            
          return (
            <div key={progress.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">
                    {progress.sourceAgentId} → {progress.targetAgentId}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {progress.learningType} <span className="opacity-70">•</span> Impact Autonomie: <span className={progress.progress > 70 ? "text-green-600" : "text-amber-600"}>+{Math.round(progress.progress / 5)}%</span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={isOverdue ? "destructive" : "outline"}
                    className="flex items-center gap-1"
                  >
                    {isOverdue ? <AlertTriangle className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                    {timeRemainingText}
                  </Badge>
                  <Badge variant="default" className="bg-amber-500">{progress.progress}%</Badge>
                </div>
              </div>
              <Progress 
                value={progress.progress} 
                className={`h-2 ${isOverdue ? 'bg-destructive/20' : ''}`}
              />
            </div>
          )
        })}
      </StyledCardContent>
    </StyledCard>
  );
};
