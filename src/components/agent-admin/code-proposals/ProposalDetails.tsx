
import React from "react";
import { Badge } from "@/components/ui/badge";
import { CodeViewer } from "./CodeViewer";

interface ProposalDetailsProps {
  proposal: any;
  rejectionReason: string;
  setRejectionReason: (reason: string) => void;
  onApprove: (id: string) => Promise<void>;
  onReject: (id: string, reason?: string) => Promise<void>;
}

export const ProposalDetails = ({ 
  proposal,
  rejectionReason,
  setRejectionReason,
  onApprove,
  onReject 
}: ProposalDetailsProps) => {
  if (!proposal) {
    return <EmptyState />;
  }
  
  const proposedFiles = JSON.parse(proposal.proposed_files);
  const proposedCode = JSON.parse(proposal.proposed_code);
  
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">Propunere de la agentul {proposal.agent_id}</h3>
        <p className="text-sm text-muted-foreground">
          Creată la {new Date(proposal.created_at).toLocaleString()}
        </p>
      </div>
      
      <div>
        <h4 className="text-sm font-medium mb-1">Motivație:</h4>
        <p className="text-sm p-3 bg-muted rounded-md">{proposal.motivation}</p>
      </div>
      
      <div>
        <h4 className="text-sm font-medium mb-1">Fișiere propuse ({proposedFiles.length}):</h4>
        <div className="flex flex-wrap gap-2">
          {proposedFiles.map((file: string, index: number) => (
            <Badge key={index} variant="outline">{file}</Badge>
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-medium mb-1">Cod propus:</h4>
        <CodeViewer proposedFiles={proposedFiles} proposedCode={proposedCode} />
      </div>
      
      <ActionButtons 
        proposalId={proposal.id}
        rejectionReason={rejectionReason}
        setRejectionReason={setRejectionReason}
        onApprove={onApprove}
        onReject={onReject}
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

import { Button } from "@/components/ui/button";
import { Check, X, Code } from "lucide-react";

interface ActionButtonsProps {
  proposalId: string;
  rejectionReason: string;
  setRejectionReason: (reason: string) => void;
  onApprove: (id: string) => Promise<void>;
  onReject: (id: string, reason?: string) => Promise<void>;
}

const ActionButtons = ({ 
  proposalId,
  rejectionReason,
  setRejectionReason,
  onApprove,
  onReject 
}: ActionButtonsProps) => (
  <div className="flex justify-between items-center pt-2">
    <div className="flex-1 mr-2">
      <input
        type="text"
        placeholder="Motiv respingere (opțional)"
        className="w-full p-2 text-sm border rounded-md"
        value={rejectionReason}
        onChange={(e) => setRejectionReason(e.target.value)}
      />
    </div>
    
    <div className="flex gap-2">
      <Button 
        variant="outline" 
        size="sm"
        className="flex items-center gap-1"
        onClick={() => {
          onReject(proposalId, rejectionReason);
        }}
      >
        <X size={16} />
        Respinge
      </Button>
      
      <Button 
        size="sm"
        className="flex items-center gap-1"
        onClick={() => onApprove(proposalId)}
      >
        <Check size={16} />
        Aprobă
      </Button>
    </div>
  </div>
);
