
import React from "react";
import { StyledCard, StyledCardHeader, StyledCardTitle, StyledCardContent } from "@/components/ui/cards";
import { SubmissionCard } from "./SubmissionCard";

interface SubmissionsTabProps {
  submissions: any[];
  onApproveSubmission: (submissionId: string) => Promise<void>;
  onRejectSubmission: (submissionId: string) => Promise<void>;
}

export const SubmissionsTab = ({ 
  submissions,
  onApproveSubmission,
  onRejectSubmission
}: SubmissionsTabProps) => {
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
