
import { extendedSupabase as supabase } from "@/integrations/supabase/extended-client";
import { ActivityData, ActivityLog } from "../types/agent-monitoring.types";

export const processActivityData = (agentActivities: any[]): {
  processedActivityData: ActivityData[];
  uniqueCategories: Set<string>;
} => {
  const processedActivityData: ActivityData[] = [];
  const uniqueAgents = new Map<string, {id: string, name: string}>();
  const uniqueCategories = new Set<string>();
  
  // Extragere agenți și categorii unice
  agentActivities.forEach(activity => {
    uniqueAgents.set(activity.agent_id, { 
      id: activity.agent_id, 
      name: activity.agent_name 
    });
    uniqueCategories.add(activity.category);
  });

  // Prelucrare date pentru afișare
  Array.from(uniqueAgents.values()).forEach(agent => {
    const agentTasks = agentActivities.filter(
      a => a.agent_id === agent.id && a.category === 'task'
    ).length || 0;
    
    const agentProposals = agentActivities.filter(
      a => a.agent_id === agent.id && a.category === 'proposal'
    ).length || 0;
    
    const agentConversations = agentActivities.filter(
      a => a.agent_id === agent.id && a.category === 'conversation'
    ).length || 0;

    processedActivityData.push({
      agentId: agent.id,
      agentName: agent.name,
      category: agentActivities.find(a => a.agent_id === agent.id)?.category || 'other',
      taskCount: agentTasks,
      proposalCount: agentProposals,
      conversationCount: agentConversations
    });
  });

  return {
    processedActivityData,
    uniqueCategories
  };
};

export const processActivityLogs = (activityLogsData: any[]): ActivityLog[] => {
  return activityLogsData?.map(log => ({
    id: log.id,
    agentId: log.agent_id,
    agentName: log.agent_name,
    description: log.description,
    category: log.category,
    timestamp: log.timestamp
  })) || [];
};

export const logAgentActivity = async (
  agentId: string, 
  description: string
): Promise<void> => {
  try {
    await supabase
      .from('agent_activity_logs')
      .insert({
        agent_id: agentId,
        agent_name: 'N/A', // You might want to fetch the agent name here if needed
        description: description,
        category: 'monitoring',
        timestamp: new Date().toISOString()
      });
  } catch (error) {
    console.error('Failed to log agent activity:', error);
  }
};
