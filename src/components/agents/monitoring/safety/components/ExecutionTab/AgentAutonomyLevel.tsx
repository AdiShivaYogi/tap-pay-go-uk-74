
import React from "react";
import { StyledCard, StyledCardHeader, StyledCardTitle, StyledCardContent } from "@/components/ui/cards";
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
  const getColor = () => {
    if (autonomyLevel < 33) return "bg-emerald-100";
    if (autonomyLevel < 66) return "bg-amber-100";
    return "bg-red-100";
  };

  return (
    <StyledCard className={autonomyLevel > 70 ? "border-amber-300" : ""}>
      <StyledCardHeader>
        <StyledCardTitle className="text-base">Nivel de Autonomie</StyledCardTitle>
      </StyledCardHeader>
      <StyledCardContent>
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm font-medium">
              Nivel: {autonomyLevel}%
            </div>
            <div className={`text-xs px-2 py-0.5 rounded-full ${getColor()}`}>
              {autonomyLevel < 33 ? "Scăzut" : autonomyLevel < 66 ? "Mediu" : "Ridicat"}
            </div>
          </div>

          <Slider
            value={[autonomyLevel]}
            max={100}
            step={5}
            onValueChange={handleAutonomyChange}
            disabled={!safetyOverride && autonomyLevel > 70}
            className={`mt-2 ${autonomyLevel > 70 ? "accent-amber-500" : ""}`}
          />

          <div className="mt-4 text-sm text-muted-foreground">
            <span className="font-medium">Mod operațional:</span> {getAutonomyDescription()}
          </div>
          
          <div className={`mt-2 text-xs p-2 rounded ${autonomyLevel > 70 ? "bg-amber-50 border-amber-200 border" : "bg-slate-50 border"}`}>
            {autonomyLevel > 70 ? (
              <span>
                La acest nivel de autonomie, agenții vor colecta date în mod activ în timpul execuției și vor evolua 
                în timp real, permițând auto-dezvoltarea și evoluția.
              </span>
            ) : (
              <span>
                Nivelul de autonomie coordonează gradul de libertate și independență în acțiunile agenților. 
                La niveluri ridicate (peste 70%), agenții pot opera independent și pot evolua fără intervenție umană.
              </span>
            )}
          </div>
        </div>
      </StyledCardContent>
    </StyledCard>
  );
};
