
export interface FeedbackItem {
  id: string;
  roadmap_tasks?: {
    id: string;
    title: string;
    description: string;
    category: string;
    status: string;
    progress: number;
  };
  proposed_progress?: number;
  proposed_status?: string;
  proposed_changes?: string;
  proposed_files?: string;
  motivation?: string;
  task_id?: string;
}

export interface GenerateFeedbackParams {
  itemType: "submission" | "proposal";
  item: FeedbackItem;
  userId: string;
  model?: "deepseek" | "claude" | "anthropic";
}

export interface SubmitFeedbackParams {
  itemType: "submission" | "proposal";
  itemId: string;
  feedback: string;
  userId: string;
  approve?: boolean;
  model?: "deepseek" | "claude" | "anthropic";
}

export interface AutoExecutionConfig {
  enabled: boolean;
  useAnthropicDirect?: boolean;
  preferredModel: "deepseek" | "claude" | "anthropic";
  autonomyLevel: number;
  feedbackStyle: string;
  autoApproveThreshold: number;
}
