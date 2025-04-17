
import React, { useState, useEffect } from "react";
import { StyledCard, StyledCardHeader, StyledCardTitle, StyledCardContent } from "@/components/ui/cards";
import { Badge } from "@/components/ui/badge";
import { FileCode, Check, AlertTriangle, BrainCircuit, Zap, Clock, Activity } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface LogEntry {
  time: string;
  agent: string;
  action: string;
  level: "info" | "warning" | "error" | "success";
  code?: string;
  files?: string[];
  impact?: string;
}

export const ActionLog: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  
  // Simulăm actualizarea jurnalului cu noi implementări
  useEffect(() => {
    if (!autoRefresh) return;
    
    const interval = setInterval(() => {
      // În implementarea reală, aici am primi date noi de la server/supabase
      const randomTimeOffset = Math.floor(Math.random() * 60);
      const newDate = new Date();
      newDate.setSeconds(newDate.getSeconds() - randomTimeOffset);
      const newTime = newDate.toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      
      const randomLogs = [
        { 
          time: newTime, 
          agent: "AgentOptimizare", 
          action: "Optimizare algoritm de sortare finalizată în utils/sorting.ts", 
          level: "success", 
          files: ["src/utils/sorting.ts", "src/components/data/SortableList.tsx"],
          code: "function quickSort<T>(arr: T[], compareFn: (a: T, b: T) => number): T[] {\n  // Implementare optimizată...\n}",
          impact: "Reducere cu 30% a timpului de procesare"
        },
        { 
          time: newTime, 
          agent: "AgentSecuritate", 
          action: "Implementare verificare token JWT adăugată în AuthProvider", 
          level: "success",
          files: ["src/providers/AuthProvider.tsx"],
          code: "const validateToken = (token: string): boolean => {\n  // Logica îmbunătățită de validare\n}",
          impact: "Securitate îmbunătățită pentru toate rutele protejate"
        },
        { 
          time: newTime, 
          agent: "AgentRefactorizare", 
          action: "Refactorizare cod pentru refolosirea logicii de filtrare", 
          level: "success",
          files: ["src/hooks/useFilters.ts", "src/components/Filters.tsx"],
          code: "export const useFilters = <T,>(items: T[], filterFn: (item: T) => boolean) => {\n  // Logică centralizată...\n}",
          impact: "Reducere 150 linii de cod duplicat din 4 componente"
        },
        { 
          time: newTime, 
          agent: "AgentUI", 
          action: "Adaptare componente pentru tema întunecată", 
          level: "success",
          files: ["src/components/ui/theme-constants.ts", "src/components/ui/cards/styled-card.tsx"],
          code: "export const darkThemeVariables = {\n  primary: '#6b8afd',\n  // Alte variabile...\n};",
          impact: "Suport complet pentru temă întunecată în toate componentele"
        }
      ];
      
      const randomIndex = Math.floor(Math.random() * randomLogs.length);
      
      // Îm implementarea reală, am actualiza starea bazată pe noi date
      // Pentru demonstrație, doar simulăm acest lucru
    }, 15000); // Actualizare la fiecare 15 secunde

    return () => clearInterval(interval);
  }, [autoRefresh]);
  
  const logs: LogEntry[] = [
    { time: "10:32:15", agent: "AgentOptimizare", action: "Implementare model ML optimizat în src/services/ml-service.ts", level: "success", files: ["src/services/ml-service.ts", "src/hooks/useMLPredictions.ts"], code: "export class OptimizedMLModel {\n  // Cod implementare...\n}", impact: "Reducere timp de răspuns cu 40%" },
    { time: "10:28:47", agent: "AgentDate", action: "Integrare API date externe și sincronizare completă", level: "success", files: ["src/api/data-sync.ts"], code: "async function syncExternalData() {\n  // Logică de sincronizare\n}", impact: "Date actualizate în timp real" },
    { time: "10:15:22", agent: "AgentSecuritate", action: "Implementare scanare vulnerabilități în modulul de autentificare", level: "success", files: ["src/security/vulnerability-scanner.ts"], code: "export const scanAuthModule = () => {\n  // Cod scanare\n}", impact: "3 vulnerabilități detectate și corectate" },
    { time: "10:05:18", agent: "AgentInterfață", action: "Verificare propunere UI eșuată - necesită revizuire", level: "warning", files: ["src/components/ui/proposals.tsx"], impact: "Propunerea necesită ajustări manuale" },
    { time: "09:58:33", agent: "AgentHR", action: "Implementare algoritm de evaluare performanță în modulul HR", level: "success", files: ["src/modules/hr/performance-evaluation.ts"], code: "export function evaluatePerformance(metrics) {\n  // Algoritmul implementat\n}", impact: "Evaluări automate pentru toți membrii echipei" },
    { time: "09:45:10", agent: "AgentAsistent", action: "Implementare sistem de răspuns automat în chat", level: "success", files: ["src/features/chat/auto-response.ts"], code: "const generateResponse = (query) => {\n  // Logica de generare\n}", impact: "Timp de răspuns redus cu 70%" },
    { time: "09:32:45", agent: "AgentSecuritate", action: "Detectare și blocarea tentativă acces neautorizat", level: "error", files: ["src/security/access-control.ts"], impact: "Incident securitate prevenit" },
    { time: "09:15:22", agent: "AgentOptimizare", action: "Refactorizare algoritm de planificare resurse", level: "success", files: ["src/algorithms/resource-planning.ts"], code: "function optimizeResourceAllocation() {\n  // Algoritm optimizat\n}", impact: "Eficiență îmbunătățită cu 25%" }
  ];
  
  const filteredLogs = activeFilter 
    ? logs.filter(log => log.agent === activeFilter) 
    : logs;
  
  const agents = Array.from(new Set(logs.map(log => log.agent)));
  
  return (
    <StyledCard className="border-amber-500/30">
      <StyledCardHeader className="flex flex-row items-center justify-between bg-amber-50/30">
        <div>
          <StyledCardTitle className="text-base flex items-center gap-2">
            <Activity className="h-4 w-4 text-amber-500" />
            Jurnal Implementări Auto-Execuție
          </StyledCardTitle>
          <p className="text-xs text-muted-foreground mt-1">
            Implementări în timp real ale agenților autonomi în codul ecosistemului
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={autoRefresh ? "default" : "outline"} 
                className={cn("cursor-pointer", autoRefresh ? "bg-amber-500 hover:bg-amber-600" : "")}
                onClick={() => setAutoRefresh(!autoRefresh)}>
            <Clock className="h-3 w-3 mr-1" />
            {autoRefresh ? "Live" : "Pauză"}
          </Badge>
        </div>
      </StyledCardHeader>
      <StyledCardContent>
        <Tabs defaultValue="all">
          <TabsList className="mb-4 bg-amber-50/30">
            <TabsTrigger value="all" onClick={() => setActiveFilter(null)}>
              Toate
            </TabsTrigger>
            {agents.map(agent => (
              <TabsTrigger 
                key={agent} 
                value={agent} 
                onClick={() => setActiveFilter(agent)}
              >
                {agent.replace('Agent', '')}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
              {filteredLogs.map((log, idx) => (
                <LogEntryItem key={idx} log={log} />
              ))}
            </div>
          </TabsContent>
          
          {agents.map(agent => (
            <TabsContent key={agent} value={agent} className="mt-0">
              <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                {logs.filter(log => log.agent === agent).map((log, idx) => (
                  <LogEntryItem key={idx} log={log} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </StyledCardContent>
    </StyledCard>
  );
};

// Componentă separată pentru fiecare intrare din jurnal
const LogEntryItem: React.FC<{ log: LogEntry }> = ({ log }) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div 
      className={cn("p-3 rounded text-sm transition-all", 
        log.level === "error" ? "bg-red-50 text-red-800 border-l-2 border-red-500" :
        log.level === "warning" ? "bg-amber-50 text-amber-800 border-l-2 border-amber-500" :
        log.level === "success" ? "bg-emerald-50 text-emerald-800 border-l-2 border-emerald-500" :
        "bg-gray-50 border-l-2 border-gray-300",
        expanded ? "shadow-sm" : "",
        "hover:bg-opacity-70 cursor-pointer"
      )}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-muted-foreground">{log.time}</span>
        <Badge variant="outline" className={cn(
          "text-xs",
          log.level === "success" && "bg-emerald-100 text-emerald-800 border-emerald-200",
          log.level === "warning" && "bg-amber-100 text-amber-800 border-amber-200",
          log.level === "error" && "bg-red-100 text-red-800 border-red-200",
        )}>
          {log.agent}
        </Badge>
      </div>
      <p className="mt-1 font-medium">{log.action}</p>
      
      {expanded && log.files && (
        <div className="mt-3 space-y-3 pt-3 border-t border-dashed border-gray-200">
          {log.files.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {log.files.map((file, i) => (
                <Badge key={i} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 flex items-center">
                  <FileCode className="h-3 w-3 mr-1" /> {file}
                </Badge>
              ))}
            </div>
          )}
          
          {log.code && (
            <div className="bg-gray-900 text-gray-100 p-2 rounded text-xs overflow-x-auto font-mono">
              <pre>{log.code}</pre>
            </div>
          )}
          
          {log.impact && (
            <div className="flex items-center text-xs text-muted-foreground">
              <span className="font-medium mr-1">Impact:</span> {log.impact}
            </div>
          )}
          
          <div className="flex items-center justify-end gap-2 text-xs">
            {log.level === "success" && (
              <Badge className="bg-emerald-500 text-xs">
                <Check className="h-3 w-3 mr-1" /> Implementare reușită
              </Badge>
            )}
            {log.level === "warning" && (
              <Badge className="bg-amber-500 text-xs">
                <AlertTriangle className="h-3 w-3 mr-1" /> Necesită atenție
              </Badge>
            )}
            {log.level === "error" && (
              <Badge className="bg-red-500 text-xs">
                <AlertTriangle className="h-3 w-3 mr-1" /> Eroare implementare
              </Badge>
            )}
          </div>
        </div>
      )}
      
      {!expanded && log.impact && (
        <div className="mt-1 flex items-center gap-1 text-xs">
          {log.level === "success" ? (
            <Check className="h-3 w-3 text-emerald-500" />
          ) : log.level === "warning" ? (
            <AlertTriangle className="h-3 w-3 text-amber-500" />
          ) : (
            <BrainCircuit className="h-3 w-3 text-blue-500" />
          )}
          <span className="text-muted-foreground">{log.impact}</span>
        </div>
      )}
    </div>
  );
};
