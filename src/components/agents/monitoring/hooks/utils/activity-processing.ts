
import { extendedSupabase as supabase } from "@/integrations/supabase/extended-client";

/**
 * Înregistrează activitatea unui agent în baza de date
 */
export async function logAgentActivity(agentId: string, description: string, category: string = "monitoring") {
  try {
    // Log în tabela de log-uri
    const { data: logData, error: logError } = await supabase
      .from('agent_activity_logs')
      .insert([
        {
          agent_id: agentId,
          agent_name: getAgentName(agentId),
          category,
          description,
          timestamp: new Date().toISOString()
        }
      ]);

    if (logError) {
      console.error('Eroare la înregistrarea activității în logs:', logError);
      return false;
    }

    // Actualizăm și tabela de activitate
    const { error: activityError } = await supabase
      .from('agent_activity')
      .insert([
        { 
          agent_id: agentId,
          agent_name: getAgentName(agentId),
          category,
          action: 'activity'
        }
      ]);

    if (activityError) {
      console.error('Eroare la înregistrarea activității:', activityError);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Eroare generală la înregistrarea activității:', error);
    return false;
  }
}

// Helper pentru a obține numele agentului după ID
function getAgentName(agentId: string): string {
  // Lista simplificată de agenți și ID-uri
  const agentNames: Record<string, string> = {
    "agent-1": "Asistent Plăți",
    "agent-2": "Agent Marketing",
    "agent-3": "Agent Securitate",
    "agent-4": "Agent Autonomie",
    "agent-5": "Agent Integrare",
    "autonomous-agent": "Sistem Autonom",
    "system": "System",
    "learning-engine": "Motor Învățare"
  };
  
  return agentNames[agentId] || `Agent ${agentId}`;
}

export const extractActivityMetrics = (activities: any[]) => {
  // Implementare pentru extragerea metricilor din activități
  const categories = Array.from(new Set(activities.map(a => a.category)));
  const totalActivities = activities.length;
  const categoryBreakdown = categories.map(category => ({
    category,
    count: activities.filter(a => a.category === category).length
  }));
  
  return {
    categories,
    totalActivities,
    categoryBreakdown
  };
};
