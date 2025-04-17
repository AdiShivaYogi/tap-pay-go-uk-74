
import { supabase } from "@/integrations/supabase/client";
import { FeedbackItem } from "../types";

interface GenerateFeedbackParams {
  itemType: "submission" | "proposal";
  item: FeedbackItem;
  userId: string;
  model: "deepseek" | "claude";
}

interface GenerateFeedbackResult {
  feedback: string;
  success: boolean;
}

export const generateFeedbackAPI = async ({
  itemType,
  item,
  userId,
  model = "deepseek"
}: GenerateFeedbackParams): Promise<GenerateFeedbackResult> => {
  try {
    const isSubmission = itemType === "submission";
    const systemContext = isSubmission 
      ? `Ești un manager AI care evaluează o propunere de task pentru roadmap-ul platformei.
         Propunere de progres: ${item.proposed_progress}%
         Propunere de schimbări: ${item.proposed_changes}
         Trebuie să oferi feedback constructiv și să determini dacă propunerea este validă.`
      : `Ești un manager AI care evaluează o propunere de cod pentru platforma.
         Fișiere propuse: ${item.proposed_files}
         Motivație: ${item.motivation}
         Trebuie să oferi feedback constructiv și să evaluezi calitatea propunerii.`;

    const message = isSubmission
      ? `Analizează această propunere de task:
         Task: ${item.roadmap_tasks?.title || "Necunoscut"}
         Descriere: ${item.roadmap_tasks?.description || "Necunoscut"} 
         Propunere de progres: ${item.proposed_progress}%
         Schimbări propuse: "${item.proposed_changes}"
         
         Generează feedback constructiv, subliniind punctele forte și slabe ale propunerii.
         Nu accepta sau respinge propunerea, doar oferă feedback de calitate.`
      : `Analizează această propunere de cod:
         Motivație: "${item.motivation}"
         Fișiere propuse: "${item.proposed_files}"
         Cod propus: "${item.proposed_code?.substring(0, 1500)}${item.proposed_code && item.proposed_code.length > 1500 ? '...' : ''}"
         
         Generează feedback constructiv, subliniind punctele forte și posibilele probleme în implementare.
         Nu accepta sau respinge propunerea, doar oferă feedback de calitate.`;

    const { data, error } = await supabase.functions.invoke("generate-agent-response", {
      body: {
        message,
        systemContext,
        agentId: "feedback-generator",
        agentType: "evaluator de propuneri",
        agentDescription: "Agent specializat în analiza propunerilor de dezvoltare",
        model: model // Pass the selected model
      }
    });

    if (error) throw error;

    return {
      feedback: data.response || "Nu s-a putut genera feedback.",
      success: true
    };
  } catch (error) {
    console.error("Error generating feedback:", error);
    throw error;
  }
};
