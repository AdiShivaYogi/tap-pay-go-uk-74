
import { extendedSupabase as supabase } from "@/integrations/supabase/extended-client";
import { FeedbackItem } from "../types";
import { useToast } from "@/hooks/use-toast";

export const generateAgentFeedback = async (
  type: "submission" | "proposal", 
  item: FeedbackItem, 
  toast: ReturnType<typeof useToast>["toast"],
  preferredModel: "deepseek" | "claude" = "deepseek"
): Promise<string> => {
  try {
    const promptContent = generatePromptContent(type, item);
    
    console.log(`Generare feedback pentru ${type} folosind modelul ${preferredModel}`);
    
    const { data, error } = await supabase.functions.invoke('generate-agent-feedback', {
      body: { 
        message: promptContent,
        agentType: "Agent Supervisor",
        agentDescription: "Agent specializat în evaluarea și îmbunătățirea propunerilor de la alți agenți",
        isFeedback: true,
        preferredModel: preferredModel,
        content: promptContent,
        agentId: item.agent_id,
        submissionId: type === "submission" ? item.id : undefined,
        proposalId: type === "proposal" ? item.id : undefined,
        type: type
      }
    });
    
    if (error) {
      console.error("Eroare la invocarea funcției edge:", error);
      throw error;
    }
    
    // Adăugăm informații despre modelul folosit în toast
    const modelInfo = data?.model_used || "AI";
    toast({
      title: `Feedback generat cu ${modelInfo}`,
      description: "Feedback-ul a fost generat cu succes.",
    });
    
    return data?.feedback || "Nu s-a putut genera un feedback. Te rugăm încearcă din nou.";
    
  } catch (err) {
    console.error("Eroare la generarea feedbackului:", err);
    toast({
      title: "Eroare",
      description: "Nu s-a putut genera feedback pentru această propunere.",
      variant: "destructive"
    });
    return "Nu s-a putut genera un feedback automat. Te rugăm să scrii un feedback manual.";
  }
};

const generatePromptContent = (type: "submission" | "proposal", item: FeedbackItem): string => {
  if (type === "submission") {
    return `Analizează această propunere de task de la agentul ${item.agent_id}: 
      Titlu: ${item.roadmap_tasks?.title || "Necunoscut"}
      Descriere: ${item.roadmap_tasks?.description || "Necunoscut"}
      Schimbări propuse: ${item.proposed_changes}
      Progres propus: ${item.proposed_progress}%
      
      Oferă un feedback constructiv și sugestii de îmbunătățire pentru această propunere. 
      Structurează feedback-ul în secțiuni clare precum:
      1. Evaluare generală
      2. Puncte forte
      3. Sugestii de îmbunătățire
      4. Recomandări pentru implementare`;
  } else {
    return `Analizează această propunere de cod de la agentul ${item.agent_id}:
      Fișiere propuse: ${item.proposed_files}
      Motivație: ${item.motivation}
      
      Oferă un feedback constructiv și sugestii de îmbunătățire pentru acest cod propus.
      Structurează feedback-ul în secțiuni clare precum:
      1. Evaluare generală a calității codului
      2. Puncte forte ale implementării
      3. Sugestii pentru optimizare și îmbunătățire
      4. Considerații de securitate și performanță`;
  }
};
