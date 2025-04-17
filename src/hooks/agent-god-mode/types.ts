
export interface AutoExecutionConfig {
  enabled: boolean;
  useAnthropicDirect: boolean;
  preferredModel: "anthropic" | "claude" | "deepseek";
  autonomyLevel: number;
  feedbackStyle: "constructive" | "detailed" | "concise";
  autoApproveThreshold: number;
}

export interface FeedbackItem {
  id: string;
  roadmap_tasks?: {
    title: string;
    description: string;
    progress: number;
  };
  proposed_progress?: number;
  proposed_changes?: string;
  proposed_files?: string;
  motivation?: string;
}

export interface SubmitFeedbackParams {
  itemType: "submission" | "proposal";
  itemId: string;
  feedback: string;
  userId: string;
  approve: boolean;
  model: "deepseek" | "claude" | "anthropic";
}

export interface GenerateFeedbackParams {
  itemType: "submission" | "proposal";
  item: FeedbackItem;
  userId: string;
  model: "deepseek" | "claude" | "anthropic";
}
