
import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { 
  ActivityData, 
  ActivityLog, 
} from "./types/agent-monitoring.types";
import { 
  fetchAgentActivities,
} from "./api/agent-activity-api";
import {
  processActivityData,
  processActivityLogs
} from "./utils/activity-processing";

export const useActivityData = () => {
  const [activityData, setActivityData] = useState<ActivityData[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [totalActivities, setTotalActivities] = useState(0);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const { toast } = useToast();

  const fetchAgentActivity = useCallback(async () => {
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
  }, [toast]);

  return {
    activityData,
    activityLogs,
    isLoading,
    categories,
    totalActivities,
    lastRefresh,
    fetchAgentActivity
  };
};
