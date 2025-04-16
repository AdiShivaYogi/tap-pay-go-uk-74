
import React from "react";
import { Brain } from "lucide-react";

interface EmptyStateProps {
  isGodModeEnabled: boolean;
}

export const EmptyState = ({ isGodModeEnabled }: EmptyStateProps) => {
  return (
    <div className="mt-4 p-4 border rounded-md text-center">
      <Brain className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
      <p>Selectează o propunere pentru a genera feedback și evaluare.</p>
      <p className="text-xs text-muted-foreground mt-1">
        {isGodModeEnabled 
          ? "În God Mode, propunerile vor fi aprobate automat odată cu trimiterea feedbackului." 
          : "Agentul va primi feedback pentru îmbunătățire, dar aprobarea va fi manuală."}
      </p>
    </div>
  );
};
