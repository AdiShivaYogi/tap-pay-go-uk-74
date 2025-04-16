
import { useState } from "react";
import { extendedSupabase as supabase } from "@/integrations/supabase/extended-client";
import { useToast } from "@/hooks/use-toast";

interface UseSubmissionHandlersProps {
  submissions: any[];
  setSubmissions: (submissions: any[]) => void;
}

export const useSubmissionHandlers = ({ submissions, setSubmissions }: UseSubmissionHandlersProps) => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleApproveSubmission = async (submissionId: string) => {
    try {
      setIsProcessing(true);
      const { error } = await supabase
        .from('agent_task_submissions')
        .update({ approval_status: 'approved' })
        .eq('id', submissionId);
      
      if (error) throw error;
      
      // Update local state
      const updatedSubmissions = submissions.filter(
        (submission) => submission.id !== submissionId
      );
      setSubmissions(updatedSubmissions);
      
      toast({
        title: "Propunere aprobată",
        description: "Propunerea a fost aprobată cu succes.",
      });
      
    } catch (err) {
      console.error("Eroare la aprobarea propunerii:", err);
      toast({
        title: "Eroare",
        description: "Nu s-a putut aproba propunerea.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRejectSubmission = async (submissionId: string) => {
    try {
      setIsProcessing(true);
      const { error } = await supabase
        .from('agent_task_submissions')
        .update({ approval_status: 'rejected' })
        .eq('id', submissionId);
        
      if (error) throw error;
      
      // Update local state
      const updatedSubmissions = submissions.filter(
        (submission) => submission.id !== submissionId
      );
      setSubmissions(updatedSubmissions);
      
      toast({
        title: "Propunere respinsă",
        description: "Propunerea a fost respinsă cu succes.",
      });
      
    } catch (err) {
      console.error("Eroare la respingerea propunerii:", err);
      toast({
        title: "Eroare",
        description: "Nu s-a putut respinge propunerea.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    handleApproveSubmission,
    handleRejectSubmission,
    isProcessing
  };
};
