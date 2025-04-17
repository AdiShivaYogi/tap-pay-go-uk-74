
import { useState, useEffect, useCallback, useRef } from "react";
import { extendedSupabase as supabase } from "@/integrations/supabase/extended-client";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { 
  ActivityData, 
  ActivityLog, 
  AgentMonitoringHook 
} from "./types/agent-monitoring.types";
import { 
  processActivityData, 
  processActivityLogs,
  logAgentActivity
} from "./utils/activity-processing";
import { 
  fetchAgentActivities,
  setupRealtimeSubscription 
} from "./api/agent-activity-api";

export const useAgentMonitoring = (): AgentMonitoringHook => {
  const [activityData, setActivityData] = useState<ActivityData[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [totalActivities, setTotalActivities] = useState(0);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const [autoRefresh, setAutoRefresh] = useState<boolean>(false);
  const refreshIntervalRef = useRef<number | null>(null);
  
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchAgentActivity = useCallback(async () => {
    if (!user) return;
    
    setIsLoading(true);
    
    try {
      const { agentActivities, activityLogs, error } = await fetchAgentActivities();
      
      if (error) {
        throw error;
      }
      
      if (agentActivities && activityLogs) {
        // Procesare date
        const { processedActivityData, uniqueCategories } = processActivityData(agentActivities);
        const processedLogs = processActivityLogs(activityLogs);
        
        setActivityData(processedActivityData);
        setActivityLogs(processedLogs);
        setCategories(Array.from(uniqueCategories));
        setTotalActivities(agentActivities.length || 0);
        setLastRefresh(new Date());
        
        // Log pentru categorii și activitate
        console.log('Agent activity categories:', uniqueCategories);
        console.log('Total monitored activities:', agentActivities.length || 0);
      }
    } catch (error) {
      console.error('Detailed error fetching agent activities:', error);
      toast({
        title: "Eroare monitorizare",
        description: "Nu s-au putut prelua datele de activitate ale agenților.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [user, toast]);

  // Configurăm auto-refresh
  useEffect(() => {
    if (autoRefresh) {
      // Setăm refresh la fiecare 30 secunde în loc de continuă reactualizare
      refreshIntervalRef.current = window.setInterval(() => {
        fetchAgentActivity();
      }, 30000); // 30 secunde
    } else if (refreshIntervalRef.current) {
      clearInterval(refreshIntervalRef.current);
      refreshIntervalRef.current = null;
    }

    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
        refreshIntervalRef.current = null;
      }
    };
  }, [autoRefresh, fetchAgentActivity]);

  // Inițial încărcăm datele și configurăm ascultarea pentru real-time updates
  useEffect(() => {
    fetchAgentActivity();
    
    // Configurare canal pentru actualizări real-time
    if (!user) return;
    
    const channel = setupRealtimeSubscription(fetchAgentActivity);
    
    // Curățare la unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchAgentActivity, user]);
  
  // Funcție pentru actualizarea manuală a datelor
  const refreshData = useCallback(() => {
    fetchAgentActivity();
  }, [fetchAgentActivity]);
  
  // Funcție pentru logare activitate
  const logDetailedAgentActivity = useCallback((agentId: string, description: string, category: string = "monitoring") => {
    logAgentActivity(agentId, description, category);
  }, []);

  // Funcție pentru a activa sau dezactiva auto-refresh
  const toggleAutoRefresh = useCallback(() => {
    setAutoRefresh(prev => !prev);
  }, []);
  
  // Funcție pentru a înregistra o interacțiune între agenți (învățare)
  const logAgentInteraction = useCallback((sourceAgentId: string, targetAgentId: string, learningType: string) => {
    const description = `Agent ${sourceAgentId} învață de la ${targetAgentId}: ${learningType}`;
    logAgentActivity(sourceAgentId, description, "learning");
    return { sourceAgentId, targetAgentId, learningType, timestamp: new Date() };
  }, []);
  
  return {
    activityData,
    activityLogs,
    isLoading,
    categories,
    refreshData,
    totalActivities,
    logDetailedAgentActivity,
    autoRefresh,
    toggleAutoRefresh,
    lastRefresh,
    logAgentInteraction
  };
};
