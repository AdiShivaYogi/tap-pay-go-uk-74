
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { useAgentMonitoring } from "./hooks";
import { ReportsList } from "./learning/ReportsList";

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
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Rapoarte de învățare ({learningReports.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ReportsList 
          reports={learningReports}
          expandedReports={expandedReports}
          onToggleExpand={toggleReportExpand}
        />
      </CardContent>
    </Card>
  );
};
