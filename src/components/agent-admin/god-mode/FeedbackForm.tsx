
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { FeedbackItem } from "@/hooks/agent-god-mode/types";
import { FeedbackFormHeader } from "./FeedbackFormHeader";
import { FeedbackFormActions } from "./FeedbackFormActions";
import { ModelSelector } from "./ModelSelector";
import { Badge } from "@/components/ui/badge";
import { Brain } from "lucide-react";

interface FeedbackFormProps {
  feedbackType: "submission" | "proposal" | undefined;
  currentSubmission: FeedbackItem | null;
  currentProposal: FeedbackItem | null;
  feedback: string;
  preferredModel: "deepseek" | "claude" | "anthropic";
  isGeneratingFeedback: boolean;
  isProcessing: boolean;
  isGodModeEnabled: boolean;
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
  
  // Calculează complexitatea și valoarea de învățare a feedback-ului actual
  const calculateLearningValue = () => {
    if (!feedback) return 0;
    
    // Factori de complexitate
    const lengthFactor = Math.min(feedback.length / 300, 1);
    const wordCountFactor = Math.min(feedback.split(' ').length / 60, 1);
    const complexityFactor = (feedback.includes('optimizare') || 
                            feedback.includes('refactorizare') ||
                            feedback.includes('arhitectură')) ? 1.2 : 1;
    
    // Calculul valorii de învățare
    return Math.round(((lengthFactor * 0.4) + (wordCountFactor * 0.6)) * complexityFactor * 100);
  };
  
  const learningValue = calculateLearningValue();

  const getModelDisplayName = (model: string) => {
    switch(model) {
      case 'anthropic': return 'Claude (Anthropic Direct)';
      case 'claude': return 'Claude (OpenRouter)';
      case 'deepseek': return 'DeepSeek Chat';
      default: return model;
    }
  };

  return (
    <Card className="p-4 mt-4 border border-amber-100 bg-gradient-to-br from-amber-50/30 to-white">
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
          <div className="flex items-center gap-2">
            {preferredModel && (
              <Badge 
                variant="outline" 
                className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200"
              >
                {getModelDisplayName(preferredModel)}
              </Badge>
            )}
            <ModelSelector
              value={preferredModel}
              onChange={onModelChange}
              disabled={isGeneratingFeedback || isProcessing}
              showAnthropicDirect={true}
            />
          </div>
        </div>
        <Textarea
          id="feedback"
          placeholder="Introduceți feedback pentru agent sau folosiți butonul pentru a genera automat..."
          className="min-h-[150px]"
          value={feedback}
          onChange={(e) => onFeedbackChange(e.target.value)}
          disabled={isGeneratingFeedback || isProcessing}
        />
        
        {feedback && feedback.length > 0 && (
          <div className="mt-2 p-2 bg-amber-50/40 border border-amber-100 rounded text-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Brain className="h-4 w-4 text-amber-600" />
                <span className="font-medium">Auto-Debugging & Evoluție:</span>
              </div>
              <Badge 
                variant="outline" 
                className={`${
                  learningValue > 75 ? "bg-green-50 text-green-700 border-green-200" : 
                  learningValue > 40 ? "bg-amber-50 text-amber-700 border-amber-200" : 
                  "bg-blue-50 text-blue-700 border-blue-200"
                }`}
              >
                {learningValue}% valoare învățare
              </Badge>
            </div>
            
            <div className="mt-1 text-xs text-muted-foreground">
              {learningValue > 75 ? (
                "Feedback complex și detaliat care va accelera semnificativ evoluția sistemului autonom"
              ) : learningValue > 40 ? (
                "Feedback util cu informații concrete pentru îmbunătățirea sistemului autonom"
              ) : (
                "Feedback de bază care va contribui la menținerea performanței sistemului"
              )}
            </div>
          </div>
        )}
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
