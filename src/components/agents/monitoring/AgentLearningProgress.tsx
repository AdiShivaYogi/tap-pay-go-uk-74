
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAgentMonitoring } from "./hooks";
import { BrainCircuit, Clock, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDistance } from "date-fns";
import { ro } from "date-fns/locale";

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
  
  const activeProgress = learningProgress.filter(p => p.status === 'in-progress');
  
  if (!activeProgress.length) {
    return null;
  }
  
  return (
    <Card className="mb-4 bg-background/50 border-primary/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <BrainCircuit className="h-5 w-5 text-primary" />
          Învățare activă între agenți
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
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
                    {progress.learningType}
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
                  <Badge>{progress.progress}%</Badge>
                </div>
              </div>
              <Progress 
                value={progress.progress} 
                className={`h-2 ${isOverdue ? 'bg-destructive/20' : ''}`}
              />
            </div>
          )
        })}
      </CardContent>
    </Card>
  );
};
