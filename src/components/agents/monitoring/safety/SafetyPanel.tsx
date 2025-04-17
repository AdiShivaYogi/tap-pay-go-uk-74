
import React from "react";
import { StyledCard, StyledCardContent } from "@/components/ui/cards";
import { SafetyInfrastructurePanel } from "./SafetyInfrastructurePanel";

export const SafetyPanel: React.FC = () => {
  return (
    <StyledCard>
      <StyledCardContent>
        <div className="mb-6">
          <h2 className="text-xl font-medium mb-2">Infrastructură de siguranță și control</h2>
          <p className="text-muted-foreground">
            Sistemul de siguranță monitorizează și controlează comportamentul agenților autonomi,
            asigurând operarea în parametri siguri și adaptarea la condiții în schimbare.
          </p>
        </div>
        
        <SafetyInfrastructurePanel />
      </StyledCardContent>
    </StyledCard>
  );
};
