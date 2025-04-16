
import React from "react";
import { Badge } from "@/components/ui/badge";
import { CodeViewer } from "./CodeViewer";
import { Button } from "@/components/ui/button";
import { Check, X, Code, Loader2, Calendar, Clock, FileCode, Brain } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { LoadingIndicator } from "@/components/admin-auth/LoadingIndicator";
import { Separator } from "@/components/ui/separator";

interface ProposalDetailsProps {
  proposal: any;
  rejectionReason: string;
  setRejectionReason: (reason: string) => void;
  onApprove: (id: string) => Promise<void>;
  onReject: (id: string, reason?: string) => Promise<void>;
  onGenerateFeedback?: () => void;
  isSubmitting?: boolean;
  loading?: boolean;
}

export const ProposalDetails = ({ 
  proposal,
  rejectionReason,
  setRejectionReason,
  onApprove,
  onReject,
  onGenerateFeedback,
  isSubmitting = false,
  loading = false
}: ProposalDetailsProps) => {
  if (loading) {
    return <LoadingProposalDetails />;
  }
  
  if (!proposal) {
    return <EmptyState />;
  }
  
  const formattedDate = new Date(proposal.created_at).toLocaleDateString('ro-RO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  
  const formattedTime = new Date(proposal.created_at).toLocaleTimeString('ro-RO', {
    hour: '2-digit',
    minute: '2-digit'
  });
  
  const proposedFiles = JSON.parse(proposal.proposed_files);
  const proposedCode = JSON.parse(proposal.proposed_code);
  
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Code className="h-5 w-5 text-primary" />
            Propunere de la agentul {proposal.agent_id}
          </h3>
          <p className="text-sm text-muted-foreground flex items-center mt-1">
            <Calendar className="h-3.5 w-3.5 mr-1" />
            {formattedDate}
            <Clock className="h-3.5 w-3.5 ml-3 mr-1" />
            {formattedTime}
          </p>
        </div>
        
        <Badge variant="outline" className="bg-primary/5 border-primary/20">
          {proposedFiles.length} fișiere
        </Badge>
      </div>
      
      <Separator />
      
      {/* Motivație */}
      <div>
        <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
          <FileCode className="h-4 w-4 text-primary/70" /> 
          Motivație propunere:
        </h4>
        <div className="p-3 bg-muted rounded-md border border-muted-foreground/10">
          <p className="text-sm whitespace-pre-line">{proposal.motivation}</p>
        </div>
      </div>
      
      {/* Fișiere propuse */}
      <div>
        <h4 className="text-sm font-medium mb-2">Fișiere propuse ({proposedFiles.length}):</h4>
        <div className="flex flex-wrap gap-2 mb-2">
          {proposedFiles.map((file: string, index: number) => (
            <Badge key={index} variant="outline" className="bg-primary/5 text-xs px-2 py-1">
              {file}
            </Badge>
          ))}
        </div>
      </div>
      
      {/* Cod propus */}
      <div>
        <h4 className="text-sm font-medium mb-2">Cod propus:</h4>
        <div className="border rounded-md overflow-hidden">
          <CodeViewer proposedFiles={proposedFiles} proposedCode={proposedCode} />
        </div>
      </div>
      
      <Separator />
      
      <ActionButtons 
        proposalId={proposal.id}
        rejectionReason={rejectionReason}
        setRejectionReason={setRejectionReason}
        onApprove={onApprove}
        onReject={onReject}
        onGenerateFeedback={onGenerateFeedback}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

const EmptyState = () => (
  <div className="text-center py-12">
    <Code size={32} className="mx-auto mb-3 text-muted-foreground/50" />
    <p className="text-muted-foreground">
      Selectați o propunere de cod pentru a vedea detaliile.
    </p>
  </div>
);

const LoadingProposalDetails = () => (
  <div className="space-y-4">
    <div>
      <Skeleton className="h-6 w-64 mb-2" />
      <Skeleton className="h-4 w-40" />
    </div>
    
    <Skeleton className="h-px w-full my-4" />
    
    <div>
      <Skeleton className="h-4 w-24 mb-1" />
      <Skeleton className="h-20 w-full rounded-md" />
    </div>
    
    <div>
      <Skeleton className="h-4 w-32 mb-1" />
      <div className="flex flex-wrap gap-2">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-6 w-20 rounded-full" />
        ))}
      </div>
    </div>
    
    <div>
      <Skeleton className="h-4 w-20 mb-1" />
      <Skeleton className="h-[300px] w-full rounded-md" />
    </div>
  </div>
);

interface ActionButtonsProps {
  proposalId: string;
  rejectionReason: string;
  setRejectionReason: (reason: string) => void;
  onApprove: (id: string) => Promise<void>;
  onReject: (id: string, reason?: string) => Promise<void>;
  onGenerateFeedback?: () => void;
  isSubmitting: boolean;
}

const ActionButtons = ({ 
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

export { ActionButtons };
