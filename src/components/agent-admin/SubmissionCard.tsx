
import React from "react";
import { StyledCard } from "@/components/ui/cards";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, CalendarClock, MessagesSquare, CheckCircle2, AlertTriangle } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { Separator } from "@/components/ui/separator";

interface SubmissionCardProps {
  submission: any;
  onApprove: (submissionId: string) => Promise<void>;
  onReject: (submissionId: string) => Promise<void>;
}

export const SubmissionCard = ({ submission, onApprove, onReject }: SubmissionCardProps) => {
  const createdDate = new Date(submission.created_at).toLocaleDateString('ro-RO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  
  const createdTime = new Date(submission.created_at).toLocaleTimeString('ro-RO', {
    hour: '2-digit',
    minute: '2-digit'
  });
  
  return (
    <StyledCard key={submission.id} className="border-primary/10">
      <div className="p-4">
        {/* Header cu informații de bază */}
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-medium text-lg">{submission.roadmap_tasks?.title}</h3>
            <p className="text-sm text-muted-foreground">{submission.roadmap_tasks?.description}</p>
          </div>
          
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-2 mb-1">
              <StatusBadge status={submission.roadmap_tasks?.status} />
              <ChevronRight className="h-4 w-4" />
              <StatusBadge status={submission.proposed_status} />
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <CalendarClock className="h-3 w-3 mr-1" />
              <span>{createdDate}, {createdTime}</span>
            </div>
          </div>
        </div>
        
        <Separator className="my-3" />
        
        {/* Secțiunea de progres */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <Badge variant="outline" className="bg-primary/5">
              Categoria: {submission.roadmap_tasks?.category}
            </Badge>
            <div className="flex items-center gap-1">
              <span className="text-sm">Progres actual:</span>
              <span className="text-sm font-medium">{submission.roadmap_tasks?.progress || 0}%</span>
              <span className="text-sm mx-1">→</span>
              <span className="text-sm font-medium text-primary">{submission.proposed_progress}%</span>
            </div>
          </div>
          
          <div className="relative h-2 mt-2">
            <Progress value={submission.roadmap_tasks?.progress || 0} className="h-2" />
            <div 
              className="absolute top-0 h-2 bg-primary/30" 
              style={{ 
                width: `${submission.proposed_progress - (submission.roadmap_tasks?.progress || 0)}%`,
                left: `${submission.roadmap_tasks?.progress || 0}%` 
              }}
            ></div>
          </div>
        </div>
        
        {/* Secțiunea de modificări propuse */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <MessagesSquare className="h-4 w-4 text-primary/70" />
            <h4 className="font-medium text-sm">Modificări propuse:</h4>
          </div>
          <div className="p-3 bg-muted rounded-md border border-muted-foreground/10">
            <p className="text-sm whitespace-pre-line">{submission.proposed_changes}</p>
          </div>
        </div>
        
        {/* Secțiunea de impact și beneficii (dacă există note) */}
        {submission.notes && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="h-4 w-4 text-primary/70" />
              <h4 className="font-medium text-sm">Impact și beneficii:</h4>
            </div>
            <div className="p-3 bg-primary/5 rounded-md border border-primary/10">
              <p className="text-sm italic">{submission.notes}</p>
            </div>
          </div>
        )}
        
        {/* Secțiunea de avertisment (opțional, în funcție de tipul schimbării) */}
        {submission.proposed_status === 'completed' && (
          <div className="mb-4 p-3 bg-yellow-50 rounded-md border border-yellow-200 flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
            <p className="text-sm text-yellow-700">
              Această propunere va marca task-ul ca fiind complet finalizat.
            </p>
          </div>
        )}
        
        {/* Secțiunea de acțiuni */}
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
