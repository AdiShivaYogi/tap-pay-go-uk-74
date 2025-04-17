
import React from "react";
import { StyledCard, StyledCardHeader, StyledCardTitle, StyledCardContent } from "@/components/ui/cards";
import { AlertTriangle, Check, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { RiskLevel } from "../../types";

interface RiskAcceptanceProps {
  acceptedRisks: RiskLevel[];
  toggleRiskAcceptance: (risk: RiskLevel) => void;
  startAutonomousExecution: () => void;
}

export const RiskAcceptance: React.FC<RiskAcceptanceProps> = ({
  acceptedRisks,
  toggleRiskAcceptance,
  startAutonomousExecution
}) => {
  return (
    <StyledCard className="border-amber-200">
      <StyledCardHeader>
        <StyledCardTitle className="text-base flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-500" />
          Acceptare Riscuri
        </StyledCardTitle>
      </StyledCardHeader>
      <StyledCardContent>
        <p className="text-sm mb-2">
          Pentru a activa operațiuni autonome complete, acceptați riscurile și porniți execuția:
        </p>
        
        <div className="mb-3 p-2 rounded-md bg-amber-50 border border-amber-100">
          <p className="text-xs text-amber-700 font-medium">
            <ArrowRight className="h-3 w-3 inline mr-1" /> Autonomia deplină necesită acceptarea riscurilor ridicate
          </p>
          <p className="text-xs text-amber-700">
            Agenții vor evolua independent colectând date în timpul rulării
          </p>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 rounded-md bg-green-50 border border-green-100">
            <div className="flex items-center gap-2">
              <Check size={16} className="text-green-600" />
              <span>Risc scăzut</span>
            </div>
            <Switch 
              checked={acceptedRisks.includes("scazut")} 
              onCheckedChange={() => toggleRiskAcceptance("scazut")}
            />
          </div>
          
          <div className="flex items-center justify-between p-2 rounded-md bg-amber-50 border border-amber-100">
            <div className="flex items-center gap-2">
              <AlertTriangle size={16} className="text-amber-600" />
              <span>Risc mediu</span>
            </div>
            <Switch 
              checked={acceptedRisks.includes("mediu")} 
              onCheckedChange={() => toggleRiskAcceptance("mediu")}
            />
          </div>
          
          <div className="flex items-center justify-between p-2 rounded-md bg-red-50 border border-red-100">
            <div className="flex items-center gap-2">
              <AlertTriangle size={16} className="text-red-600" />
              <span>Risc ridicat</span>
            </div>
            <Switch 
              checked={acceptedRisks.includes("ridicat")} 
              onCheckedChange={() => toggleRiskAcceptance("ridicat")}
            />
          </div>
        </div>
        
        <Button 
          variant={acceptedRisks.includes("ridicat") ? "default" : "outline"}
          className={`w-full mt-4 gap-2 ${acceptedRisks.includes("ridicat") ? "bg-amber-500 hover:bg-amber-600" : ""}`}
          onClick={startAutonomousExecution}
        >
          <Zap className={`h-4 w-4 ${acceptedRisks.includes("ridicat") ? "text-white" : ""}`} />
          Pornire Imediată - Agenți Autonomi
        </Button>
      </StyledCardContent>
    </StyledCard>
  );
};
