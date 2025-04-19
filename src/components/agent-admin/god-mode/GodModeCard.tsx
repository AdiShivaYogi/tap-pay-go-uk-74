
import React from "react";
import { StyledCard, StyledCardHeader, StyledCardTitle, StyledCardContent } from "@/components/ui/cards";
import { Crown, Settings } from "lucide-react";
import { GodModeToggle } from "./GodModeToggle";
import { GodModeAlerts } from "./GodModeAlerts";
import { FeedbackForm } from "./FeedbackForm";
import { EmptyState } from "./EmptyState";
import { useAgentGodMode } from "@/hooks/agent-god-mode";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

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
    preferredModel,
    toggleGodMode,
    generateFeedback,
    submitFeedback,
    cancelFeedback,
    setFeedback,
    setPreferredModel,
    autoExecutionConfig
  } = useAgentGodMode({ userId });

  const hasActiveFeedback = currentSubmission || currentProposal;
  const feedbackType = currentSubmission ? "submission" : currentProposal ? "proposal" : undefined;

  return (
    <StyledCard className="mb-6">
      <StyledCardHeader className="flex flex-row items-center justify-between">
        <StyledCardTitle className="flex items-center gap-2">
          <Crown className={`h-5 w-5 ${isGodModeEnabled ? 'text-amber-500' : 'text-muted-foreground'}`} />
          Agent Supervisor
        </StyledCardTitle>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              <Settings className="h-4 w-4" />
              <span className="sr-only">Setări</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4">
              <h4 className="font-medium text-sm">Setări Agent Supervisor</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Model preferat:</span>
                  <select 
                    className="text-xs border rounded p-1"
                    value={preferredModel}
                    onChange={(e) => setPreferredModel(e.target.value)}
                  >
                    <option value="gpt-4-turbo">GPT-4 Turbo</option>
                    <option value="claude-3-5-sonnet">Claude 3.5 Sonnet</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    Versiune sistem: 2.3.5
                  </span>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </StyledCardHeader>
      
      <StyledCardContent>
        <GodModeToggle 
          isGodModeEnabled={isGodModeEnabled} 
          toggleGodMode={toggleGodMode}
          autoExecutionConfig={autoExecutionConfig}
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
