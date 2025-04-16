
import React from "react";
import { Badge } from "@/components/ui/badge";
import { CodeViewer } from "./CodeViewer";
import { ActionButtons } from "./proposal-components/ActionButtons";
import { ProposalHeader } from "./proposal-components/ProposalHeader";
import { ProposalMotivation } from "./proposal-components/ProposalMotivation";
import { ProposalFiles } from "./proposal-components/ProposalFiles";
import { EmptyState } from "./proposal-components/EmptyState";
import { LoadingProposalDetails } from "./proposal-components/LoadingState";

interface ProposalDetailsProps {
  proposal: any;
  rejectionReason: string;
  setRejectionReason: (reason: string) => void;
  onApprove: (id: string) => Promise<void>;
  onReject: (id: string, reason?: string) => Promise<void>;
  onGenerateFeedback?: () => void;
  isSubmitting?: boolean;
  loading?: boolean;
}

export const ProposalDetails = ({ 
  proposal,
  rejectionReason,
  setRejectionReason,
  onApprove,
  onReject,
  onGenerateFeedback,
  isSubmitting = false,
  loading = false
}: ProposalDetailsProps) => {
  if (loading) {
    return <LoadingProposalDetails />;
  }
  
  if (!proposal) {
    return <EmptyState />;
  }
  
  const proposedFiles = JSON.parse(proposal.proposed_files);
  const proposedCode = JSON.parse(proposal.proposed_code);
  
  return (
    <div className="space-y-4">
      <ProposalHeader proposal={proposal} />
      
      <ProposalMotivation motivation={proposal.motivation} />
      
      <ProposalFiles files={proposedFiles} />
      
      <div>
        <h4 className="text-sm font-medium mb-2">Cod propus:</h4>
        <div className="border rounded-md overflow-hidden">
          <CodeViewer proposedFiles={proposedFiles} proposedCode={proposedCode} />
        </div>
      </div>
      
      <hr className="my-4 border-gray-200" />
      
      <ActionButtons 
        proposalId={proposal.id}
        rejectionReason={rejectionReason}
        setRejectionReason={setRejectionReason}
        onApprove={onApprove}
        onReject={onReject}
        onGenerateFeedback={onGenerateFeedback}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};
