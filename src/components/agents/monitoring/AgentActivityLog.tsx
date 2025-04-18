
import React from "react";
import { ActivityLog } from "./hooks";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle, Circle, Clock, Code, MessageSquare, AlertTriangle, Zap, Brain } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AgentActivityLogProps {
  logs: ActivityLog[];
  isLoading: boolean;
  filter: string | null;
}

export const AgentActivityLog: React.FC<AgentActivityLogProps> = ({
  logs,
  isLoading,
  filter
}) => {
  // Filtrează log-urile în funcție de categorie dacă avem un filtru activ
  const filteredLogs = filter 
    ? logs.filter(log => log.category === filter)
    : logs;

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex gap-3 items-start">
            <Skeleton className="h-6 w-6 rounded-full" />
            <div className="space-y-2 w-full">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Grupează log-urile după oră pentru o vizualizare mai clară
  const groupedLogs: Record<string, ActivityLog[]> = {};
  filteredLogs.forEach(log => {
    const hour = new Date(log.timestamp).toLocaleTimeString([], { 
      hour: '2-digit',
      minute: '2-digit'
    });
    if (!groupedLogs[hour]) {
      groupedLogs[hour] = [];
    }
    groupedLogs[hour].push(log);
  });

  // Iconița corespunzătoare categoriei
  const getIconForCategory = (category: string) => {
    switch (category) {
      case 'task':
        return <CheckCircle className="h-4 w-4 text-primary" />;
      case 'proposal':
        return <Code className="h-4 w-4 text-green-500" />;
      case 'conversation':
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case 'monitoring':
        return <AlertTriangle className="h-4 w-4 text-blue-500" />;
      case 'learning':
        return <Brain className="h-4 w-4 text-amber-500" />;
      case 'autonomy':
        return <Zap className="h-4 w-4 text-amber-500" />;
      default:
        return <Circle className="h-4 w-4 text-muted-foreground" />;
    }
  };
  
  // Determinăm dacă o activitate a fost executată autonom (simulare)
  const isAutonomousAction = (log: ActivityLog) => {
    // În mod real, acest lucru ar fi determinat de date reale din log
    // Pentru demonstrație, presupunem că anumite categorii de activități sunt mai probabil autonome
    return log.category === 'learning' || log.category === 'autonomy' || 
      (log.category === 'task' && Math.random() > 0.5);
  };

  if (Object.entries(groupedLogs).length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[300px] text-center p-4">
        <AlertTriangle className="h-12 w-12 text-muted-foreground mb-4 opacity-30" />
        <h3 className="font-medium mb-2">Nicio activitate înregistrată</h3>
        <p className="text-sm text-muted-foreground max-w-md">
          {filter 
            ? `Nu s-au găsit activități pentru categoria "${filter}". Încearcă să selectezi altă categorie sau generează activități de test.`
            : `Agenții nu au înregistrat activități încă. Folosește modul de testare pentru a genera activități demonstrative.`
          }
        </p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[350px] pr-4">
      {Object.entries(groupedLogs).map(([hour, hourLogs]) => (
        <div key={hour} className="mb-4">
          <div className="flex items-center gap-2 sticky top-0 bg-background py-1 z-10">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">{hour}</span>
          </div>
          <div className="space-y-3 pl-4 border-l ml-2">
            {hourLogs.map(log => (
              <div key={log.id} className="relative">
                <div className="absolute -left-[17px] mt-1.5 w-3 h-3 rounded-full bg-background border-2 border-primary" />
                <div className="mb-1 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{log.agentName}</span>
                    <span className="text-xs text-muted-foreground">{log.agentId}</span>
                  </div>
                  {isAutonomousAction(log) && (
                    <Badge variant="outline" className="bg-amber-50 border-amber-200 text-amber-700 text-xs">
                      <Zap className="h-3 w-3 mr-1" />
                      Execuție autonomă
                    </Badge>
                  )}
                </div>
                <p className="text-sm">{log.action}</p>
                <div className="mt-1 flex items-center gap-2">
                  {getIconForCategory(log.category)}
                  <span className="text-xs capitalize">{log.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </ScrollArea>
  );
};
