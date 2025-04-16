
import { extendedSupabase as supabase } from "@/integrations/supabase/extended-client";
import { FeedbackItem } from "./types";
import { useToast } from "@/hooks/use-toast";

export const generateAgentFeedback = async (
  type: "submission" | "proposal", 
  item: FeedbackItem, 
  toast: ReturnType<typeof useToast>["toast"],
  preferredModel: "deepseek" | "claude" = "deepseek"
): Promise<string> => {
  try {
    const promptContent = type === "submission" ? 
      `Analizează această propunere de task de la agentul ${item.agent_id}: 
      Titlu: ${item.roadmap_tasks?.title || "Necunoscut"}
      Descriere: ${item.roadmap_tasks?.description || "Necunoscut"}
      Schimbări propuse: ${item.proposed_changes}
      Progres propus: ${item.proposed_progress}%
      
      Oferă un feedback constructiv și sugestii de îmbunătățire pentru această propunere.` :
      `Analizează această propunere de cod de la agentul ${item.agent_id}:
      Fișiere propuse: ${item.proposed_files}
      Motivație: ${item.motivation}
      
      Oferă un feedback constructiv și sugestii de îmbunătățire pentru acest cod propus.`;
    
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
    
    if (error) throw error;
    
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
    const { error: approveError } = await supabase
      .from('agent_task_submissions')
      .update({ 
        approval_status: 'approved',
        notes: `Aprobat automat în God Mode cu feedback: ${feedback.substring(0, 100)}...`
      })
      .eq('id', submissionId);
      
    if (approveError) throw approveError;
  }
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
  }
};
