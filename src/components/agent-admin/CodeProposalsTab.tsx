
import React, { useState } from "react";
import { StyledCard, StyledCardHeader, StyledCardTitle, StyledCardContent } from "@/components/ui/cards";
import { Code } from "lucide-react";
import { ProposalsList } from "./code-proposals/ProposalsList";
import { ProposalDetails } from "./code-proposals/ProposalDetails";

interface CodeProposalsTabProps {
  proposals: any[];
  onApproveProposal: (proposalId: string) => Promise<void>;
  onRejectProposal: (proposalId: string, reason?: string) => Promise<void>;
}

export const CodeProposalsTab = ({ 
  proposals, 
  onApproveProposal, 
  onRejectProposal 
}: CodeProposalsTabProps) => {
  const [selectedProposal, setSelectedProposal] = useState<any>(null);
  const [rejectionReason, setRejectionReason] = useState<string>('');

  const handleReject = async (id: string, reason?: string) => {
    await onRejectProposal(id, reason);
    setRejectionReason('');
  };
  
  return (
    <StyledCard>
      <StyledCardHeader>
        <StyledCardTitle className="flex items-center gap-2">
          <Code className="h-5 w-5" />
          Propuneri de cod de la agenți
        </StyledCardTitle>
      </StyledCardHeader>
      
      <StyledCardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-1 border-r pr-4">
            <h3 className="text-sm font-medium mb-2">Propuneri în așteptare</h3>
            <ProposalsList 
              proposals={proposals}
              selectedProposalId={selectedProposal?.id}
              onSelectProposal={setSelectedProposal}
            />
          </div>
          
          <div className="lg:col-span-2">
            <ProposalDetails
              proposal={selectedProposal}
              rejectionReason={rejectionReason}
              setRejectionReason={setRejectionReason}
              onApprove={onApproveProposal}
              onReject={handleReject}
            />
          </div>
        </div>
      </StyledCardContent>
    </StyledCard>
  );
};
