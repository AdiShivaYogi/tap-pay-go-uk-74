
import React from "react";
import { FeedbackItem } from "@/hooks/agent-god-mode/types";

interface FeedbackFormHeaderProps {
  feedbackType: "submission" | "proposal" | undefined;
  currentSubmission: FeedbackItem | null;
  currentProposal: FeedbackItem | null;
}

export const FeedbackFormHeader = ({
  feedbackType,
  currentSubmission,
  currentProposal
}: FeedbackFormHeaderProps) => {
  const currentItem = currentSubmission || currentProposal;
  if (!currentItem) return null;

  const title = feedbackType === "submission" 
    ? currentSubmission?.roadmap_tasks?.title || "Propunere task"
    : "Propunere cod";

  return (
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
  );
};
