
import { FeedbackItem } from "../types";
import { generateAgentFeedback } from "../api/generate-feedback";
import { submitSubmissionFeedback, submitProposalFeedback } from "../feedback-service";

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
      const generatedFeedback = await generateAgentFeedback(type, item, toast, preferredModel);
      setFeedback(generatedFeedback);
    } finally {
      setIsGeneratingFeedback(false);
    }
  };

  const submitFeedback = async () => {
    if (!feedback || !feedbackType) return;
    
    setIsProcessing(true);
    
    try {
      if (feedbackType === "submission" && state.currentSubmission) {
        await submitSubmissionFeedback(
          state.currentSubmission.id, 
          feedback, 
          isGodModeEnabled, 
          userId
        );
        
        showSuccessToast("submission");
      } else if (feedbackType === "proposal" && state.currentProposal) {
        await submitProposalFeedback(
          state.currentProposal.id, 
          feedback, 
          isGodModeEnabled, 
          userId
        );
        
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
