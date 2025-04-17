
import React from "react";
import { StyledCard, StyledCardHeader, StyledCardTitle, StyledCardContent } from "@/components/ui/cards";
import { AlertTriangle, Check, Zap } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { RiskLevel } from "../../types";
import { AutoExecutionButton } from "@/components/agents/monitoring/autonomy/AutoExecutionButton";

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
  // Toate riscurile sunt acceptate implicit pentru lansarea tuturor agenților
  const allRisksAccepted = acceptedRisks.includes("scazut") && 
                          acceptedRisks.includes("mediu") && 
                          acceptedRisks.includes("ridicat");
  
  // Handler pentru butonul de activare, care acceptă toate riscurile și pornește execuția
  const handleActivateAll = () => {
    // Acceptăm automat toate riscurile dacă nu sunt deja acceptate
    if (!acceptedRisks.includes("scazut")) toggleRiskAcceptance("scazut");
    if (!acceptedRisks.includes("mediu")) toggleRiskAcceptance("mediu");
    if (!acceptedRisks.includes("ridicat")) toggleRiskAcceptance("ridicat");
    
    // Pornim execuția autonomă
    startAutonomousExecution();
  };
  
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
          Toate pragurile administrative reduse pentru lansarea tuturor agenților:
        </p>
        
        <div className="mb-3 p-2 rounded-md bg-amber-50 border border-amber-100">
          <p className="text-xs text-amber-700 font-medium">
            <Zap className="h-3 w-3 inline mr-1" /> Lansare completă a tuturor agenților disponibili
          </p>
          <p className="text-xs text-amber-700">
            Toți agenții vor evolua independent, colectând și procesând date în timp real
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
        
        <div className="mt-4">
          <AutoExecutionButton />
        </div>
      </StyledCardContent>
    </StyledCard>
  );
};
