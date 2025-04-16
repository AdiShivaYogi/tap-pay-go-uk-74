
export interface FeedbackItem {
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

export interface AgentGodModeState {
  isGodModeEnabled: boolean;
  isProcessing: boolean;
  isGeneratingFeedback: boolean;
  currentSubmission: FeedbackItem | null;
  currentProposal: FeedbackItem | null;
  feedback: string;
  feedbackType: "submission" | "proposal" | null;
  preferredModel: "deepseek" | "claude";
}

export interface UseAgentGodModeProps {
  userId: string | undefined;
}

export interface UseAgentGodModeReturn extends AgentGodModeState {
  toggleGodMode: () => void;
  generateFeedback: (type: "submission" | "proposal", item: FeedbackItem) => Promise<void>;
  submitFeedback: () => Promise<void>;
  cancelFeedback: () => void;
  setFeedback: (feedback: string) => void;
  setPreferredModel: (model: "deepseek" | "claude") => void;
}
