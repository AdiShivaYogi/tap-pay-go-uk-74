
import { Card } from "@/components/ui/card";
import { GodModeToggle } from "./god-mode/GodModeToggle";
import { GodModeAlerts } from "./god-mode/GodModeAlerts";
import { FeedbackForm } from "./god-mode/FeedbackForm";
import { EmptyState } from "./god-mode/EmptyState";
import { useAgentGodMode } from "@/hooks/agent-god-mode";
import React from "react";

interface AgentGodModeProps {
  userId?: string;
}

export const AgentGodMode = ({ userId }: AgentGodModeProps) => {
  const {
    isGodModeEnabled,
    toggleGodMode,
    currentSubmission,
    currentProposal,
    feedback,
    isGeneratingFeedback,
    isProcessing,
    preferredModel,
    autoExecutionConfig,
    setFeedback,
    setPreferredModel,
    updateAutoExecutionConfig,
    submitFeedback,
    cancelFeedback
  } = useAgentGodMode({ userId });

  const feedbackType = currentSubmission ? "submission" : currentProposal ? "proposal" : null;
  const isFormVisible = Boolean(currentSubmission || currentProposal);

  return (
    <Card className="p-6 mb-6 bg-background">
      <GodModeToggle
        isGodModeEnabled={isGodModeEnabled}
        toggleGodMode={toggleGodMode}
        autoExecutionConfig={autoExecutionConfig}
        updateAutoExecutionConfig={updateAutoExecutionConfig}
      />
      
      <GodModeAlerts isGodModeEnabled={isGodModeEnabled} />
      
      {isFormVisible ? (
        <FeedbackForm
          feedbackType={feedbackType}
          currentSubmission={currentSubmission}
          currentProposal={currentProposal}
          feedback={feedback}
          isGeneratingFeedback={isGeneratingFeedback}
          isProcessing={isProcessing}
          isGodModeEnabled={isGodModeEnabled}
          preferredModel={preferredModel}
          onFeedbackChange={setFeedback}
          onModelChange={setPreferredModel}
          onSubmit={submitFeedback}
          onCancel={cancelFeedback}
        />
      ) : (
        <EmptyState isGodModeEnabled={isGodModeEnabled} />
      )}
    </Card>
  );
};
