
import { extendedSupabase as supabase } from "@/integrations/supabase/extended-client";

export const submitSubmissionFeedback = async (
  submissionId: string,
  feedback: string,
  isGodModeEnabled: boolean,
  userId: string | undefined
): Promise<void> => {
  const { error: feedbackError } = await supabase
    .from('agent_feedback')
    .insert({
      submission_id: submissionId,
      feedback: feedback,
      is_approved: isGodModeEnabled,
      is_god_mode: isGodModeEnabled
    });
    
  if (feedbackError) throw feedbackError;
  
  if (isGodModeEnabled) {
    await approveSubmission(submissionId, feedback);
  }
};

const approveSubmission = async (submissionId: string, feedback: string): Promise<void> => {
  const { error: approveError } = await supabase
    .from('agent_task_submissions')
    .update({ 
      approval_status: 'approved',
      notes: `Aprobat automat în God Mode cu feedback: ${feedback.substring(0, 100)}...`
    })
    .eq('id', submissionId);
      
  if (approveError) throw approveError;
};

export const submitProposalFeedback = async (
  proposalId: string,
  feedback: string,
  isGodModeEnabled: boolean,
  userId: string | undefined
): Promise<void> => {
  const { error: feedbackError } = await supabase
    .from('code_proposal_feedback')
    .insert({
      proposal_id: proposalId,
      feedback: feedback,
      is_approved: isGodModeEnabled,
      is_god_mode: isGodModeEnabled
    });
    
  if (feedbackError) throw feedbackError;
  
  if (isGodModeEnabled) {
    await approveProposal(proposalId, userId);
  }
};

const approveProposal = async (proposalId: string, userId: string | undefined): Promise<void> => {
  const currentDate = new Date().toISOString();
    
  const { error: approveError } = await supabase
    .from('code_proposals')
    .update({ 
      status: 'approved',
      approved_at: currentDate,
      approved_by: userId
    })
    .eq('id', proposalId);
      
  if (approveError) throw approveError;
};
