
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { FeedbackItem } from "@/hooks/agent-god-mode/types";
import { FeedbackFormHeader } from "./FeedbackFormHeader";
import { FeedbackFormActions } from "./FeedbackFormActions";
import { ModelSelector } from "./ModelSelector";

interface FeedbackFormProps {
  feedbackType: "submission" | "proposal" | null;
  currentSubmission: FeedbackItem | null;
  currentProposal: FeedbackItem | null;
  feedback: string;
  preferredModel: "deepseek" | "claude";
  isGeneratingFeedback: boolean;
  isProcessing: boolean;
  isGodModeEnabled: boolean;
  onFeedbackChange: (feedback: string) => void;
  onModelChange: (model: "deepseek" | "claude") => void;
  onSubmit: () => Promise<void>;
  onCancel: () => void;
}

export const FeedbackForm = ({
  feedbackType,
  currentSubmission,
  currentProposal,
  feedback,
  preferredModel,
  isGeneratingFeedback,
  isProcessing,
  isGodModeEnabled,
  onFeedbackChange,
  onModelChange,
  onSubmit,
  onCancel
}: FeedbackFormProps) => {
  const currentItem = currentSubmission || currentProposal;
  if (!currentItem) return null;

  return (
    <Card className="p-4 mt-4">
      <FeedbackFormHeader 
        feedbackType={feedbackType}
        currentSubmission={currentSubmission}
        currentProposal={currentProposal}
      />

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <label htmlFor="feedback" className="block text-sm font-medium">
            {isGeneratingFeedback ? "Se generează feedback..." : "Feedback pentru agent:"}
          </label>
          <ModelSelector
            value={preferredModel}
            onChange={onModelChange}
            disabled={isGeneratingFeedback || isProcessing}
          />
        </div>
        <Textarea
          id="feedback"
          placeholder="Introduceți feedback pentru agent sau folosiți butonul pentru a genera automat..."
          className="min-h-[150px]"
          value={feedback}
          onChange={(e) => onFeedbackChange(e.target.value)}
          disabled={isGeneratingFeedback || isProcessing}
        />
      </div>

      <FeedbackFormActions
        feedback={feedback}
        isGeneratingFeedback={isGeneratingFeedback}
        isProcessing={isProcessing}
        isGodModeEnabled={isGodModeEnabled}
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
    </Card>
  );
};
