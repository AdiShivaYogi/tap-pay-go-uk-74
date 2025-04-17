
import { supabase } from "@/integrations/supabase/client";
import { SubmitFeedbackParams } from "../types";

export const submitFeedbackAPI = async (params: SubmitFeedbackParams): Promise<{ success: boolean }> => {
  const { itemType, itemId, feedback, userId, approve, model } = params;
  
  try {
    let endpoint = itemType === "submission" 
      ? 'roadmap-submissions' 
      : 'code-proposals';
    
    // Using this approach instead of dynamic table names to avoid type issues
    // For submissions
    if (itemType === "submission") {
      const { error } = await supabase
        .from('agent_task_submissions')
        .update({
          status: approve ? 'approved' : 'feedback',
          feedback: feedback,
          feedback_by: userId,
          updated_at: new Date().toISOString(),
          feedback_model: model || 'deepseek'
        })
        .eq('id', itemId);
        
      if (error) throw error;
    } 
    // For code proposals
    else {
      const { error } = await supabase
        .from('code_proposals')
        .update({
          status: approve ? 'approved' : 'feedback',
          feedback: feedback,
          feedback_by: userId,
          updated_at: new Date().toISOString(),
          feedback_model: model || 'deepseek'
        })
        .eq('id', itemId);
        
      if (error) throw error;
    }
    
    return { success: true };
  } catch (err) {
    console.error('Exception in submitFeedbackAPI:', err);
    throw err;
  }
};

// Aliasuri pentru compatibilitate înapoi
export const submitSubmissionFeedback = (params: Omit<SubmitFeedbackParams, 'itemType'>) => 
  submitFeedbackAPI({ ...params, itemType: "submission" });

export const submitProposalFeedback = (params: Omit<SubmitFeedbackParams, 'itemType'>) => 
  submitFeedbackAPI({ ...params, itemType: "proposal" });
