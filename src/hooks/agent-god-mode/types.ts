
export interface FeedbackItem {
  id: string;
  proposed_progress?: number;
  proposed_changes?: string;
  proposed_files?: string;
  motivation?: string;
  roadmap_tasks?: {
    id: string;
    title: string;
    description: string;
    progress: number;
  };
  [key: string]: any;
}

export interface GenerateFeedbackParams {
  itemType: "submission" | "proposal";
  item: FeedbackItem;
  userId: string;
  model: "deepseek" | "claude" | "anthropic";
}

export interface SubmitFeedbackParams {
  itemType: "submission" | "proposal";
  itemId: string;
  feedback: string;
  userId: string;
  approve: boolean;
  model?: "deepseek" | "claude" | "anthropic";
}

export interface AutoExecutionConfig {
  enabled: boolean;
  useAnthropicDirect: boolean;
  preferredModel: "deepseek" | "claude" | "anthropic";
  autonomyLevel: number;
  feedbackStyle: "constructive" | "detailed" | "brief" | "mentor";
  autoApproveThreshold: number;
}
