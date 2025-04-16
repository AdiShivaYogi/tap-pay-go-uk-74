
import React from "react";
import { Button } from "@/components/ui/button";
import { Check, X, Loader2, Brain } from "lucide-react";

interface ActionButtonsProps {
  proposalId: string;
  rejectionReason: string;
  setRejectionReason: (reason: string) => void;
  onApprove: (id: string) => Promise<void>;
  onReject: (id: string, reason?: string) => Promise<void>;
  onGenerateFeedback?: () => void;
  isSubmitting: boolean;
}

export const ActionButtons = ({ 
  proposalId,
  rejectionReason,
  setRejectionReason,
  onApprove,
  onReject,
  onGenerateFeedback,
  isSubmitting
}: ActionButtonsProps) => (
  <div className="flex justify-between items-center pt-2">
    <div className="flex-1 mr-2">
      <input
        type="text"
        placeholder="Motiv respingere (opțional)"
        className="w-full p-2 text-sm border rounded-md"
        value={rejectionReason}
        onChange={(e) => setRejectionReason(e.target.value)}
        disabled={isSubmitting}
      />
    </div>
    
    <div className="flex gap-2">
      <Button 
        variant="outline" 
        size="sm"
        className="flex items-center gap-1"
        onClick={() => onReject(proposalId, rejectionReason)}
        disabled={isSubmitting}
      >
        {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <X size={16} />}
        Respinge
      </Button>
      
      {onGenerateFeedback && (
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
          onClick={onGenerateFeedback}
          disabled={isSubmitting}
        >
          <Brain size={16} />
          Feedback
        </Button>
      )}
      
      <Button 
        size="sm"
        className="flex items-center gap-1"
        onClick={() => onApprove(proposalId)}
        disabled={isSubmitting}
      >
        {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
        Aprobă
      </Button>
    </div>
  </div>
);
