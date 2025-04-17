
import { supabase } from "@/integrations/supabase/client";
import { SubmitFeedbackParams } from "../types";

export const submitFeedbackAPI = async (params: SubmitFeedbackParams): Promise<{ success: boolean }> => {
  const { itemType, itemId, feedback, userId, approve, model } = params;
  
  try {
    let endpoint = itemType === "submission" 
      ? 'roadmap-submissions' 
      : 'code-proposals';
    
    // Actualizează statusul și feedback-ul pentru propunerea specificată
    const { data, error } = await supabase
      .from(endpoint)
      .update({
        status: approve ? 'approved' : 'feedback',
        feedback: feedback,
        feedback_by: userId,
        updated_at: new Date().toISOString(),
        feedback_model: model || 'deepseek'  // Adăugăm modelul folosit pentru feedback
      })
      .eq('id', itemId);
    
    if (error) {
      console.error(`Error updating ${itemType}:`, error);
      throw new Error(`Eroare la actualizarea ${itemType === "submission" ? "propunerii de task" : "propunerii de cod"}: ${error.message || 'Eroare necunoscută'}`);
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
