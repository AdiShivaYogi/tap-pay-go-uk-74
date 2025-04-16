
import React from "react";
import { Crown } from "lucide-react";
import { StyledCard, StyledCardHeader, StyledCardTitle, StyledCardContent } from "@/components/ui/cards";
import { useAgentGodMode } from "@/hooks/use-agent-god-mode";
import { GodModeToggle } from "./godmode/GodModeToggle";
import { GodModeAlerts } from "./godmode/GodModeAlerts";
import { FeedbackForm } from "./godmode/FeedbackForm";
import { EmptyState } from "./godmode/EmptyState";

interface AgentGodModeProps {
  userId: string | undefined;
}

export const AgentGodMode = ({ userId }: AgentGodModeProps) => {
  const {
    isGodModeEnabled,
    isProcessing,
    isGeneratingFeedback,
    currentSubmission,
    currentProposal,
    feedback,
    feedbackType,
    toggleGodMode,
    generateFeedback,
    submitFeedback,
    cancelFeedback,
    setFeedback
  } = useAgentGodMode({ userId });

  const hasActiveFeedback = currentSubmission || currentProposal;

  return (
    <StyledCard className="mb-6">
      <StyledCardHeader>
        <StyledCardTitle className="flex items-center gap-2">
          <Crown className={`h-5 w-5 ${isGodModeEnabled ? 'text-amber-500' : 'text-muted-foreground'}`} />
          Agent Supervisor
        </StyledCardTitle>
      </StyledCardHeader>
      
      <StyledCardContent>
        <GodModeToggle 
          isGodModeEnabled={isGodModeEnabled} 
          toggleGodMode={toggleGodMode}
        />
        
        <GodModeAlerts isGodModeEnabled={isGodModeEnabled} />
        
        {hasActiveFeedback ? (
          <FeedbackForm 
            feedbackType={feedbackType}
            currentSubmission={currentSubmission}
            currentProposal={currentProposal}
            feedback={feedback}
            isGeneratingFeedback={isGeneratingFeedback}
            isProcessing={isProcessing}
            isGodModeEnabled={isGodModeEnabled}
            onFeedbackChange={setFeedback}
            onSubmit={submitFeedback}
            onCancel={cancelFeedback}
          />
        ) : (
          <EmptyState isGodModeEnabled={isGodModeEnabled} />
        )}
      </StyledCardContent>
    </StyledCard>
  );
};
