
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ReportItem } from "./ReportItem";
import { LearningReport } from "../hooks/types/agent-monitoring.types";

interface ReportsListProps {
  reports: LearningReport[];
  expandedReports: string[];
  onToggleExpand: (reportId: string) => void;
}

export const ReportsList: React.FC<ReportsListProps> = ({
  reports,
  expandedReports,
  onToggleExpand
}) => {
  if (!reports.length) {
    return (
      <p className="text-muted-foreground text-center py-6">
        Nu există rapoarte de învățare disponibile.
      </p>
    );
  }

  return (
    <ScrollArea className="max-h-[400px] pr-4">
      <div className="space-y-3">
        {reports.map((report) => (
          <ReportItem 
            key={report.id}
            report={report} 
            isExpanded={expandedReports.includes(report.id)}
            onToggleExpand={onToggleExpand}
          />
        ))}
      </div>
    </ScrollArea>
  );
};
