
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { extendedSupabase as supabase } from "@/integrations/supabase/extended-client";

interface UseAgentGodModeProps {
  userId: string | undefined;
}

interface FeedbackItem {
  id: string;
  agent_id: string;
  roadmap_tasks?: {
    title: string;
    description: string;
  };
  proposed_changes?: string;
  proposed_progress?: number;
  proposed_files?: string;
  motivation?: string;
}

export const useAgentGodMode = ({ userId }: UseAgentGodModeProps) => {
  const { toast } = useToast();
  const [isGodModeEnabled, setIsGodModeEnabled] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isGeneratingFeedback, setIsGeneratingFeedback] = useState(false);
  const [currentSubmission, setCurrentSubmission] = useState<FeedbackItem | null>(null);
  const [currentProposal, setCurrentProposal] = useState<FeedbackItem | null>(null);
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState<"submission" | "proposal" | null>(null);

  const toggleGodMode = () => {
    const newState = !isGodModeEnabled;
    setIsGodModeEnabled(newState);
    
    toast({
      title: newState ? "God Mode activat" : "God Mode dezactivat",
      description: newState ? 
        "Propunerile vor fi aprobate automat cu feedback de îmbunătățire" : 
        "Propunerile vor primi doar feedback, fără aprobare automată",
      variant: newState ? "default" : "destructive",
    });
  };

  const generateFeedback = async (type: "submission" | "proposal", item: FeedbackItem) => {
    setIsGeneratingFeedback(true);
    setFeedbackType(type);
    
    if (type === "submission") {
      setCurrentSubmission(item);
      setCurrentProposal(null);
    } else {
      setCurrentProposal(item);
      setCurrentSubmission(null);
    }
    
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
      
      const { data, error } = await supabase.functions.invoke('generate-agent-response', {
        body: { 
          message: promptContent,
          agentType: "Agent Supervisor",
          agentDescription: "Agent specializat în evaluarea și îmbunătățirea propunerilor de la alți agenți",
          isFeedback: true
        }
      });
      
      if (error) throw error;
      setFeedback(data?.response || "Nu s-a putut genera un feedback. Te rugăm încearcă din nou.");
      
    } catch (err) {
      console.error("Eroare la generarea feedbackului:", err);
      toast({
        title: "Eroare",
        description: "Nu s-a putut genera feedback pentru această propunere.",
        variant: "destructive"
      });
      setFeedback("Nu s-a putut genera un feedback automat. Te rugăm să scrii un feedback manual.");
    } finally {
      setIsGeneratingFeedback(false);
    }
  };

  const submitFeedback = async () => {
    if (!feedback || !feedbackType) return;
    
    setIsProcessing(true);
    try {
      if (feedbackType === "submission" && currentSubmission) {
        const { error: feedbackError } = await supabase
          .from('agent_feedback')
          .insert({
            submission_id: currentSubmission.id,
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
            .eq('id', currentSubmission.id);
            
          if (approveError) throw approveError;
        }
        
        toast({
          title: isGodModeEnabled ? "Propunere aprobată automat" : "Feedback trimis",
          description: isGodModeEnabled ? 
            "Propunerea a fost aprobată automat și agentul a primit feedback pentru îmbunătățire" : 
            "Feedback-ul a fost trimis către agent pentru îmbunătățirea propunerii",
        });
        
      } else if (feedbackType === "proposal" && currentProposal) {
        const { error: feedbackError } = await supabase
          .from('code_proposal_feedback')
          .insert({
            proposal_id: currentProposal.id,
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
            .eq('id', currentProposal.id);
            
          if (approveError) throw approveError;
        }
        
        toast({
          title: isGodModeEnabled ? "Propunere de cod aprobată automat" : "Feedback trimis",
          description: isGodModeEnabled ? 
            "Propunerea de cod a fost aprobată automat și agentul a primit feedback pentru îmbunătățire" : 
            "Feedback-ul a fost trimis către agent pentru îmbunătățirea codului propus",
        });
      }
      
      setCurrentSubmission(null);
      setCurrentProposal(null);
      setFeedback("");
      setFeedbackType(null);
      
    } catch (err) {
      console.error("Eroare la trimiterea feedbackului:", err);
      toast({
        title: "Eroare",
        description: "Nu s-a putut trimite feedback-ul.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const cancelFeedback = () => {
    setCurrentSubmission(null);
    setCurrentProposal(null);
    setFeedback("");
    setFeedbackType(null);
  };

  return {
    isGodModeEnabled,
    isProcessing,
    isGeneratingFeedback,
    currentSubmission,
    currentProposal,
    feedback,
    feedbackType,
    toggleGodMode,
    generateFeedback,
    submitFeedback,
    cancelFeedback,
    setFeedback
  };
};
