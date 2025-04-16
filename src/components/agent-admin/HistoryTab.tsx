
import React from "react";
import { StyledCard, StyledCardHeader, StyledCardTitle, StyledCardContent } from "@/components/ui/cards";
import { HistoryItem } from "./HistoryItem";
import { Skeleton } from "@/components/ui/skeleton";

interface HistoryTabProps {
  progressHistory: any[];
  loading?: boolean;
}

export const HistoryTab = ({ progressHistory, loading = false }: HistoryTabProps) => {
  if (loading) {
    return <LoadingHistory />;
  }

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

const LoadingHistory = () => (
  <StyledCard>
    <StyledCardHeader>
      <Skeleton className="h-6 w-1/2" />
    </StyledCardHeader>
    
    <StyledCardContent>
      <div className="space-y-3">
        {[1, 2, 3, 4].map((index) => (
          <div key={index} className="border rounded-md p-3">
            <div className="flex justify-between items-start">
              <div>
                <Skeleton className="h-5 w-36 mb-1" />
                <Skeleton className="h-3 w-48" />
              </div>
              <Skeleton className="h-5 w-16" />
            </div>
            <Skeleton className="h-px w-full my-2" />
            <div className="flex justify-between items-center">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        ))}
      </div>
    </StyledCardContent>
  </StyledCard>
);
