
import { useState, useEffect, useCallback } from "react";
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
  const [autoExecutionStatus, setAutoExecutionStatus] = useState<Record<string, boolean>>({});

  // Funcție pentru încărcarea datelor de activitate ale agenților
  const fetchAgentActivity = useCallback(async () => {
    try {
      setIsLoading(true);
      
      // Realizăm cererea către baza de date
      const { data, error } = await supabase
        .from('agent_activity')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) {
        console.error('Eroare la încărcarea activității agenților:', error);
        throw error;
      }
      
      // Procesează datele și extrage categoriile
      const { processedActivityData, uniqueCategories } = processActivityData(data || []);
      
      // Actualizează starea cu datele procesate și categoriile unice
      setActivityData(processedActivityData);
      setActivityLogs(processActivityLogs(data || []));
      setCategories(Array.from(uniqueCategories));
      setTotalActivities((data || []).length);
      setLastRefresh(new Date());
      
      // Încarcă statusul autoExecute din baza de date
      await fetchAutoExecutionStatus();
    } catch (error) {
      console.error('Eroare la încărcarea activității agenților:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  // Funcție pentru a încărca statusul de autoexecuție pentru fiecare proiect
  const fetchAutoExecutionStatus = async () => {
    try {
      const { data, error } = await supabase
        .from('agent_activity')
        .select('*')
        .eq('category', 'auto_execution_status')
        .order('created_at', { ascending: false });
        
      if (error) {
        console.error('Eroare la încărcarea statusului de autoexecutie:', error);
        return;
      }
      
      // Transformăm datele într-un obiect de tip {project_id: boolean}
      const statusMap: Record<string, boolean> = {};
      data?.forEach(item => {
        try {
          // Acțiunea conține ID-ul proiectului și statusul separat prin :
          const [projectId, status] = item.action.split(':');
          statusMap[projectId] = status === 'completed';
        } catch (e) {
          console.error('Format invalid pentru statusul de autoexecutie:', item);
        }
      });
      
      setAutoExecutionStatus(statusMap);
    } catch (error) {
      console.error('Eroare la încărcarea statusului de autoexecuție:', error);
    }
  };
  
  // Funcție pentru a salva statusul de autoexecutie pentru un proiect
  const saveAutoExecutionStatus = useCallback(async (projectId: string, status: boolean) => {
    try {
      // Salvăm statusul în baza de date
      await supabase
        .from('agent_activity')
        .insert({
          agent_id: 'system',
          agent_name: 'Auto Execution System',
          category: 'auto_execution_status',
          action: `${projectId}:${status ? 'completed' : 'in_progress'}`
        });
        
      // Actualizăm starea locală
      setAutoExecutionStatus(prev => ({
        ...prev,
        [projectId]: status
      }));
    } catch (error) {
      console.error('Eroare la salvarea statusului de autoexecuție:', error);
    }
  }, []);

  // Încărcăm datele la prima randare
  useEffect(() => {
    fetchAgentActivity();
  }, [fetchAgentActivity]);

  return {
    activityData,
    activityLogs,
    isLoading,
    categories,
    totalActivities,
    fetchAgentActivity,
    lastRefresh,
    autoExecutionStatus,
    saveAutoExecutionStatus
  };
};
