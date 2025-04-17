
import React from "react";
import { StyledCard, StyledCardHeader, StyledCardTitle, StyledCardContent } from "@/components/ui/cards";
import { Badge } from "@/components/ui/badge";

interface LogEntry {
  time: string;
  agent: string;
  action: string;
  level: "info" | "warning" | "error";
}

export const ActionLog: React.FC = () => {
  const logs: LogEntry[] = [
    { time: "10:32:15", agent: "AgentOptimizare", action: "Optimizare model ML completată", level: "info" },
    { time: "10:28:47", agent: "AgentDate", action: "Sincrnonizare date finalizată", level: "info" },
    { time: "10:15:22", agent: "AgentSecuritate", action: "Scanare vulnerabilități completată", level: "info" },
    { time: "10:05:18", agent: "AgentInterfață", action: "Verificare propunere UI eșuată - necesită revizuire", level: "warning" },
    { time: "09:58:33", agent: "AgentHR", action: "Analiză performanță lunară generată", level: "info" },
    { time: "09:45:10", agent: "AgentAsistent", action: "Răspuns automat generat", level: "info" },
    { time: "09:32:45", agent: "AgentSecuritate", action: "Detectare tentativă acces neautorizat", level: "error" },
    { time: "09:15:22", agent: "AgentOptimizare", action: "Planificare resurse completată", level: "info" }
  ];
  
  return (
    <StyledCard>
      <StyledCardHeader>
        <StyledCardTitle className="text-base">Jurnal Acțiuni Auto-Execuție</StyledCardTitle>
      </StyledCardHeader>
      <StyledCardContent>
        <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
          {logs.map((log, idx) => (
            <div key={idx} className={`p-2 rounded text-sm ${
              log.level === "error" ? "bg-red-50 text-red-800" :
              log.level === "warning" ? "bg-amber-50 text-amber-800" :
              "bg-gray-50"
            }`}>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-muted-foreground">{log.time}</span>
                <Badge variant="outline" className="text-xs">{log.agent}</Badge>
              </div>
              <p className="mt-1">{log.action}</p>
            </div>
          ))}
        </div>
      </StyledCardContent>
    </StyledCard>
  );
};
