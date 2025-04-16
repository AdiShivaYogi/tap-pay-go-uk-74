
import React from "react";
import { Code } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProposalsListProps {
  proposals: any[];
  selectedProposalId: string | null;
  onSelectProposal: (proposal: any) => void;
}

export const ProposalsList = ({ 
  proposals,
  selectedProposalId,
  onSelectProposal 
}: ProposalsListProps) => {
  if (proposals.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          Nu există propuneri de cod în așteptare de la agenți.
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-2 pr-2">
      {proposals.map((proposal) => (
        <div 
          key={proposal.id}
          className={`p-3 border rounded-md cursor-pointer transition-colors ${
            selectedProposalId === proposal.id 
            ? "bg-primary/10 border-primary/30" 
            : "hover:bg-muted"
          }`}
          onClick={() => onSelectProposal(proposal)}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Code size={16} />
              <span className="font-medium truncate max-w-[200px]">
                {JSON.parse(proposal.proposed_files).join(', ')}
              </span>
            </div>
            <Badge variant="outline">{proposal.agent_id}</Badge>
          </div>
          
          <p className="text-xs text-muted-foreground mt-1 truncate">
            {proposal.created_at ? new Date(proposal.created_at).toLocaleString() : "Data necunoscută"}
          </p>
        </div>
      ))}
    </div>
  );
};
