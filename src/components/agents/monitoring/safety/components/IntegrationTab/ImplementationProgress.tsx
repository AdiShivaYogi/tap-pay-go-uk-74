
import React from "react";
import { StyledCard, StyledCardHeader, StyledCardTitle, StyledCardContent } from "@/components/ui/cards";
import { Activity } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { ImplementationProgress as ProgressType } from "../../types";

interface ImplementationProgressProps {
  implementationProgress: Record<string, number>;
}

export const ImplementationProgress: React.FC<ImplementationProgressProps> = ({
  implementationProgress
}) => {
  const progressItems: ProgressType[] = [
    { name: "Conectare Surse de Date Reale", progress: implementationProgress.dataSources },
    { name: "Algoritm Evaluare Riscuri", progress: implementationProgress.riskEvaluation },
    { name: "Monitorizare în Timp Real", progress: implementationProgress.monitoring },
    { name: "Jurnalizare Completă", progress: implementationProgress.logging },
    { name: "Mecanism Adaptiv de Siguranță", progress: implementationProgress.adaptiveSafety }
  ];
  
  return (
    <StyledCard>
      <StyledCardHeader>
        <StyledCardTitle className="text-base flex items-center gap-2">
          <Activity className="h-4 w-4" />
          Progres Implementare
        </StyledCardTitle>
      </StyledCardHeader>
      <StyledCardContent>
        <div className="space-y-4">
          {progressItems.map((item, index) => (
            <div key={index}>
              <div className="flex justify-between text-sm mb-1">
                <span>{item.name}</span>
                <span>{item.progress}%</span>
              </div>
              <Progress value={item.progress} className="h-2" />
            </div>
          ))}
        </div>
      </StyledCardContent>
    </StyledCard>
  );
};
