
import React from "react";
import { StyledCard, StyledCardHeader, StyledCardTitle, StyledCardContent } from "@/components/ui/cards";
import { SubmissionCard } from "./SubmissionCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Brain, Sparkles, FlameKindling } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SubmissionsTabProps {
  submissions: any[];
  onApproveSubmission: (submissionId: string) => Promise<void>;
  onRejectSubmission: (submissionId: string) => Promise<void>;
  loading?: boolean;
  onGenerateFeedback?: (type: "submission", item: any) => Promise<void>;
}

export const SubmissionsTab = ({ 
  submissions,
  onApproveSubmission,
  onRejectSubmission,
  onGenerateFeedback,
  loading = false
}: SubmissionsTabProps) => {
  if (loading) {
    return <LoadingSubmissions />;
  }
  
  // Sortăm propunerile - cele vitale primele
  const sortedSubmissions = [...submissions].sort((a, b) => {
    const aIsVital = isVitalSubmission(a);
    const bIsVital = isVitalSubmission(b);
    
    if (aIsVital && !bIsVital) return -1;
    if (!aIsVital && bIsVital) return 1;
    
    // Dacă ambele sunt vitale sau niciuna nu este, sortăm după dată
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });
  
  // Funcție pentru a determina dacă o propunere este vitală
  function isVitalSubmission(submission: any): boolean {
    const changeText = (submission.proposed_changes || "").toLowerCase();
    return (
      changeText.includes("vital") || 
      changeText.includes("critic") || 
      changeText.includes("esențial") ||
      changeText.includes("important") ||
      changeText.includes("prioritate")
    );
  }
  
  // Numărul de propuneri vitale
  const vitalCount = sortedSubmissions.filter(isVitalSubmission).length;

  return (
    <StyledCard>
      <StyledCardHeader className="flex flex-row items-center justify-between">
        <div>
          <StyledCardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Propuneri de la agenți în așteptarea aprobării
          </StyledCardTitle>
          {vitalCount > 0 && (
            <div className="mt-1 flex items-center">
              <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200 flex gap-1 items-center">
                <FlameKindling className="h-3 w-3" />
                <span>{vitalCount} propuneri vitale pentru ecosistem</span>
              </Badge>
            </div>
          )}
        </div>
        
        <Button 
          variant="outline" 
          size="sm"
          className="flex items-center gap-1"
          onClick={() => {
            // Aprobă toate propunerile vitale
            sortedSubmissions
              .filter(isVitalSubmission)
              .forEach(sub => onApproveSubmission(sub.id));
          }}
          disabled={vitalCount === 0}
        >
          <Brain className="h-3.5 w-3.5" />
          <span>Aprobă toate propunerile vitale</span>
        </Button>
      </StyledCardHeader>
      
      <StyledCardContent>
        {sortedSubmissions.length > 0 ? (
          <div className="space-y-4">
            {sortedSubmissions.map((submission) => (
              <SubmissionCard
                key={submission.id}
                submission={submission}
                onApprove={onApproveSubmission}
                onReject={onRejectSubmission}
                onGenerateFeedback={onGenerateFeedback ? () => onGenerateFeedback("submission", submission) : undefined}
                isVital={isVitalSubmission(submission)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Nu există propuneri în așteptare de la agenți.
            </p>
          </div>
        )}
      </StyledCardContent>
    </StyledCard>
  );
};

const LoadingSubmissions = () => (
  <StyledCard>
    <StyledCardHeader>
      <Skeleton className="h-6 w-3/4" />
    </StyledCardHeader>
    
    <StyledCardContent>
      <div className="space-y-4">
        {[1, 2, 3].map((index) => (
          <div key={index} className="border rounded-md p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <Skeleton className="h-5 w-40 mb-2" />
                <Skeleton className="h-3 w-60" />
              </div>
              <div>
                <Skeleton className="h-5 w-20" />
              </div>
            </div>
            <div className="mb-4">
              <Skeleton className="h-2 w-full rounded-md" />
            </div>
            <div className="mb-3">
              <Skeleton className="h-4 w-32 mb-1" />
              <Skeleton className="h-16 w-full rounded-md" />
            </div>
            <div className="flex justify-end gap-3">
              <Skeleton className="h-9 w-20" />
              <Skeleton className="h-9 w-20" />
            </div>
          </div>
        ))}
      </div>
    </StyledCardContent>
  </StyledCard>
);

export default SubmissionsTab;
