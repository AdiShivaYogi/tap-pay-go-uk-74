
import React from "react";
import { BrainCircuit, Clock, ChevronDown, ChevronUp, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Progress } from "@/components/ui/progress";
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
  // Calculăm un scor de eficiență bazat pe conceptele învățate și durata procesului
  const getEfficiencyScore = () => {
    const baseScore = report.conceptsLearned.length * 10;
    const durationPenalty = Math.min(report.duration / 10, 40);
    return Math.min(Math.max(baseScore - durationPenalty, 10), 100);
  };
  
  const efficiencyScore = getEfficiencyScore();
  
  return (
    <Collapsible 
      key={report.id} 
      open={isExpanded}
      className="border rounded-md p-3 bg-white dark:bg-slate-900"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium flex items-center">
            <BrainCircuit className="h-4 w-4 mr-2 text-amber-500" />
            {report.sourceAgentName} → {report.targetAgentName}
          </h3>
          <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
            <Clock className="h-3 w-3" />
            {format(new Date(report.learningDate), 'PPp', { locale: ro })}
            <span className="mx-1">•</span>
            {report.duration} secunde
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="text-right">
            <div className="text-xs text-muted-foreground">Auto-Îmbunătățire</div>
            <div className="flex items-center gap-1">
              <span className="font-medium">Eficiență: </span>
              <span className={efficiencyScore > 70 ? "text-green-600" : efficiencyScore > 40 ? "text-amber-600" : "text-red-500"}>
                {efficiencyScore}%
              </span>
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
      </div>
      
      <CollapsibleContent className="mt-3 space-y-3 text-sm">
        <div>
          <h4 className="text-sm font-medium mb-1">Tip învățare:</h4>
          <Badge variant="outline" className="bg-amber-50">{report.learningType}</Badge>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-1">Impact asupra autonomiei:</h4>
          <Progress value={efficiencyScore} className="h-2" />
          <p className="text-xs text-muted-foreground mt-1">
            Acest proces de învățare {efficiencyScore > 60 ? 'îmbunătățește semnificativ' : 'contribuie la'} capacitatea autonomă a agentului
          </p>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-1">Concepte învățate:</h4>
          <ul className="list-disc pl-5 space-y-1">
            {report.conceptsLearned.map((concept, idx) => (
              <li key={idx} className="flex items-start">
                <Zap className="h-3.5 w-3.5 text-amber-500 mt-0.5 mr-1" />
                <span>{concept}</span>
              </li>
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
