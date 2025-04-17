
import { FeedbackItem } from "../types";
import { generateAgentFeedback } from "../api/generate-feedback";
import { submitFeedbackAPI } from "../api/submit-feedback";

export function useFeedbackActions(state: any) {
  const {
    userId,
    toast,
    isGodModeEnabled,
    setIsProcessing,
    setIsGeneratingFeedback,
    setCurrentSubmission,
    setCurrentProposal,
    feedback,
    setFeedback,
    feedbackType,
    setFeedbackType,
    preferredModel,
    resetState
  } = state;

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
      // Fixed function call parameters
      const generatedFeedback = await generateAgentFeedback({
        itemType: type,
        item,
        userId,
        model: preferredModel
      });
      
      setFeedback(generatedFeedback.feedback);
      
      // Notificare de succes pentru utilizator
      toast({
        title: "Feedback generat cu succes",
        description: `S-a generat feedback pentru ${type === "submission" ? "propunerea de task" : "propunerea de cod"}.`,
      });
    } catch (err) {
      console.error("Eroare la generarea feedback-ului:", err);
      toast({
        title: "Nu s-a putut genera feedback",
        description: "A apărut o eroare la generarea feedback-ului automat.",
        variant: "destructive"
      });
    } finally {
      setIsGeneratingFeedback(false);
    }
  };

  const submitFeedback = async () => {
    if (!feedback || !feedbackType) return;
    
    setIsProcessing(true);
    
    try {
      if (feedbackType === "submission" && state.currentSubmission) {
        // Fixed function call using the updated API
        await submitFeedbackAPI({
          itemType: "submission",
          itemId: state.currentSubmission.id, 
          feedback, 
          approve: isGodModeEnabled, 
          userId,
          model: preferredModel
        });
        
        showSuccessToast("submission");
      } else if (feedbackType === "proposal" && state.currentProposal) {
        // Fixed function call using the updated API
        await submitFeedbackAPI({
          itemType: "proposal",
          itemId: state.currentProposal.id, 
          feedback, 
          approve: isGodModeEnabled, 
          userId,
          model: preferredModel
        });
        
        showSuccessToast("proposal");
      }
      
      resetState();
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

  const showSuccessToast = (type: "submission" | "proposal") => {
    const isTask = type === "submission";
    
    toast({
      title: isGodModeEnabled ? 
        `Propunere${isTask ? "" : " de cod"} aprobată automat` : 
        "Feedback trimis",
      description: isGodModeEnabled ? 
        `Propunerea${isTask ? "" : " de cod"} a fost aprobată automat și agentul a primit feedback pentru îmbunătățire` : 
        `Feedback-ul a fost trimis către agent pentru îmbunătățirea propunerii${isTask ? "" : " de cod"}`,
    });
  };

  const cancelFeedback = () => {
    resetState();
  };

  return {
    generateFeedback,
    submitFeedback,
    cancelFeedback,
  };
}
