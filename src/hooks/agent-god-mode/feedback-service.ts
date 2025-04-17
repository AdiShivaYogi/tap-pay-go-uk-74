
import { FeedbackItem } from "./types";
import { useToast } from "@/hooks/use-toast";
import { generateFeedbackAPI, generateAgentFeedback } from "./api/generate-feedback";
import { submitSubmissionFeedback, submitProposalFeedback, submitFeedbackAPI } from "./api/submit-feedback";

// Re-export for backwards compatibility
export { 
  generateAgentFeedback,
  generateFeedbackAPI,
  submitSubmissionFeedback,
  submitProposalFeedback,
  submitFeedbackAPI
};
