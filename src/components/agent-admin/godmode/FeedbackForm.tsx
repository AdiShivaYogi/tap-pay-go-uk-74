
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, CheckSquare, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ModelSelector } from "../god-mode/ModelSelector";
import { FeedbackItem } from "@/hooks/agent-god-mode/types";

interface FeedbackFormProps {
  feedbackType: "submission" | "proposal" | null;
  currentSubmission: FeedbackItem | null;
  currentProposal: FeedbackItem | null;
  feedback: string;
  isGeneratingFeedback: boolean;
  isProcessing: boolean;
  isGodModeEnabled: boolean;
  preferredModel: "deepseek" | "claude" | "anthropic";
  onFeedbackChange: (feedback: string) => void;
  onModelChange: (model: "deepseek" | "claude" | "anthropic") => void;
  onSubmit: () => Promise<void>;
  onCancel: () => void;
}

export const FeedbackForm = ({
  feedbackType,
  currentSubmission,
  currentProposal,
  feedback,
  isGeneratingFeedback,
  isProcessing,
  isGodModeEnabled,
  preferredModel,
  onFeedbackChange,
  onModelChange,
  onSubmit,
  onCancel
}: FeedbackFormProps) => {
  const currentItem = currentSubmission || currentProposal;
  if (!currentItem) return null;

  const title = feedbackType === "submission" 
    ? currentSubmission?.roadmap_tasks?.title || "Propunere task"
    : "Propunere cod";

  return (
    <Card className="p-4 mt-4">
      <div className="space-y-3 mb-4">
        <h3 className="font-semibold flex items-center gap-2">
          Feedback pentru: <span className="text-primary">{title}</span>
        </h3>
        
        {feedbackType === "submission" ? (
          <div className="text-sm text-muted-foreground">
            <p>
              <span className="font-medium">Progres propus:</span> {currentSubmission?.proposed_progress}%
            </p>
            <p>
              <span className="font-medium">Schimbări propuse:</span> {currentSubmission?.proposed_changes}
            </p>
          </div>
        ) : (
          <div className="text-sm text-muted-foreground">
            <p>
              <span className="font-medium">Fișiere propuse:</span> {currentProposal?.proposed_files}
            </p>
            <p>
              <span className="font-medium">Motivație:</span> {currentProposal?.motivation}
            </p>
          </div>
        )}
      </div>

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

      <div className="flex justify-end space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onCancel}
          disabled={isGeneratingFeedback || isProcessing}
          className="gap-1"
        >
          <X className="h-4 w-4" /> Anulează
        </Button>
        <Button
          onClick={onSubmit}
          disabled={!feedback.trim() || isGeneratingFeedback || isProcessing}
          size="sm"
          className="gap-1"
        >
          {isProcessing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Se procesează...
            </>
          ) : (
            <>
              <CheckSquare className="h-4 w-4" />
              {isGodModeEnabled ? "Aprobă și trimite feedback" : "Trimite feedback"}
            </>
          )}
        </Button>
      </div>
    </Card>
  );
};
