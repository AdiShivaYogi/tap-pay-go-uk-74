
import { useState, useEffect, useCallback } from "react";
import { extendedSupabase as supabase } from "@/integrations/supabase/extended-client";

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

  const fetchAgentActivity = useCallback(async () => {
    setIsLoading(true);
    
    try {
      // Creare de date simulate pentru acest exemplu
      // În implementarea reală, aceste date ar veni din Supabase
      const mockAgents = [
        { id: 'agent-dev', name: 'DevAI' },
        { id: 'agent-security', name: 'SecureAI' },
        { id: 'agent-infra', name: 'InfraAI' },
        { id: 'agent-product', name: 'ProductAI' }
      ];
      
      const mockCategories = ['task', 'proposal', 'conversation', 'other'];
      setCategories(mockCategories);
      
      // Generare date simulare pentru grafic
      const mockChartData = mockAgents.map(agent => ({
        agentId: agent.id,
        agentName: agent.name,
        category: mockCategories[Math.floor(Math.random() * mockCategories.length)],
        taskCount: Math.floor(Math.random() * 20),
        proposalCount: Math.floor(Math.random() * 15),
        conversationCount: Math.floor(Math.random() * 30)
      }));
      
      // Generare log-uri simulare pentru activități
      const now = new Date();
      const mockLogs: ActivityLog[] = [];
      
      // Generăm activități pentru ultimele 3 ore
      for (let i = 0; i < 25; i++) {
        const agent = mockAgents[Math.floor(Math.random() * mockAgents.length)];
        const category = mockCategories[Math.floor(Math.random() * mockCategories.length)];
        const minutesAgo = Math.floor(Math.random() * 180); // În ultimele 3 ore
        
        const timestamp = new Date(now.getTime() - minutesAgo * 60000);
        
        let description = '';
        switch (category) {
          case 'task':
            description = `A început lucrul la taskul "${['Implementare API', 'Rezolvare bug', 'Optimizare cod', 'Adăugare feature'][Math.floor(Math.random() * 4)]}"`;
            break;
          case 'proposal':
            description = `A propus ${['o soluție nouă', 'o refactorizare', 'un fix pentru bug-ul', 'o optimizare pentru'][Math.floor(Math.random() * 4)]} "${['API', 'UI', 'baza de date', 'autentificare'][Math.floor(Math.random() * 4)]}"`;
            break;
          case 'conversation':
            description = `A discutat despre ${['implementarea', 'designul', 'testarea', 'lansarea'][Math.floor(Math.random() * 4)]} ${['noului feature', 'sistemului de autentificare', 'bazei de date', 'API-ului'][Math.floor(Math.random() * 4)]}`;
            break;
          default:
            description = `A efectuat o acțiune de ${['analiză', 'cercetare', 'raportare', 'training'][Math.floor(Math.random() * 4)]}`;
            break;
        }
        
        mockLogs.push({
          id: `log-${i}`,
          agentId: agent.id,
          agentName: agent.name,
          category,
          description,
          timestamp: timestamp.toISOString()
        });
      }
      
      // Sortăm log-urile după timestamp, cele mai recente primele
      mockLogs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      
      setActivityData(mockChartData);
      setActivityLogs(mockLogs);
      setTotalActivities(mockLogs.length);
      
      // În implementarea reală, datele ar veni din Supabase
      // const { data: tasks, error: tasksError } = await supabase
      //   .from('agent_task_progress')
      //   .select('*')
      //   .order('created_at', { ascending: false });
      //
      // const { data: proposals, error: proposalsError } = await supabase
      //   .from('agent_task_submissions')
      //   .select('*')
      //   .order('created_at', { ascending: false });
      
    } catch (error) {
      console.error('Error fetching agent activity data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  // Inițial încărcăm datele
  useEffect(() => {
    fetchAgentActivity();
    
    // Simulăm actualizarea datelor în timp real la fiecare 30 secunde
    const interval = setInterval(() => {
      fetchAgentActivity();
    }, 30000);
    
    return () => clearInterval(interval);
  }, [fetchAgentActivity]);
  
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
