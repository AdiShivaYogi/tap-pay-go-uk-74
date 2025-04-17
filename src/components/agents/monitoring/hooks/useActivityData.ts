import { useState, useCallback } from "react";
import { extendedSupabase as supabase } from "@/integrations/supabase/extended-client";
import { formatDistanceToNow } from "date-fns";
import { ro } from "date-fns/locale";

export const useActivityData = () => {
  const [activityData, setActivityData] = useState<any[]>([]);
  const [activityLogs, setActivityLogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [totalActivities, setTotalActivities] = useState(0);
  const [lastRefresh, setLastRefresh] = useState<Date | string | null>(null);
  const [autoExecutionStatus, setAutoExecutionStatus] = useState<Record<string, boolean>>({});

  // Fetch agent activity from Supabase
  const fetchAgentActivity = useCallback(async () => {
    try {
      setIsLoading(true);
      
      // Simulăm date pentru activitatea agentului
      setTimeout(() => {
        const mockActivityData = [
          { agentId: "agent-1", agentName: "Asistent Plăți", category: "conversation", count: 32 },
          { agentId: "agent-2", agentName: "Agent Marketing", category: "task", count: 15 },
          { agentId: "agent-3", agentName: "Agent Securitate", category: "monitoring", count: 48 },
          { agentId: "agent-4", agentName: "Agent Autonomie", category: "autonomy", count: 27 },
          { agentId: "agent-5", agentName: "Agent Integrare", category: "project_task", count: 19 },
        ];
        
        const mockActivityLogs = [
          { id: "1", timestamp: new Date(), agentName: "Agent Autonomie", category: "autonomy", description: "Privilegii complete activate pentru toți agenții" },
          { id: "2", timestamp: new Date(Date.now() - 5 * 60000), agentName: "Agent Securitate", category: "monitoring", description: "Verificare completă a sistemelor de securitate" },
          { id: "3", timestamp: new Date(Date.now() - 15 * 60000), agentName: "Asistent Plăți", category: "conversation", description: "Interacțiune cu utilizatorul privind metodele de plată" },
        ];
        
        const mockCategories = Array.from(new Set(mockActivityData.map(item => item.category)));
        const mockTotalActivities = mockActivityData.reduce((sum, item) => sum + item.count, 0);
        
        setActivityData(mockActivityData);
        setActivityLogs(mockActivityLogs);
        setCategories(mockCategories);
        setTotalActivities(mockTotalActivities);
        setLastRefresh(formatDistanceToNow(new Date(), { addSuffix: true, locale: ro }));
        
        // Simulăm starea de auto-execuție din baza de date
        setAutoExecutionStatus({
          "autonomy-era": true,
          "ai-integration": false,
          "data-processing": false,
          "security-framework": false,
          "advanced-analytics": false
        });
        
        // Convert lastRefresh to Date if it's a string
        const refreshTime = typeof lastRefresh === 'string' 
          ? new Date() 
          : lastRefresh;
        
        setLastRefresh(refreshTime);
        
        setIsLoading(false);
      }, 500);
      
    } catch (error) {
      console.error("Error fetching agent activity:", error);
      setIsLoading(false);
    }
  }, []);
  
  // Salvăm starea de auto-execuție în baza de date
  const saveAutoExecutionStatus = useCallback(async (status: Record<string, boolean>) => {
    try {
      // În implementarea reală, am salva în baza de date Supabase
      console.log("Salvare status auto-execuție:", status);
      
      // Pentru demo, doar actualizăm starea locală
      setAutoExecutionStatus(status);
      
      return true;
    } catch (error) {
      console.error("Error saving auto execution status:", error);
      return false;
    }
  }, []);

  return {
    activityData,
    activityLogs,
    isLoading,
    categories,
    totalActivities,
    lastRefresh,
    fetchAgentActivity,
    autoExecutionStatus,
    saveAutoExecutionStatus
  };
};
