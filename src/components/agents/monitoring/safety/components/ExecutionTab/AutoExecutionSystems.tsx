
import React from "react";
import { StyledCard, StyledCardHeader, StyledCardTitle, StyledCardContent } from "@/components/ui/cards";
import { Activity, PauseCircle, PlayCircle, StopCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AutoExecSystem } from "../../types";

export const AutoExecutionSystems: React.FC = () => {
  const autoExecSystems: AutoExecSystem[] = [
    { id: "planning", name: "Planificare Autonomă", status: "activ", healthScore: 94 },
    { id: "execution", name: "Execuție Sarcini", status: "activ", healthScore: 88 },
    { id: "monitoring", name: "Monitorizare", status: "activ", healthScore: 97 },
    { id: "selfImprovement", name: "Auto-Îmbunătățire", status: "inactiv", healthScore: 52 },
    { id: "resources", name: "Gestionare Resurse", status: "activ", healthScore: 86 }
  ];

  return (
    <StyledCard>
      <StyledCardHeader>
        <StyledCardTitle className="text-base flex items-center gap-2">
          <Activity className="h-4 w-4" />
          Stare Sisteme Auto-Execuție
        </StyledCardTitle>
      </StyledCardHeader>
      <StyledCardContent>
        <div className="space-y-4">
          {autoExecSystems.map(system => (
            <div key={system.id} className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    system.status === "activ" ? "bg-green-500" : "bg-gray-400"
                  }`}></div>
                  <span>{system.name}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  Sănătate: {system.healthScore}%
                </span>
                <Progress 
                  value={system.healthScore} 
                  className="w-16 h-2" 
                />
              </div>
            </div>
          ))}
          
          <div className="flex justify-between mt-4">
            <Button variant="outline" size="sm" className="gap-1">
              <PauseCircle className="h-3.5 w-3.5" />
              <span>Pauză</span>
            </Button>
            
            <Button variant="outline" size="sm" className="gap-1">
              <StopCircle className="h-3.5 w-3.5" />
              <span>Stop</span>
            </Button>
            
            <Button variant="default" size="sm" className="gap-1 bg-amber-500 hover:bg-amber-600">
              <PlayCircle className="h-3.5 w-3.5" />
              <span>Start</span>
            </Button>
          </div>
        </div>
      </StyledCardContent>
    </StyledCard>
  );
};
