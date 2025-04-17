
import { FeedbackItem } from "../types";

export interface GenerateFeedbackParams {
  itemType: "submission" | "proposal";
  item: FeedbackItem;
  userId: string;
  model: "deepseek" | "claude";
}

export const generateFeedbackAPI = async (params: GenerateFeedbackParams): Promise<{ feedback: string }> => {
  // Implementation for generating feedback
  // This is a placeholder implementation
  const { itemType, item, model } = params;
  
  // In a real implementation, this would call a Supabase function
  // that would generate feedback using the specified AI model
  
  const feedbackPrefix = model === "deepseek" ? "DeepSeek: " : "Claude: ";
  let generatedFeedback = "";
  
  if (itemType === "submission") {
    generatedFeedback = `${feedbackPrefix}Propunerea pentru task-ul "${item.roadmap_tasks?.title}" a fost analizată. Progresul propus de ${item.proposed_progress}% pare rezonabil. Descrierea schimbărilor este clară și detaliată.`;
  } else {
    generatedFeedback = `${feedbackPrefix}Am analizat propunerea de cod pentru fișierele: ${item.proposed_files}. Motivația este bine argumentată.`;
  }
  
  return { feedback: generatedFeedback };
};

// Alias for backward compatibility
export const generateAgentFeedback = generateFeedbackAPI;
