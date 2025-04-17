
import React from "react";
import { StyledCard, StyledCardHeader, StyledCardTitle, StyledCardContent } from "@/components/ui/cards";
import { Brain } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface AgentAutonomyLevelProps {
  autonomyLevel: number;
  safetyOverride: boolean;
  getAutonomyDescription: () => string;
  handleAutonomyChange: (value: number[]) => void;
}

export const AgentAutonomyLevel: React.FC<AgentAutonomyLevelProps> = ({
  autonomyLevel,
  safetyOverride,
  getAutonomyDescription,
  handleAutonomyChange
}) => {
  return (
    <StyledCard>
      <StyledCardHeader>
        <StyledCardTitle className="text-base flex items-center gap-2">
          <Brain className="h-4 w-4" />
          Nivel Autonomie Agent
        </StyledCardTitle>
      </StyledCardHeader>
      <StyledCardContent>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-sm font-medium">{autonomyLevel}%</span>
            <span className="text-sm text-muted-foreground">{safetyOverride ? "Limită maximă: 100%" : "Limită maximă: 70%"}</span>
          </div>
          
          <Slider
            value={[autonomyLevel]}
            max={100}
            step={1}
            onValueChange={handleAutonomyChange}
            className={autonomyLevel > 70 ? "accent-amber-500" : ""}
          />
          
          <p className="text-sm text-muted-foreground">{getAutonomyDescription()}</p>
          
          <div className="grid grid-cols-5 gap-1 mt-2">
            <div className="h-1.5 rounded bg-green-500"></div>
            <div className="h-1.5 rounded bg-green-400"></div>
            <div className="h-1.5 rounded bg-amber-400"></div>
            <div className="h-1.5 rounded bg-amber-500"></div>
            <div className="h-1.5 rounded bg-red-500"></div>
          </div>
        </div>
      </StyledCardContent>
    </StyledCard>
  );
};
