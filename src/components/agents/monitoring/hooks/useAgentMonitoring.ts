
import { useState, useEffect, useCallback, useRef } from "react";
import { extendedSupabase as supabase } from "@/integrations/supabase/extended-client";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { 
  ActivityData, 
  ActivityLog, 
  AgentInteraction,
  AgentLearningRule,
  AgentMonitoringHook 
} from "./types/agent-monitoring.types";
import { 
  processActivityData, 
  processActivityLogs,
  logAgentActivity
} from "./utils/activity-processing";
import { 
  fetchAgentActivities,
  setupRealtimeSubscription 
} from "./api/agent-activity-api";

// Lista de tipuri de învățare care pot fi transferate automat între agenți
const AUTO_LEARNING_TYPES = [
  "Algoritmi de bază",
  "Reguli simple",
  "Concepte fundamentale",
  "Optimizări minore",
  "Instrucțiuni standardizate"
];

export const useAgentMonitoring = (): AgentMonitoringHook => {
  const [activityData, setActivityData] = useState<ActivityData[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [totalActivities, setTotalActivities] = useState(0);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const [autoRefresh, setAutoRefresh] = useState<boolean>(false);
  const [learningRules, setLearningRules] = useState<AgentLearningRule[]>([]);
  const refreshIntervalRef = useRef<number | null>(null);
  const learningIntervalRef = useRef<number | null>(null);
  
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchAgentActivity = useCallback(async () => {
    if (!user) return;
    
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
  }, [user, toast]);

  // Adăugarea unei reguli de învățare automată
  const addLearningRule = useCallback((rule: Omit<AgentLearningRule, 'lastExecuted'>) => {
    setLearningRules(prev => {
      // Verifică dacă regula există deja (aceiași agenți sursă și țintă)
      const exists = prev.some(r => 
        r.sourceAgentId === rule.sourceAgentId && 
        r.targetAgentId === rule.targetAgentId
      );
      
      if (exists) {
        toast({
          title: "Regulă existentă",
          description: "Există deja o regulă de învățare între acești agenți.",
          variant: "default"
        });
        return prev;
      }
      
      toast({
        title: "Regulă adăugată",
        description: `Agentul va învăța automat la intervale de ${rule.interval} minute.`
      });
      
      return [...prev, { ...rule, lastExecuted: undefined }];
    });
  }, [toast]);
  
  // Ștergerea unei reguli de învățare
  const removeLearningRule = useCallback((sourceId: string, targetId: string) => {
    setLearningRules(prev => {
      const filtered = prev.filter(r => 
        !(r.sourceAgentId === sourceId && r.targetAgentId === targetId)
      );
      
      if (filtered.length < prev.length) {
        toast({
          title: "Regulă ștearsă",
          description: "Regula de învățare automată a fost eliminată."
        });
      }
      
      return filtered;
    });
  }, [toast]);
  
  // Activare/dezactivare regulă de învățare
  const toggleLearningRule = useCallback((sourceId: string, targetId: string) => {
    setLearningRules(prev => 
      prev.map(rule => {
        if (rule.sourceAgentId === sourceId && rule.targetAgentId === targetId) {
          return { 
            ...rule, 
            isActive: !rule.isActive 
          };
        }
        return rule;
      })
    );
  }, []);

  // Execută regulile de învățare automată
  const executeAutoLearning = useCallback(() => {
    const now = new Date();
    
    // Verifică fiecare regulă dacă trebuie executată
    learningRules.forEach(rule => {
      if (!rule.isActive) return;
      
      const shouldExecute = !rule.lastExecuted || 
        (now.getTime() - rule.lastExecuted.getTime()) >= rule.interval * 60 * 1000;
      
      if (shouldExecute) {
        // Selectează random un tip de învățare din lista disponibilă
        const randomLearningType = rule.learningTypes.length > 0 
          ? rule.learningTypes[Math.floor(Math.random() * rule.learningTypes.length)]
          : AUTO_LEARNING_TYPES[Math.floor(Math.random() * AUTO_LEARNING_TYPES.length)];
        
        // Înregistrează interacțiunea de învățare
        logAgentInteraction(rule.sourceAgentId, rule.targetAgentId, randomLearningType);
        
        // Actualizează timpul ultimei execuții
        setLearningRules(prev => 
          prev.map(r => {
            if (r.sourceAgentId === rule.sourceAgentId && r.targetAgentId === rule.targetAgentId) {
              return { ...r, lastExecuted: new Date() };
            }
            return r;
          })
        );
      }
    });
  }, [learningRules]);

  // Configurăm auto-refresh
  useEffect(() => {
    if (autoRefresh) {
      // Setăm refresh la fiecare 30 secunde în loc de continuă reactualizare
      refreshIntervalRef.current = window.setInterval(() => {
        fetchAgentActivity();
      }, 30000); // 30 secunde
    } else if (refreshIntervalRef.current) {
      clearInterval(refreshIntervalRef.current);
      refreshIntervalRef.current = null;
    }

    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
        refreshIntervalRef.current = null;
      }
    };
  }, [autoRefresh, fetchAgentActivity]);
  
  // Configurăm intervalul de verificare a regulilor de auto-învățare
  useEffect(() => {
    // Setăm verificarea regulilor la fiecare minut
    learningIntervalRef.current = window.setInterval(() => {
      if (learningRules.length > 0) {
        executeAutoLearning();
      }
    }, 60000); // 1 minut
    
    return () => {
      if (learningIntervalRef.current) {
        clearInterval(learningIntervalRef.current);
        learningIntervalRef.current = null;
      }
    };
  }, [learningRules, executeAutoLearning]);

  // Inițial încărcăm datele și configurăm ascultarea pentru real-time updates
  useEffect(() => {
    fetchAgentActivity();
    
    // Configurare canal pentru actualizări real-time
    if (!user) return;
    
    const channel = setupRealtimeSubscription(fetchAgentActivity);
    
    // Curățare la unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchAgentActivity, user]);
  
  // Funcție pentru actualizarea manuală a datelor
  const refreshData = useCallback(() => {
    fetchAgentActivity();
  }, [fetchAgentActivity]);
  
  // Funcție pentru logare activitate
  const logDetailedAgentActivity = useCallback((agentId: string, description: string, category: string = "monitoring") => {
    logAgentActivity(agentId, description, category);
  }, []);

  // Funcție pentru a activa sau dezactiva auto-refresh
  const toggleAutoRefresh = useCallback(() => {
    setAutoRefresh(prev => !prev);
  }, []);
  
  // Funcție pentru a înregistra o interacțiune între agenți (învățare)
  const logAgentInteraction = useCallback((sourceAgentId: string, targetAgentId: string, learningType: string) => {
    const description = `Agent ${sourceAgentId} învață de la ${targetAgentId}: ${learningType}`;
    logAgentActivity(sourceAgentId, description, "learning");
    return { sourceAgentId, targetAgentId, learningType, timestamp: new Date() };
  }, []);
  
  return {
    activityData,
    activityLogs,
    isLoading,
    categories,
    refreshData,
    totalActivities,
    logDetailedAgentActivity,
    autoRefresh,
    toggleAutoRefresh,
    lastRefresh,
    logAgentInteraction,
    learningRules,
    addLearningRule,
    removeLearningRule,
    toggleLearningRule
  };
};
