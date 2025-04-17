
import React from "react";
import { ActivityLog } from "./hooks/useAgentMonitoring";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle, Circle, Clock, Code, MessageSquare } from "lucide-react";

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
        return <MessageSquare className="h-4 w-4 text-amber-500" />;
      default:
        return <Circle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <ScrollArea className="h-[350px] pr-4">
      {Object.entries(groupedLogs).length > 0 ? (
        Object.entries(groupedLogs).map(([hour, hourLogs]) => (
          <div key={hour} className="mb-4">
            <div className="flex items-center gap-2 sticky top-0 bg-background py-1 z-10">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground">{hour}</span>
            </div>
            <div className="space-y-3 pl-4 border-l ml-2">
              {hourLogs.map(log => (
                <div key={log.id} className="relative">
                  <div className="absolute -left-[17px] mt-1.5 w-3 h-3 rounded-full bg-background border-2 border-primary" />
                  <div className="mb-1 flex items-center gap-2">
                    <span className="font-medium">{log.agentName}</span>
                    <span className="text-xs text-muted-foreground">{log.agentId}</span>
                  </div>
                  <p className="text-sm">{log.description}</p>
                  <div className="mt-1 flex items-center gap-2">
                    {getIconForCategory(log.category)}
                    <span className="text-xs capitalize">{log.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center h-full text-muted-foreground">
          {filter ? `Nicio activitate găsită pentru categoria "${filter}"` : "Nicio activitate înregistrată"}
        </div>
      )}
    </ScrollArea>
  );
};
