
import { extendedSupabase as supabase } from "@/integrations/supabase/extended-client";
import { ActivityData, ActivityLog } from "../types/agent-monitoring.types";
import { v4 as uuidv4 } from 'uuid';

/**
 * Logează o activitate a unui agent
 */
export const logAgentActivity = async (agentId: string, description: string, category: string = "general") => {
  try {
    const { data, error } = await supabase
      .from('agent_activity')
      .insert({
        agent_id: agentId,
        agent_name: getAgentNameById(agentId),
        action: description,
        category
      });
      
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error logging agent activity:', error);
    return null;
  }
};

/**
 * Transformă datele brute în structura ActivityData
 */
export const processActivityData = (rawData: any[]): ActivityData[] => {
  // Grupăm activitățile după agentId și category
  const groupedData: Record<string, Record<string, any[]>> = {};
  
  rawData.forEach(item => {
    const key = `${item.agent_id}:${item.agent_name}`;
    
    if (!groupedData[key]) {
      groupedData[key] = {};
    }
    
    if (!groupedData[key][item.category]) {
      groupedData[key][item.category] = [];
    }
    
    groupedData[key][item.category].push(item);
  });
  
  // Convertim la formatul ActivityData
  const result: ActivityData[] = [];
  
  Object.entries(groupedData).forEach(([agentKey, categories]) => {
    const [agentId, agentName] = agentKey.split(':');
    
    Object.entries(categories).forEach(([category, items]) => {
      result.push({
        agentId,
        agentName,
        category,
        count: items.length,
        data: items
      });
    });
  });
  
  return result;
};

/**
 * Transformă datele brute în lista de log-uri
 */
export const processActivityLogs = (rawData: any[]): ActivityLog[] => {
  return rawData.map(item => ({
    id: item.id,
    agentId: item.agent_id,
    agentName: item.agent_name,
    action: item.action,
    category: item.category,
    timestamp: new Date(item.created_at)
  }));
};

/**
 * Obține numele unui agent după ID
 */
export const getAgentNameById = (id: string): string => {
  // Map de test pentru nume de agenți
  const agentNames: Record<string, string> = {
    'agent-1': 'Development Assistant',
    'agent-2': 'Research Agent',
    'agent-3': 'Data Processing Agent', 
    'agent-4': 'Security Monitor',
    'agent-5': 'Project Manager',
    'agent-6': 'Code Reviewer',
    'system': 'System Agent'
  };
  
  return agentNames[id] || `Agent ${id}`;
};
