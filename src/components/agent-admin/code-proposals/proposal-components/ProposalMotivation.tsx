
import React from "react";
import { FileCode } from "lucide-react";

interface ProposalMotivationProps {
  motivation: string;
}

export const ProposalMotivation = ({ motivation }: ProposalMotivationProps) => {
  return (
    <div>
      <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
        <FileCode className="h-4 w-4 text-primary/70" /> 
        Motivație propunere:
      </h4>
      <div className="p-3 bg-muted rounded-md border border-muted-foreground/10">
        <p className="text-sm whitespace-pre-line">{motivation}</p>
      </div>
    </div>
  );
};
