
import { extendedSupabase as supabase } from "@/integrations/supabase/extended-client";

interface FetchActivitiesResult {
  agentActivities: any[] | null;
  activityLogs: any[] | null;
  error: any | null;
}

export const fetchAgentActivities = async (): Promise<FetchActivitiesResult> => {
  try {
    console.log('Fetching latest agent activities...');
    
    const { data: agentActivities, error: activitiesError } = await supabase
      .from('agent_activity')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(25);
    
    if (activitiesError) {
      throw activitiesError;
    }
    
    console.log(`Retrieved ${agentActivities?.length || 0} agent activities`);
    
    const { data: activityLogsData, error: logsError } = await supabase
      .from('agent_activity_logs')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(25);
      
    if (logsError) {
      throw logsError;
    }

    return {
      agentActivities: agentActivities || [],
      activityLogs: activityLogsData || [],
      error: null
    };
  } catch (error) {
    console.error('Error fetching agent activities:', error);
    return {
      agentActivities: null,
      activityLogs: null,
      error
    };
  }
};

export const setupRealtimeSubscription = (callback: () => void) => {
  const channel = supabase
    .channel('agent-activities-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'agent_activity'
      },
      () => {
        callback();
      }
    )
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'agent_activity_logs'
      },
      () => {
        callback();
      }
    )
    .subscribe();
  
  return channel;
};
