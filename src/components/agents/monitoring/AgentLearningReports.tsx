
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, BrainCircuit } from "lucide-react";
import { useAgentMonitoring } from "./hooks";
import { ReportsList } from "./learning/ReportsList";
import { StyledCard, StyledCardContent, StyledCardHeader, StyledCardTitle } from "@/components/ui/cards";

export const AgentLearningReports: React.FC = () => {
  const { learningReports } = useAgentMonitoring();
  const [expandedReports, setExpandedReports] = useState<string[]>([]);
  
  const toggleReportExpand = (reportId: string) => {
    setExpandedReports(prev => {
      if (prev.includes(reportId)) {
        return prev.filter(id => id !== reportId);
      } else {
        return [...prev, reportId];
      }
    });
  };
  
  return (
    <StyledCard className="mb-4">
      <StyledCardHeader className="pb-3">
        <StyledCardTitle className="text-lg flex items-center gap-2">
          <BrainCircuit className="h-5 w-5 text-amber-500" />
          Rapoarte de Auto-Îmbunătățire ({learningReports.length})
        </StyledCardTitle>
      </StyledCardHeader>
      <StyledCardContent>
        <ReportsList 
          reports={learningReports}
          expandedReports={expandedReports}
          onToggleExpand={toggleReportExpand}
        />
      </StyledCardContent>
    </StyledCard>
  );
};
