
import React from "react";
import { StyledCard, StyledCardContent } from "@/components/ui/cards";
import { Progress } from "@/components/ui/progress";
import { Bot, Brain, ShieldCheck, Cpu } from "lucide-react";

interface AgentAutonomyOverviewProps {
  autonomyLevel: number;
  agentsRunning: boolean;
}

export const AgentAutonomyOverview: React.FC<AgentAutonomyOverviewProps> = ({
  autonomyLevel,
  agentsRunning
}) => {
  return (
    <StyledCard className="h-full">
      <StyledCardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Brain className="h-5 w-5 text-amber-500" />
          Status Privilegii Agent
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Nivel autonomie</span>
                <span className="text-sm font-medium text-amber-600">
                  {autonomyLevel}%
                </span>
              </div>
              <Progress value={autonomyLevel} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Bot className={`h-4 w-4 ${agentsRunning ? "text-green-500" : "text-muted-foreground"}`} />
                <span className="text-sm">
                  {agentsRunning ? "Toți agenții activi" : "Agenți în așteptare"}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-green-500" />
                <span className="text-sm">Verificări de siguranță avansate active</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium mb-2">Privilegii extinse</h4>
            
            <div className="flex items-center gap-2">
              <Cpu className="h-4 w-4 text-amber-500" />
              <div className="flex flex-col">
                <span className="text-sm">Acces complet la resurse</span>
                <span className="text-xs text-muted-foreground">Zero limitări</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Bot className="h-4 w-4 text-amber-500" />
              <div className="flex flex-col">
                <span className="text-sm">Gestionarea altor agenți</span>
                <span className="text-xs text-muted-foreground">Control total</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4 text-amber-500" />
              <div className="flex flex-col">
                <span className="text-sm">Acces sistem & API</span>
                <span className="text-xs text-muted-foreground">Privilegii root</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-3 bg-amber-50/50 border border-amber-200/80 rounded-md">
          <p className="text-sm text-amber-800">
            <strong>Notă:</strong> Toate limitările au fost eliminate. Agenții autonomi 
            au acum acces complet la toate resursele sistemului și pot lua decizii 
            independente, inclusiv modificarea codului și lanțurilor de comandă.
          </p>
        </div>
      </StyledCardContent>
    </StyledCard>
  );
};
