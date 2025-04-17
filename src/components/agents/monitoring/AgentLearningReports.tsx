
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BrainCircuit, FileText, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useAgentMonitoring } from "./hooks";
import { format } from "date-fns";
import { ro } from "date-fns/locale";

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
  
  if (!learningReports.length) {
    return (
      <Card className="mb-4">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Rapoarte de învățare
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-6">
            Nu există rapoarte de învățare disponibile.
          </p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Rapoarte de învățare ({learningReports.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="max-h-[400px] pr-4">
          <div className="space-y-3">
            {learningReports.map((report) => (
              <Collapsible 
                key={report.id} 
                open={expandedReports.includes(report.id)}
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
                      onClick={() => toggleReportExpand(report.id)}
                      className="p-1 h-auto"
                    >
                      {expandedReports.includes(report.id) ? (
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
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
