
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ReportItem } from "./ReportItem";
import { LearningReport } from "../hooks/types/agent-monitoring.types";
import { Brain, Zap } from "lucide-react";

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
  const getAverageEfficiency = () => {
    if (!reports.length) return 0;
    
    // Calculăm eficiența pe baza duratei și a conceptelor învățate
    const scores = reports.map(report => {
      const baseScore = report.conceptsLearned.length * 10;
      const durationPenalty = Math.min(report.duration / 10, 40);
      return Math.min(Math.max(baseScore - durationPenalty, 10), 100);
    });
    
    return Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
  };
  
  if (!reports.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Brain className="h-12 w-12 text-muted-foreground opacity-20 mb-4" />
        <h3 className="font-medium mb-1">Niciun raport de învățare disponibil</h3>
        <p className="text-sm text-muted-foreground max-w-xs">
          Rapoartele de auto-îmbunătățire vor apărea aici când agenții vor finaliza procese de învățare autonomă.
        </p>
      </div>
    );
  }

  const averageEfficiency = getAverageEfficiency();

  return (
    <>
      <div className="mb-4 p-3 bg-amber-50/40 border border-amber-200 rounded-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-amber-500" />
            <h3 className="font-medium">Performanță Auto-Îmbunătățire</h3>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-sm">Sănătate:</span>
            <span className={`font-medium ${
              averageEfficiency > 70 ? "text-green-600" : 
              averageEfficiency > 40 ? "text-amber-600" : 
              "text-red-600"
            }`}>
              {averageEfficiency}%
            </span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {averageEfficiency > 70 
            ? "Procesele de auto-îmbunătățire funcționează la capacitate optimă" 
            : averageEfficiency > 40 
              ? "Procesele de auto-îmbunătățire sunt funcționale dar pot fi optimizate"
              : "Procesele de auto-îmbunătățire necesită atenție și optimizare"}
        </p>
      </div>
      
      <ScrollArea className="max-h-[350px] pr-4">
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
    </>
  );
};
