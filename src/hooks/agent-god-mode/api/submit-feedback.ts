
import { supabase } from "@/integrations/supabase/client";
import { SubmitFeedbackParams } from "../types";

export const submitFeedbackAPI = async (params: SubmitFeedbackParams): Promise<{ success: boolean }> => {
  const { itemType, itemId, feedback, userId, approve, model } = params;
  
  try {
    const { data, error } = await supabase.functions.invoke('submit-agent-feedback', {
      body: {
        userId,
        itemType,
        itemId,
        feedback,
        approve: approve || false,
        model: model || 'deepseek', // Folosește deepseek ca model implicit
      }
    });

    if (error) {
      console.error('Error submitting feedback:', error);
      throw new Error(`Eroare la trimiterea feedback-ului: ${error.message || 'Eroare necunoscută'}`);
    }

    return { success: true };
  } catch (err) {
    console.error('Exception in submitFeedbackAPI:', err);
    throw err;
  }
};

// Alias-uri pentru compatibilitate înapoi
export const submitSubmissionFeedback = submitFeedbackAPI;
export const submitProposalFeedback = submitFeedbackAPI;
