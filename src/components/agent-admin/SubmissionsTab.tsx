
import React from "react";
import { StyledCard, StyledCardHeader, StyledCardTitle, StyledCardContent } from "@/components/ui/cards";
import { SubmissionCard } from "./SubmissionCard";
import { Skeleton } from "@/components/ui/skeleton";

interface SubmissionsTabProps {
  submissions: any[];
  onApproveSubmission: (submissionId: string) => Promise<void>;
  onRejectSubmission: (submissionId: string) => Promise<void>;
  loading?: boolean;
}

export const SubmissionsTab = ({ 
  submissions,
  onApproveSubmission,
  onRejectSubmission,
  loading = false
}: SubmissionsTabProps) => {
  if (loading) {
    return <LoadingSubmissions />;
  }

  return (
    <StyledCard>
      <StyledCardHeader>
        <StyledCardTitle>Propuneri de la agenți în așteptarea aprobării</StyledCardTitle>
      </StyledCardHeader>
      
      <StyledCardContent>
        {submissions.length > 0 ? (
          <div className="space-y-4">
            {submissions.map((submission) => (
              <SubmissionCard
                key={submission.id}
                submission={submission}
                onApprove={onApproveSubmission}
                onReject={onRejectSubmission}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Nu există propuneri în așteptare de la agenți.
            </p>
          </div>
        )}
      </StyledCardContent>
    </StyledCard>
  );
};

const LoadingSubmissions = () => (
  <StyledCard>
    <StyledCardHeader>
      <Skeleton className="h-6 w-3/4" />
    </StyledCardHeader>
    
    <StyledCardContent>
      <div className="space-y-4">
        {[1, 2, 3].map((index) => (
          <div key={index} className="border rounded-md p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <Skeleton className="h-5 w-40 mb-2" />
                <Skeleton className="h-3 w-60" />
              </div>
              <div>
                <Skeleton className="h-5 w-20" />
              </div>
            </div>
            <div className="mb-4">
              <Skeleton className="h-2 w-full rounded-md" />
            </div>
            <div className="mb-3">
              <Skeleton className="h-4 w-32 mb-1" />
              <Skeleton className="h-16 w-full rounded-md" />
            </div>
            <div className="flex justify-end gap-3">
              <Skeleton className="h-9 w-20" />
              <Skeleton className="h-9 w-20" />
            </div>
          </div>
        ))}
      </div>
    </StyledCardContent>
  </StyledCard>
);
