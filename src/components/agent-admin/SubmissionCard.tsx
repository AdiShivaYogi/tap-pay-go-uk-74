
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./StatusBadge";
import { Check, X, Brain, FlameKindling } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface SubmissionCardProps {
  submission: any;
  onApprove: (submissionId: string) => Promise<void>;
  onReject: (submissionId: string) => Promise<void>;
  onGenerateFeedback?: () => void;
  isVital?: boolean;
}

export const SubmissionCard = ({ 
  submission,
  onApprove,
  onReject,
  onGenerateFeedback,
  isVital = false
}: SubmissionCardProps) => {
  const [rejectionReason, setRejectionReason] = useState("");
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const taskTitle = submission?.roadmap_tasks?.title || "Task necunoscut";
  const agentId = submission.agent_id || "agent-necunoscut";
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString("ro-RO", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit"
    });
  };
  
  const handleReject = async () => {
    setIsSubmitting(true);
    try {
      await onReject(submission.id);
      setShowRejectDialog(false);
    } catch (error) {
      console.error("Eroare la respingerea propunerii:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleApprove = async () => {
    setIsSubmitting(true);
    try {
      await onApprove(submission.id);
    } catch (error) {
      console.error("Eroare la aprobarea propunerii:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className={`border rounded-lg p-4 relative ${isVital ? 'border-amber-300 bg-amber-50/40' : ''}`}>
      {isVital && (
        <div className="absolute -top-3 -right-2">
          <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200 flex gap-1 items-center">
            <FlameKindling className="h-3 w-3" />
            <span>Propunere vitală</span>
          </Badge>
        </div>
      )}
      
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium mb-1">{taskTitle}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Agent ID: {agentId}</span>
            <span>•</span>
            <span>{formatDate(submission.created_at)}</span>
          </div>
        </div>
        <StatusBadge status={submission.proposed_status} />
      </div>
      
      <div className="mt-4">
        <h4 className="text-sm font-medium mb-2">Progres propus:</h4>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div 
            className="bg-primary h-1.5 rounded-full" 
            style={{ width: `${submission.proposed_progress}%` }}
          ></div>
        </div>
        <span className="text-xs text-right block mt-1">
          {submission.proposed_progress}%
        </span>
      </div>
      
      <div className="mt-3">
        <h4 className="text-sm font-medium mb-1">Modificări propuse:</h4>
        <p className="text-sm text-muted-foreground bg-gray-50 p-2 rounded border whitespace-pre-wrap">
          {submission.proposed_changes}
        </p>
      </div>
      
      <div className="mt-4 flex justify-end gap-3 items-center">
        {onGenerateFeedback && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onGenerateFeedback}
            className="flex items-center gap-1"
          >
            <Brain className="h-3.5 w-3.5" />
            <span>Generează Feedback</span>
          </Button>
        )}
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setShowRejectDialog(true)}
          disabled={isSubmitting}
          className="flex items-center gap-1"
        >
          <X className="h-3.5 w-3.5" />
          <span>Respinge</span>
        </Button>
        
        <Button 
          variant="default" 
          size="sm"
          onClick={handleApprove}
          disabled={isSubmitting}
          className="flex items-center gap-1"
        >
          <Check className="h-3.5 w-3.5" />
          <span>Aprobă</span>
        </Button>
      </div>
      
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Respinge propunerea</DialogTitle>
            <DialogDescription>
              Adaugă un motiv pentru respingerea acestei propuneri.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Label htmlFor="reason">Motiv respingere</Label>
            <Textarea
              id="reason"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Motivul pentru respingerea propunerii..."
              className="mt-2"
            />
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowRejectDialog(false)}
              disabled={isSubmitting}
            >
              Anulează
            </Button>
            <Button 
              variant="destructive"
              onClick={handleReject}
              disabled={isSubmitting}
            >
              Respinge propunerea
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
