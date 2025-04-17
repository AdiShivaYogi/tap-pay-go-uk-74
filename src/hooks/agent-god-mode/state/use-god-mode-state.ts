
import { useState } from "react";
import { FeedbackItem } from "../types";
import { useToast } from "@/hooks/use-toast";

export interface UseGodModeStateProps {
  userId?: string | undefined;
}

export function useGodModeState(props?: UseGodModeStateProps) {
  // Handle case when props are undefined
  const userId = props?.userId;
  const { toast } = useToast();
  const [isGodModeEnabled, setIsGodModeEnabled] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isGeneratingFeedback, setIsGeneratingFeedback] = useState(false);
  const [currentSubmission, setCurrentSubmission] = useState<FeedbackItem | null>(null);
  const [currentProposal, setCurrentProposal] = useState<FeedbackItem | null>(null);
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState<"submission" | "proposal" | null>(null);
  const [preferredModel, setPreferredModel] = useState<"deepseek" | "claude">("deepseek");
  
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
  
  const resetState = () => {
    setCurrentSubmission(null);
    setCurrentProposal(null);
    setFeedback("");
    setFeedbackType(null);
  };
  
  return {
    userId,
    toast,
    isGodModeEnabled,
    setIsGodModeEnabled,
    isProcessing,
    setIsProcessing,
    isGeneratingFeedback,
    setIsGeneratingFeedback,
    currentSubmission,
    setCurrentSubmission,
    currentProposal,
    setCurrentProposal,
    feedback,
    setFeedback,
    feedbackType,
    setFeedbackType,
    preferredModel,
    setPreferredModel,
    toggleGodMode,
    resetState
  };
}
