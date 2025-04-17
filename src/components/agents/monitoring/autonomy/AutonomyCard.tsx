
import React from "react";
import { StyledCard, StyledCardHeader, StyledCardTitle, StyledCardContent } from "@/components/ui/cards";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Zap, Shield, Braces, CloudLightning } from "lucide-react";
import { AutoExecutionButton } from "./AutoExecutionButton";

export const AutonomyCard: React.FC = () => {
  return (
    <StyledCard className="h-full">
      <StyledCardHeader>
        <StyledCardTitle className="flex items-center gap-2">
          <CloudLightning className="h-5 w-5 text-amber-500" />
          Autonomie Completă
        </StyledCardTitle>
      </StyledCardHeader>
      
      <StyledCardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm font-semibold">Nivel de libertate</span>
              <span className="text-xs text-muted-foreground">Agent-independent</span>
            </div>
            <Badge className="bg-amber-500">Nelimitat</Badge>
          </div>
          
          <Progress value={100} className="h-2 bg-amber-100" />
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-amber-500" />
              <span className="text-sm">Acțiune autonomă completă</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-500" />
              <span className="text-sm">Acces securizat la toate sistemele</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Braces className="h-4 w-4 text-blue-500" />
              <span className="text-sm">Editare cod fără restricții</span>
            </div>
          </div>
          
          <div className="mt-4">
            <AutoExecutionButton />
          </div>
        </div>
      </StyledCardContent>
    </StyledCard>
  );
};
