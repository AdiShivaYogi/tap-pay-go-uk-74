
import { useState, useEffect, useCallback } from "react";
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
        
        // Log pentru categorii și activitate
        console.log('Agent activity categories:', categories);
        console.log('Total monitored activities:', totalActivities);
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
  }, [user, toast, categories, totalActivities]);

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
  const logDetailedAgentActivity = useCallback((agentId: string, description: string) => {
    logAgentActivity(agentId, description);
  }, []);
  
  return {
    activityData,
    activityLogs,
    isLoading,
    categories,
    refreshData,
    totalActivities,
    logDetailedAgentActivity
  };
};
