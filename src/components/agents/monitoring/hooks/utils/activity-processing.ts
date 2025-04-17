
import { supabase } from "@/integrations/supabase/client";

/**
 * Înregistrează o activitate a agentului
 * @param agentId ID-ul agentului care a generat activitatea
 * @param description Descrierea activității
 * @param category Categoria activității (monitoring, learning, decision, autonomy, etc.)
 * @returns Promise<void>
 */
export const logAgentActivity = async (
  agentId: string, 
  description: string, 
  category: string = "monitoring"
): Promise<void> => {
  try {
    // Înregistrare activitate în tabelul agent_activity_logs
    const { error: activityError } = await supabase
      .from('agent_activity_logs')
      .insert({
        agent_id: agentId,
        agent_name: getAgentName(agentId),
        description: description,
        category: category
      });
    
    if (activityError) {
      console.error("Eroare la înregistrarea activității:", activityError);
    }
    
    // Înregistrare acțiune sumarizată în tabelul agent_activity
    const { error: actionError } = await supabase
      .from('agent_activity')
      .insert({
        agent_id: agentId,
        agent_name: getAgentName(agentId),
        action: description.substring(0, 100), // Luăm primele 100 caractere ca acțiune
        category: category
      });
    
    if (actionError) {
      console.error("Eroare la înregistrarea acțiunii:", actionError);
    }
    
  } catch (error) {
    console.error("Excepție la înregistrarea activității:", error);
  }
};

/**
 * Obține un nume descriptiv pentru agentul bazat pe ID
 * @param agentId ID-ul agentului
 * @returns Nume descriptiv
 */
const getAgentName = (agentId: string): string => {
  // Map ID-uri comune la nume descriptive
  const nameMap: Record<string, string> = {
    'system': 'Sistem Control',
    'monitoring': 'Agent Monitorizare',
    'learning': 'Agent Învățare',
    'decision': 'Agent Decizie',
    'analysis': 'Agent Analiză',
    'anthropic-api': 'API Anthropic',
    'openrouter-api': 'API OpenRouter',
    'claude-api-query': 'API Query Claude',
    'anthropic-api-query': 'API Query Anthropic'
  };
  
  // Dacă avem un nume predefinit, îl returnăm
  if (agentId in nameMap) {
    return nameMap[agentId];
  }
  
  // Altfel, generăm un nume bazat pe ID
  if (agentId.includes('api')) {
    return `Serviciu API ${agentId.split('-')[0]}`;
  }
  
  // Nume generic pentru alte ID-uri
  return `Agent ${agentId.charAt(0).toUpperCase() + agentId.slice(1)}`;
};
