
import { FeedbackItem } from "./types";
import { useToast } from "@/hooks/use-toast";
import { generateAgentFeedback } from "./api/generate-feedback";
import { submitSubmissionFeedback, submitProposalFeedback } from "./api/submit-feedback";

// Re-export for backwards compatibility
export { 
  generateAgentFeedback,
  submitSubmissionFeedback,
  submitProposalFeedback 
};
