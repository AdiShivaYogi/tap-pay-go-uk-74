
import React from "react";
import { BrainCircuit, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { format } from "date-fns";
import { ro } from "date-fns/locale";
import { LearningReport } from "../hooks/types/agent-monitoring.types";

interface ReportItemProps {
  report: LearningReport;
  isExpanded: boolean;
  onToggleExpand: (reportId: string) => void;
}

export const ReportItem: React.FC<ReportItemProps> = ({
  report,
  isExpanded,
  onToggleExpand,
}) => {
  return (
    <Collapsible 
      key={report.id} 
      open={isExpanded}
      className="border rounded-md p-3"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium flex items-center">
            <BrainCircuit className="h-4 w-4 mr-2 text-primary" />
            {report.sourceAgentName} → {report.targetAgentName}
          </h3>
          <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
            <Clock className="h-3 w-3" />
            {format(new Date(report.learningDate), 'PPp', { locale: ro })}
            <span className="mx-1">•</span>
            {report.duration} secunde
          </div>
        </div>
        
        <CollapsibleTrigger asChild>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onToggleExpand(report.id)}
            className="p-1 h-auto"
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </CollapsibleTrigger>
      </div>
      
      <CollapsibleContent className="mt-3 space-y-3 text-sm">
        <div>
          <h4 className="text-sm font-medium mb-1">Tip învățare:</h4>
          <Badge variant="outline">{report.learningType}</Badge>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-1">Concepte învățate:</h4>
          <ul className="list-disc pl-5 space-y-1">
            {report.conceptsLearned.map((concept, idx) => (
              <li key={idx}>{concept}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-1">Sumar:</h4>
          <p className="text-muted-foreground">{report.summary}</p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
