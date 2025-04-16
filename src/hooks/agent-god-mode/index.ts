
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { 
  UseAgentGodModeProps, 
  FeedbackItem, 
  UseAgentGodModeReturn 
} from "./types";
import { 
  generateAgentFeedback, 
  submitSubmissionFeedback, 
  submitProposalFeedback 
} from "./feedback-service";

export const useAgentGodMode = ({ userId }: UseAgentGodModeProps): UseAgentGodModeReturn => {
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
      const generatedFeedback = await generateAgentFeedback(type, item, toast);
      setFeedback(generatedFeedback);
    } finally {
      setIsGeneratingFeedback(false);
    }
  };

  const submitFeedback = async () => {
    if (!feedback || !feedbackType) return;
    
    setIsProcessing(true);
    try {
      if (feedbackType === "submission" && currentSubmission) {
        await submitSubmissionFeedback(currentSubmission.id, feedback, isGodModeEnabled, userId);
        
        toast({
          title: isGodModeEnabled ? "Propunere aprobată automat" : "Feedback trimis",
          description: isGodModeEnabled ? 
            "Propunerea a fost aprobată automat și agentul a primit feedback pentru îmbunătățire" : 
            "Feedback-ul a fost trimis către agent pentru îmbunătățirea propunerii",
        });
        
      } else if (feedbackType === "proposal" && currentProposal) {
        await submitProposalFeedback(currentProposal.id, feedback, isGodModeEnabled, userId);
        
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

// Export types
export * from "./types";
