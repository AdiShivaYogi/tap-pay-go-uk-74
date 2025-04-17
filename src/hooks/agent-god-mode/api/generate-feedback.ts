
import { supabase } from "@/integrations/supabase/client";
import { FeedbackItem, GenerateFeedbackParams } from "../types";

export const generateFeedbackAPI = async (params: GenerateFeedbackParams): Promise<{ feedback: string }> => {
  const { itemType, item, userId, model } = params;
  
  try {
    // Apelează funcția Supabase pentru a genera feedback cu modelul specificat
    const { data, error } = await supabase.functions.invoke('generate-agent-feedback', {
      body: {
        userId,
        itemType,
        item,
        model: model || 'deepseek', // Folosește deepseek ca model implicit
      }
    });

    if (error) {
      console.error('Error generating feedback:', error);
      throw new Error(`Eroare la generarea feedback-ului: ${error.message || 'Eroare necunoscută'}`);
    }

    return { feedback: data.feedback || 'Nu s-a putut genera feedback.' };
  } catch (err) {
    console.error('Exception in generateFeedbackAPI:', err);
    throw err;
  }
};

// Alias pentru compatibilitate înapoi
export const generateAgentFeedback = generateFeedbackAPI;
