
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

interface UseProposalHandlersProps {
  onApproveProposal: (proposalId: string) => Promise<void>;
  onRejectProposal: (proposalId: string, reason?: string) => Promise<void>;
  onGenerateFeedback?: (type: "proposal", item: any) => Promise<void>;
}

export const useProposalHandlers = ({
  onApproveProposal,
  onRejectProposal,
  onGenerateFeedback
}: UseProposalHandlersProps) => {
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

  const handleGenerateFeedback = () => {
    if (selectedProposal && onGenerateFeedback) {
      onGenerateFeedback("proposal", selectedProposal);
      // Nu deselectăm propunerea, deoarece folosim feedback-ul pentru ea
    }
  };

  return {
    selectedProposal,
    setSelectedProposal,
    rejectionReason,
    setRejectionReason,
    error,
    isSubmitting,
    handleApprove,
    handleReject,
    handleGenerateFeedback
  };
};
