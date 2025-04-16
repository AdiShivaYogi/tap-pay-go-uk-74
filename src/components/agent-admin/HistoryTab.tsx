
import React from "react";
import { StyledCard, StyledCardHeader, StyledCardTitle, StyledCardContent } from "@/components/ui/cards";
import { HistoryItem } from "./HistoryItem";

interface HistoryTabProps {
  progressHistory: any[];
}

export const HistoryTab = ({ progressHistory }: HistoryTabProps) => {
  return (
    <StyledCard>
      <StyledCardHeader>
        <StyledCardTitle>Istoric activitate agenți</StyledCardTitle>
      </StyledCardHeader>
      
      <StyledCardContent>
        {progressHistory.length > 0 ? (
          <div className="space-y-3">
            {progressHistory.map((progress) => (
              <HistoryItem key={progress.id} progress={progress} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Nu există activitate înregistrată de la agenți.
            </p>
          </div>
        )}
      </StyledCardContent>
    </StyledCard>
  );
};
