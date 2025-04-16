
import React from "react";
import { Code, Calendar, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

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
      {proposals.map((proposal) => {
        const proposedFiles = JSON.parse(proposal.proposed_files);
        const formattedDate = new Date(proposal.created_at).toLocaleDateString('ro-RO', {
          day: 'numeric',
          month: 'short'
        });
        
        return (
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
                <Code size={16} className="text-primary" />
                <span className="font-medium truncate max-w-[200px]">
                  {proposedFiles[0]}
                </span>
                {proposedFiles.length > 1 && (
                  <Badge variant="outline" className="text-xs">
                    +{proposedFiles.length - 1}
                  </Badge>
                )}
              </div>
              <Badge variant="outline" className="bg-primary/5 text-xs">
                {proposal.agent_id}
              </Badge>
            </div>
            
            <div className="mt-2 flex justify-between items-center">
              <div className="flex items-center text-xs text-muted-foreground">
                <Calendar size={12} className="mr-1" />
                {formattedDate}
              </div>
              
              {selectedProposalId === proposal.id && (
                <ArrowRight size={12} className="text-primary" />
              )}
            </div>
            
            <Separator className="mt-2 opacity-30" />
            
            <div className="mt-2 text-xs text-muted-foreground line-clamp-1">
              {proposal.motivation}
            </div>
          </div>
        );
      })}
    </div>
  );
};
