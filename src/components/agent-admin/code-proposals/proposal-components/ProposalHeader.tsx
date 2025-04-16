
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Code } from "lucide-react";

interface ProposalHeaderProps {
  proposal: any;
}

export const ProposalHeader = ({ proposal }: ProposalHeaderProps) => {
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
  
  return (
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
  );
};
