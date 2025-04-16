
import React from "react";
import { StyledCard } from "@/components/ui/cards";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChevronRight } from "lucide-react";
import { StatusBadge } from "./StatusBadge";

interface SubmissionCardProps {
  submission: any;
  onApprove: (submissionId: string) => Promise<void>;
  onReject: (submissionId: string) => Promise<void>;
}

export const SubmissionCard = ({ submission, onApprove, onReject }: SubmissionCardProps) => {
  return (
    <StyledCard key={submission.id} className="border-primary/10">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-lg">{submission.roadmap_tasks?.title}</h3>
            <p className="text-sm text-muted-foreground">{submission.roadmap_tasks?.description}</p>
          </div>
          
          <div className="flex items-center gap-2">
            <StatusBadge status={submission.roadmap_tasks?.status} />
            <ChevronRight className="h-4 w-4" />
            <StatusBadge status={submission.proposed_status} />
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm">Progres curent: {submission.roadmap_tasks?.progress || 0}%</span>
            <span className="text-sm font-medium">Propus: {submission.proposed_progress}%</span>
          </div>
          
          <div className="relative h-2">
            <Progress value={submission.roadmap_tasks?.progress || 0} className="h-2" />
            <div 
              className="absolute top-0 h-2 bg-primary/30" 
              style={{ 
                width: `${submission.proposed_progress}%`,
                left: `${submission.roadmap_tasks?.progress || 0}%` 
              }}
            ></div>
          </div>
        </div>
        
        <div className="mt-4">
          <h4 className="font-medium text-sm mb-1">Modificări propuse:</h4>
          <p className="text-sm p-3 bg-muted rounded-md">{submission.proposed_changes}</p>
        </div>
        
        {submission.notes && (
          <div className="mt-3">
            <h4 className="font-medium text-sm mb-1">Note:</h4>
            <p className="text-sm italic text-muted-foreground">{submission.notes}</p>
          </div>
        )}
        
        <div className="mt-4 flex justify-end gap-3">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onReject(submission.id)}
          >
            Respinge
          </Button>
          
          <Button 
            size="sm"
            onClick={() => onApprove(submission.id)}
          >
            Aprobă
          </Button>
        </div>
      </div>
    </StyledCard>
  );
};
