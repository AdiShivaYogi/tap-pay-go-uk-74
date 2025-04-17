
import { useState, useEffect, useCallback } from "react";
import { extendedSupabase as supabase } from "@/integrations/supabase/extended-client";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

export interface ActivityData {
  agentId: string;
  agentName: string;
  category: string;
  taskCount: number;
  proposalCount: number;
  conversationCount: number;
}

export interface ActivityLog {
  id: string;
  agentId: string;
  agentName: string;
  description: string;
  category: string; // 'task', 'proposal', 'conversation', etc.
  timestamp: string;
}

export const useAgentMonitoring = () => {
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
      // Obținerea activității agenților din tabela agent_activity
      const { data: agentActivities, error: activitiesError } = await supabase
        .from('agent_activity')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (activitiesError) {
        throw activitiesError;
      }
      
      // Obținerea logurilor de activitate din tabela agent_activity_logs
      const { data: activityLogsData, error: logsError } = await supabase
        .from('agent_activity_logs')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(25);
        
      if (logsError) {
        throw logsError;
      }

      // Procesare date pentru a fi compatibile cu interfețele existente
      const processedActivityData: ActivityData[] = [];
      const uniqueAgents = new Map<string, {id: string, name: string}>();
      const uniqueCategories = new Set<string>();
      
      // Extragere agenți și categorii unice
      agentActivities?.forEach(activity => {
        uniqueAgents.set(activity.agent_id, { 
          id: activity.agent_id, 
          name: activity.agent_name 
        });
        uniqueCategories.add(activity.category);
      });

      // Prelucrare date pentru afișare
      Array.from(uniqueAgents.values()).forEach(agent => {
        const agentTasks = agentActivities?.filter(
          a => a.agent_id === agent.id && a.category === 'task'
        ).length || 0;
        
        const agentProposals = agentActivities?.filter(
          a => a.agent_id === agent.id && a.category === 'proposal'
        ).length || 0;
        
        const agentConversations = agentActivities?.filter(
          a => a.agent_id === agent.id && a.category === 'conversation'
        ).length || 0;

        processedActivityData.push({
          agentId: agent.id,
          agentName: agent.name,
          category: agentActivities?.find(a => a.agent_id === agent.id)?.category || 'other',
          taskCount: agentTasks,
          proposalCount: agentProposals,
          conversationCount: agentConversations
        });
      });

      // Transformarea logurilor în formatul așteptat de componente
      const processedLogs: ActivityLog[] = activityLogsData?.map(log => ({
        id: log.id,
        agentId: log.agent_id,
        agentName: log.agent_name,
        description: log.description,
        category: log.category,
        timestamp: log.timestamp
      })) || [];

      setActivityData(processedActivityData);
      setActivityLogs(processedLogs);
      setCategories(Array.from(uniqueCategories));
      setTotalActivities(agentActivities?.length || 0);
      
    } catch (error) {
      console.error('Eroare la preluarea datelor de activitate ale agenților:', error);
      toast({
        title: "Eroare",
        description: "Nu s-au putut încărca datele de monitorizare a agenților.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [user, toast]);
  
  // Inițial încărcăm datele și configurăm ascultarea pentru real-time updates
  useEffect(() => {
    fetchAgentActivity();
    
    // Configurare canal pentru actualizări real-time
    if (!user) return;
    
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
          fetchAgentActivity();
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
          fetchAgentActivity();
        }
      )
      .subscribe();
    
    // Curățare la unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchAgentActivity, user]);
  
  // Funcție pentru actualizarea manuală a datelor
  const refreshData = () => {
    fetchAgentActivity();
  };
  
  return {
    activityData,
    activityLogs,
    isLoading,
    categories,
    refreshData,
    totalActivities
  };
};
