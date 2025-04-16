
import React from "react";
import { Brain, X, Check, Crown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface FeedbackFormProps {
  feedbackType: "submission" | "proposal" | null;
  currentSubmission: any | null;
  currentProposal: any | null;
  feedback: string;
  isGeneratingFeedback: boolean;
  isProcessing: boolean;
  isGodModeEnabled: boolean;
  onFeedbackChange: (value: string) => void;
  onSubmit: () => void;
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
  onFeedbackChange,
  onSubmit,
  onCancel
}: FeedbackFormProps) => {
  
  if (!feedbackType) return null;

  return (
    <div className="mt-4 space-y-4 border rounded-lg p-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">
          {feedbackType === "submission" 
            ? "Feedback pentru propunere task" 
            : "Feedback pentru propunere cod"}
        </h3>
        <Badge variant="outline" className="flex items-center gap-1">
          <Brain className="h-3.5 w-3.5" />
          {feedbackType === "submission" 
            ? currentSubmission?.agent_id 
            : currentProposal?.agent_id}
        </Badge>
      </div>
      
      {feedbackType === "submission" && currentSubmission && (
        <div className="text-sm">
          <p><span className="font-medium">Titlu:</span> {currentSubmission?.roadmap_tasks?.title || "N/A"}</p>
          <p><span className="font-medium">Descriere:</span> {currentSubmission?.roadmap_tasks?.description || "N/A"}</p>
          <p><span className="font-medium">Schimbări propuse:</span> {currentSubmission?.proposed_changes}</p>
          <p><span className="font-medium">Progres propus:</span> {currentSubmission?.proposed_progress}%</p>
        </div>
      )}
      
      {feedbackType === "proposal" && currentProposal && (
        <div className="text-sm">
          <p><span className="font-medium">Fișiere propuse:</span> {currentProposal?.proposed_files}</p>
          <p><span className="font-medium">Motivație:</span> {currentProposal?.motivation}</p>
        </div>
      )}
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label htmlFor="feedback" className="text-sm font-medium">
            Feedback pentru agent
          </label>
          {isGeneratingFeedback && <span className="text-xs text-muted-foreground">Generare feedback...</span>}
        </div>
        
        <Textarea
          id="feedback"
          value={feedback}
          onChange={(e) => onFeedbackChange(e.target.value)}
          placeholder="Scrie feedback constructiv pentru îmbunătățirea propunerii..."
          rows={5}
          disabled={isGeneratingFeedback}
        />
      </div>
      
      <div className="flex justify-end gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onCancel}
          disabled={isProcessing}
        >
          <X className="h-4 w-4 mr-1" />
          Anulează
        </Button>
        
        <Button 
          variant={isGodModeEnabled ? "default" : "outline"} 
          size="sm"
          onClick={onSubmit}
          disabled={!feedback || isProcessing}
          className={isGodModeEnabled ? "bg-amber-500 hover:bg-amber-600" : ""}
        >
          {isGodModeEnabled ? (
            <>
              <Crown className="h-4 w-4 mr-1" />
              Trimite feedback și aprobă
            </>
          ) : (
            <>
              <Check className="h-4 w-4 mr-1" />
              Trimite doar feedback
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
