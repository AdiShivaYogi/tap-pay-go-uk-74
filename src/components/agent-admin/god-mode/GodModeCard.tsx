
import React from "react";
import { StyledCard, StyledCardHeader, StyledCardTitle, StyledCardContent } from "@/components/ui/cards";
import { Crown } from "lucide-react";
import { GodModeToggle } from "./GodModeToggle";
import { GodModeAlerts } from "./GodModeAlerts";
import { FeedbackForm } from "./FeedbackForm";
import { EmptyState } from "./EmptyState";
import { useAgentGodMode } from "@/hooks/agent-god-mode";

interface GodModeCardProps {
  userId: string | undefined;
}

export const GodModeCard = ({ userId }: GodModeCardProps) => {
  const {
    isGodModeEnabled,
    isProcessing,
    isGeneratingFeedback,
    currentSubmission,
    currentProposal,
    feedback,
    feedbackType,
    preferredModel,
    toggleGodMode,
    generateFeedback,
    submitFeedback,
    cancelFeedback,
    setFeedback,
    setPreferredModel
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
            preferredModel={preferredModel}
            isGeneratingFeedback={isGeneratingFeedback}
            isProcessing={isProcessing}
            isGodModeEnabled={isGodModeEnabled}
            onFeedbackChange={setFeedback}
            onModelChange={setPreferredModel}
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
