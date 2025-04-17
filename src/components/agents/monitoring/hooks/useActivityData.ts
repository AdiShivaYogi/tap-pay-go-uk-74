
import { useState, useCallback } from "react";
import { extendedSupabase as supabase } from "@/integrations/supabase/extended-client";
import { ActivityData, ActivityLog } from "./types/agent-monitoring.types";
import { processActivityData, processActivityLogs } from "./utils/activity-processing";

export const useActivityData = () => {
  const [activityData, setActivityData] = useState<ActivityData[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [totalActivities, setTotalActivities] = useState(0);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  // Funcție pentru încărcarea datelor de activitate ale agenților
  const fetchAgentActivity = useCallback(async () => {
    try {
      setIsLoading(true);
      
      // În implementarea reală, aici am face un request la API
      // Pentru acest exemplu, simulăm un delay și date mock
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const { data, error } = await supabase
        .from('agent_activity')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      // Procesează datele și extrage categoriile
      const { processedActivityData, uniqueCategories } = processActivityData(data || []);
      
      // Actualizează starea cu datele procesate și categoriile unice
      setActivityData(processedActivityData);
      setActivityLogs(processActivityLogs(data || []));
      setCategories(Array.from(uniqueCategories));
      setTotalActivities((data || []).length);
      setLastRefresh(new Date());
    } catch (error) {
      console.error('Eroare la încărcarea activității agenților:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    activityData,
    activityLogs,
    isLoading,
    categories,
    totalActivities,
    fetchAgentActivity,
    lastRefresh
  };
};
