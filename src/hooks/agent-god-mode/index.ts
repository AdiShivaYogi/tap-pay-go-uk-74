
import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { FeedbackItem } from "./types";
import { generateFeedbackAPI } from "./api/generate-feedback";
import { submitFeedbackAPI } from "./api/submit-feedback";
import { useGodModeState, UseGodModeStateProps } from "./state/use-god-mode-state";

interface UseAgentGodModeProps {
  userId?: string;
}

export const useAgentGodMode = (props?: UseAgentGodModeProps) => {
  const { toast } = useToast();
  // Pass the props to useGodModeState
  const { isGodModeEnabled, toggleGodMode } = useGodModeState(props);
  
  const [currentSubmission, setCurrentSubmission] = useState<FeedbackItem | null>(null);
  const [currentProposal, setCurrentProposal] = useState<FeedbackItem | null>(null);
  const [feedback, setFeedback] = useState<string>("");
  const [isGeneratingFeedback, setIsGeneratingFeedback] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [preferredModel, setPreferredModel] = useState<"deepseek" | "claude">("deepseek");

  const resetState = useCallback(() => {
    setCurrentSubmission(null);
    setCurrentProposal(null);
    setFeedback("");
    setIsGeneratingFeedback(false);
    setIsProcessing(false);
  }, []);

  const generateFeedback = useCallback(async (item: FeedbackItem, itemType: "submission" | "proposal") => {
    if (!props?.userId) {
      toast({
        title: "Eroare",
        description: "Utilizatorul nu este autentificat",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsGeneratingFeedback(true);
      if (itemType === "submission") {
        setCurrentSubmission(item);
      } else {
        setCurrentProposal(item);
      }
      
      const result = await generateFeedbackAPI({
        itemType,
        item,
        userId: props.userId,
        model: preferredModel
      });
      
      if (result?.feedback) {
        setFeedback(result.feedback);
        toast({
          title: "Feedback generat",
          description: "S-a generat feedback pentru propunerea selectată."
        });
      }
    } catch (error) {
      console.error("Error generating feedback:", error);
      toast({
        title: "Eroare",
        description: "Nu s-a putut genera feedback. Vă rugăm să încercați din nou.",
        variant: "destructive"
      });
    } finally {
      setIsGeneratingFeedback(false);
    }
  }, [props?.userId, toast, preferredModel]);

  const submitFeedback = useCallback(async () => {
    if (!props?.userId || (!currentSubmission && !currentProposal)) {
      toast({
        title: "Eroare",
        description: "Datele pentru feedback sunt incomplete",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsProcessing(true);
      
      const itemType = currentSubmission ? "submission" : "proposal";
      const item = currentSubmission || currentProposal;
      
      if (!item) {
        throw new Error("Nu există un element selectat pentru feedback");
      }
      
      const result = await submitFeedbackAPI({
        itemType,
        itemId: item.id,
        feedback,
        userId: props.userId,
        approve: isGodModeEnabled
      });
      
      if (result?.success) {
        toast({
          title: isGodModeEnabled ? "Propunere aprobată" : "Feedback trimis",
          description: isGodModeEnabled 
            ? "Propunerea a fost aprobată și feedback-ul a fost trimis către agent." 
            : "Feedback-ul a fost trimis către agent."
        });
        resetState();
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast({
        title: "Eroare",
        description: "Nu s-a putut trimite feedback-ul. Vă rugăm să încercați din nou.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  }, [props?.userId, currentSubmission, currentProposal, feedback, isGodModeEnabled, toast, resetState]);

  return {
    isGodModeEnabled,
    toggleGodMode,
    currentSubmission,
    currentProposal,
    feedback,
    isGeneratingFeedback,
    isProcessing,
    preferredModel,
    setFeedback,
    setPreferredModel,
    generateFeedback,
    submitFeedback,
    cancelFeedback: resetState
  };
};
