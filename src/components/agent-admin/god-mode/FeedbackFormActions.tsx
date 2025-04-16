
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2, CheckSquare, X } from "lucide-react";

interface FeedbackFormActionsProps {
  feedback: string;
  isProcessing: boolean;
  isGeneratingFeedback: boolean;
  isGodModeEnabled: boolean;
  onSubmit: () => Promise<void>;
  onCancel: () => void;
}

export const FeedbackFormActions = ({
  feedback,
  isProcessing,
  isGeneratingFeedback,
  isGodModeEnabled,
  onSubmit,
  onCancel
}: FeedbackFormActionsProps) => {
  return (
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
  );
};
