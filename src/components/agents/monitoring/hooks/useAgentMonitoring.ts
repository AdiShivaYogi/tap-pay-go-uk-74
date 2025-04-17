
import { useEffect, useCallback } from "react";
import { extendedSupabase as supabase } from "@/integrations/supabase/extended-client";
import { useAuth } from "@/hooks/use-auth";
import { 
  AgentMonitoringHook
} from "./types/agent-monitoring.types";
import { 
  logAgentActivity 
} from "./utils/activity-processing";
import { 
  setupRealtimeSubscription 
} from "./api/agent-activity-api";
import { useActivityData } from "./useActivityData";
import { useAutoRefresh } from "./useAutoRefresh";
import { useLearningRules } from "./useLearningRules";
import { useLearningProgress } from "./useLearningProgress";

export const useAgentMonitoring = (): AgentMonitoringHook => {
  const { user } = useAuth();
  const { 
    activityData, 
    activityLogs, 
    isLoading, 
    categories, 
    totalActivities, 
    lastRefresh, 
    fetchAgentActivity,
    autoExecutionStatus,
    saveAutoExecutionStatus 
  } = useActivityData();
  
  const { autoRefresh, toggleAutoRefresh } = useAutoRefresh(fetchAgentActivity);
  
  const {
    learningProgress,
    learningReports,
    startLearningProcess,
    updateLearningProgress,
    completeLearningProcess,
    getLearningReports,
    cleanupProgressIntervals
  } = useLearningProgress(activityData);
  
  const {
    learningRules,
    addLearningRule,
    removeLearningRule,
    toggleLearningRule,
    logAgentInteraction,
    executeAutoLearning
  } = useLearningRules(activityData, startLearningProcess);

  // Inițial încărcăm datele și configurăm ascultarea pentru real-time updates
  useEffect(() => {
    fetchAgentActivity();
    
    // Configurare canal pentru actualizări real-time
    if (!user) return;
    
    const channel = setupRealtimeSubscription(fetchAgentActivity);
    
    // Inițiem auto-învățarea la încărcarea componentei
    executeAutoLearning();
    
    // Înscriere la intervalul de auto-învățare
    const autoLearnInterval = setInterval(() => {
      executeAutoLearning();
    }, 5 * 60 * 1000); // La fiecare 5 minute
    
    // Curățare la unmount
    return () => {
      supabase.removeChannel(channel);
      cleanupProgressIntervals();
      clearInterval(autoLearnInterval);
    };
  }, [fetchAgentActivity, user, cleanupProgressIntervals, executeAutoLearning]);
  
  // Funcție pentru logare activitate
  const logDetailedAgentActivity = useCallback((agentId: string, description: string, category: string = "monitoring") => {
    logAgentActivity(agentId, description, category);
  }, []);

  return {
    activityData,
    activityLogs,
    isLoading,
    categories,
    refreshData: fetchAgentActivity,
    totalActivities,
    logDetailedAgentActivity,
    autoRefresh,
    toggleAutoRefresh,
    lastRefresh,
    logAgentInteraction,
    learningRules,
    addLearningRule,
    removeLearningRule,
    toggleLearningRule,
    learningProgress,
    learningReports,
    startLearningProcess,
    updateLearningProgress,
    completeLearningProcess,
    getLearningReports,
    executeAutoLearning,
    // Adăugăm noile funcționalități
    autoExecutionStatus,
    saveAutoExecutionStatus
  };
};
