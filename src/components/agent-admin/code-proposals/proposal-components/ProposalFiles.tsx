
import React from "react";
import { Badge } from "@/components/ui/badge";

interface ProposalFilesProps {
  files: string[];
}

export const ProposalFiles = ({ files }: ProposalFilesProps) => {
  return (
    <div>
      <h4 className="text-sm font-medium mb-2">Fișiere propuse ({files.length}):</h4>
      <div className="flex flex-wrap gap-2 mb-2">
        {files.map((file: string, index: number) => (
          <Badge key={index} variant="outline" className="bg-primary/5 text-xs px-2 py-1">
            {file}
          </Badge>
        ))}
      </div>
    </div>
  );
};
