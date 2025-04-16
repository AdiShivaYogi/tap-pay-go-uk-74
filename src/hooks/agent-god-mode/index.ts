
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useFeedbackActions } from "./actions/use-feedback-actions";
import { useGodModeState } from "./state/use-god-mode-state";
import { FeedbackItem } from "./types";

interface UseAgentGodModeProps {
  userId: string | undefined;
}

export const useAgentGodMode = ({ userId }: UseAgentGodModeProps) => {
  const toast = useToast();
  const [isGodModeEnabled, setIsGodModeEnabled] = useState(false);
  const [isGeneratingFeedback, setIsGeneratingFeedback] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentSubmission, setCurrentSubmission] = useState<FeedbackItem | null>(null);
  const [currentProposal, setCurrentProposal] = useState<FeedbackItem | null>(null);
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState<"submission" | "proposal" | null>(null);
  const [preferredModel, setPreferredModel] = useState<"deepseek" | "claude">("deepseek");

  const state = {
    userId,
    toast: toast.toast,
    isGodModeEnabled,
    setIsGeneratingFeedback,
    setIsProcessing,
    setCurrentSubmission,
    setCurrentProposal,
    feedback,
    setFeedback,
    feedbackType,
    setFeedbackType,
    preferredModel,
    resetState: () => {
      setCurrentSubmission(null);
      setCurrentProposal(null);
      setFeedback("");
      setFeedbackType(null);
    }
  };

  const { generateFeedback, submitFeedback, cancelFeedback } = useFeedbackActions(state);
  
  const toggleGodMode = () => {
    setIsGodModeEnabled(prev => !prev);
  };

  return {
    isGodModeEnabled,
    isGeneratingFeedback,
    isProcessing,
    currentSubmission,
    currentProposal,
    feedback,
    feedbackType,
    preferredModel,
    toggleGodMode,
    generateFeedback,
    submitFeedback,
    cancelFeedback,
    setFeedback,
    setPreferredModel
  };
};
