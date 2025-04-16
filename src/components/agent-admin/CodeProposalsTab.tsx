
import React, { useState } from "react";
import { StyledCard, StyledCardHeader, StyledCardTitle, StyledCardContent } from "@/components/ui/cards";
import { Code, AlertTriangle } from "lucide-react";
import { ProposalsList } from "./code-proposals/ProposalsList";
import { ProposalDetails } from "./code-proposals/ProposalDetails";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

interface CodeProposalsTabProps {
  proposals: any[];
  onApproveProposal: (proposalId: string) => Promise<void>;
  onRejectProposal: (proposalId: string, reason?: string) => Promise<void>;
  loading?: boolean;
}

export const CodeProposalsTab = ({ 
  proposals = [], 
  onApproveProposal, 
  onRejectProposal,
  loading = false
}: CodeProposalsTabProps) => {
  const [selectedProposal, setSelectedProposal] = useState<any>(null);
  const [rejectionReason, setRejectionReason] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleApprove = async (id: string) => {
    try {
      setIsSubmitting(true);
      setError(null);
      await onApproveProposal(id);
      // Deselectează propunerea după aprobare
      setSelectedProposal(null);
    } catch (err) {
      setError("A apărut o eroare la aprobarea propunerii de cod.");
      console.error("Eroare la aprobarea propunerii:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReject = async (id: string, reason?: string) => {
    try {
      setIsSubmitting(true);
      setError(null);
      await onRejectProposal(id, reason);
      setRejectionReason('');
      // Deselectează propunerea după respingere
      setSelectedProposal(null);
    } catch (err) {
      setError("A apărut o eroare la respingerea propunerii de cod.");
      console.error("Eroare la respingerea propunerii:", err);
    } finally {
      setIsSubmitting(false);
    }
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
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-1 border-r pr-4">
            <h3 className="text-sm font-medium mb-2">Propuneri în așteptare</h3>
            
            {loading ? (
              <LoadingProposalsList />
            ) : (
              <ProposalsList 
                proposals={proposals}
                selectedProposalId={selectedProposal?.id}
                onSelectProposal={setSelectedProposal}
              />
            )}
          </div>
          
          <div className="lg:col-span-2">
            <ProposalDetails
              proposal={selectedProposal}
              rejectionReason={rejectionReason}
              setRejectionReason={setRejectionReason}
              onApprove={handleApprove}
              onReject={handleReject}
              isSubmitting={isSubmitting}
              loading={loading}
            />
          </div>
        </div>
      </StyledCardContent>
    </StyledCard>
  );
};

const LoadingProposalsList = () => (
  <div className="space-y-2 pr-2">
    {[1, 2, 3].map((index) => (
      <div key={index} className="p-3 border rounded-md">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-5 w-16" />
        </div>
        <div className="mt-1">
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    ))}
  </div>
);
