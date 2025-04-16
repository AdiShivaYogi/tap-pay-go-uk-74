
import { UseAgentGodModeProps, UseAgentGodModeReturn } from "./types";
import { useGodModeState } from "./state/use-god-mode-state";
import { useFeedbackActions } from "./actions/use-feedback-actions";

export const useAgentGodMode = ({ userId }: UseAgentGodModeProps): UseAgentGodModeReturn => {
  const state = useGodModeState({ userId });
  const actions = useFeedbackActions(state);
  
  return {
    // State
    isGodModeEnabled: state.isGodModeEnabled,
    isProcessing: state.isProcessing,
    isGeneratingFeedback: state.isGeneratingFeedback,
    currentSubmission: state.currentSubmission,
    currentProposal: state.currentProposal,
    feedback: state.feedback,
    feedbackType: state.feedbackType,
    preferredModel: state.preferredModel,
    
    // Actions
    toggleGodMode: state.toggleGodMode,
    generateFeedback: actions.generateFeedback,
    submitFeedback: actions.submitFeedback,
    cancelFeedback: actions.cancelFeedback,
    setFeedback: state.setFeedback,
    setPreferredModel: state.setPreferredModel
  };
};

// Export types
export * from "./types";
