
import { useState } from "react";
import { extendedSupabase as supabase } from "@/integrations/supabase/extended-client";
import { useToast } from "@/hooks/use-toast";

interface UseCodeProposalHandlersProps {
  proposals: any[];
  setProposals: (proposals: any[]) => void;
}

export const useCodeProposalHandlers = ({ proposals, setProposals }: UseCodeProposalHandlersProps) => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleApproveProposal = async (proposalId: string) => {
    try {
      setIsProcessing(true);
      const currentDate = new Date().toISOString();
      
      const { error } = await supabase
        .from('code_proposals')
        .update({
          status: 'approved',
          approved_at: currentDate
        })
        .eq('id', proposalId);
      
      if (error) throw error;
      
      // Update local state
      const updatedProposals = proposals.filter(
        (proposal) => proposal.id !== proposalId
      );
      setProposals(updatedProposals);
      
      toast({
        title: "Propunere de cod aprobată",
        description: "Propunerea de cod a fost aprobată cu succes.",
      });
      
    } catch (err) {
      console.error("Eroare la aprobarea propunerii de cod:", err);
      toast({
        title: "Eroare",
        description: "Nu s-a putut aproba propunerea de cod.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRejectProposal = async (proposalId: string, reason?: string) => {
    try {
      setIsProcessing(true);
      const { error } = await supabase
        .from('code_proposals')
        .update({
          status: 'rejected',
          rejection_reason: reason || 'Propunere respinsă fără motiv specificat'
        })
        .eq('id', proposalId);
        
      if (error) throw error;
      
      // Update local state
      const updatedProposals = proposals.filter(
        (proposal) => proposal.id !== proposalId
      );
      setProposals(updatedProposals);
      
      toast({
        title: "Propunere de cod respinsă",
        description: "Propunerea de cod a fost respinsă cu succes.",
      });
      
    } catch (err) {
      console.error("Eroare la respingerea propunerii de cod:", err);
      toast({
        title: "Eroare",
        description: "Nu s-a putut respinge propunerea de cod.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    handleApproveProposal,
    handleRejectProposal,
    isProcessing
  };
};
