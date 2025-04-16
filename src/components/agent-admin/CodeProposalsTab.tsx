
import React from "react";
import { StyledCard, StyledCardHeader, StyledCardTitle, StyledCardContent } from "@/components/ui/cards";
import { Code } from "lucide-react";
import { ProposalsList } from "./code-proposals/ProposalsList";
import { ProposalDetails } from "./code-proposals/ProposalDetails";
import { LoadingProposalsList } from "./code-proposals/components/LoadingProposalsList";
import { ErrorAlert } from "./code-proposals/components/ErrorAlert";
import { ProposalsLayout } from "./code-proposals/components/ProposalsLayout";
import { useProposalHandlers } from "./code-proposals/hooks/useProposalHandlers";

interface CodeProposalsTabProps {
  proposals: any[];
  onApproveProposal: (proposalId: string) => Promise<void>;
  onRejectProposal: (proposalId: string, reason?: string) => Promise<void>;
  loading?: boolean;
  onGenerateFeedback?: (type: "proposal", item: any) => Promise<void>;
}

export const CodeProposalsTab = ({ 
  proposals = [], 
  onApproveProposal, 
  onRejectProposal,
  onGenerateFeedback,
  loading = false
}: CodeProposalsTabProps) => {
  const {
    selectedProposal,
    setSelectedProposal,
    rejectionReason,
    setRejectionReason,
    error,
    isSubmitting,
    handleApprove,
    handleReject,
    handleGenerateFeedback
  } = useProposalHandlers({
    onApproveProposal,
    onRejectProposal,
    onGenerateFeedback
  });
  
  const renderProposalsList = () => {
    if (loading) {
      return <LoadingProposalsList />;
    }
    
    return (
      <ProposalsList 
        proposals={proposals}
        selectedProposalId={selectedProposal?.id}
        onSelectProposal={setSelectedProposal}
      />
    );
  };
  
  const renderProposalDetails = () => (
    <ProposalDetails
      proposal={selectedProposal}
      rejectionReason={rejectionReason}
      setRejectionReason={setRejectionReason}
      onApprove={handleApprove}
      onReject={handleReject}
      onGenerateFeedback={onGenerateFeedback ? handleGenerateFeedback : undefined}
      isSubmitting={isSubmitting}
      loading={loading}
    />
  );
  
  return (
    <StyledCard>
      <StyledCardHeader>
        <StyledCardTitle className="flex items-center gap-2">
          <Code className="h-5 w-5" />
          Propuneri de cod de la agenți
        </StyledCardTitle>
      </StyledCardHeader>
      
      <StyledCardContent>
        <ErrorAlert message={error} />
        
        <ProposalsLayout 
          sidebar={renderProposalsList()}
          content={renderProposalDetails()}
        />
      </StyledCardContent>
    </StyledCard>
  );
};
