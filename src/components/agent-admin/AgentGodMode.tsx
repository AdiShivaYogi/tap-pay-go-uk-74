
import { Card } from "@/components/ui/card";
import { GodModeToggle } from "./godmode/GodModeToggle";
import { GodModeAlerts } from "./godmode/GodModeAlerts";
import { FeedbackForm } from "./godmode/FeedbackForm";
import { EmptyState } from "./godmode/EmptyState";
import { useAgentGodMode } from "@/hooks/agent-god-mode";

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
    setFeedback,
    setPreferredModel,
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
