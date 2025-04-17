import { useState, useEffect, useCallback, useRef } from "react";
import { extendedSupabase as supabase } from "@/integrations/supabase/extended-client";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { 
  ActivityData, 
  ActivityLog, 
  AgentInteraction,
  AgentLearningRule,
  AgentMonitoringHook,
  LearningProgress,
  LearningReport
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
import { generateRandomId } from "@/lib/utils";

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
  const [learningProgress, setLearningProgress] = useState<LearningProgress[]>([]);
  const [learningReports, setLearningReports] = useState<LearningReport[]>([]);
  const refreshIntervalRef = useRef<number | null>(null);
  const learningIntervalRef = useRef<number | null>(null);
  const progressIntervalRef = useRef<Record<string, number>>({});
  
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

  // Inițierea unui proces de învățare între agenți
  const startLearningProcess = useCallback((sourceId: string, targetId: string, learningType: string): LearningProgress => {
    // Găsește numele agenților
    const sourceAgent = activityData.find(a => a.agentId === sourceId);
    const targetAgent = activityData.find(a => a.agentId === targetId);
    
    // Calculăm un timp estimat de finalizare (între 30 secunde și 3 minute)
    const durationInMs = Math.floor(Math.random() * 150000) + 30000; // 30s - 3min
    const startTime = new Date();
    const estimatedEndTime = new Date(startTime.getTime() + durationInMs);
    
    const progressId = generateRandomId();
    const newProgress: LearningProgress = {
      id: progressId,
      sourceAgentId: sourceId,
      targetAgentId: targetId,
      progress: 0,
      startTime: startTime,
      estimatedEndTime: estimatedEndTime,
      learningType: learningType,
      status: 'in-progress'
    };
    
    setLearningProgress(prev => [...prev, newProgress]);
    
    // Logăm activitatea
    logAgentActivity(
      sourceId, 
      `A început să învețe ${learningType} de la ${targetAgent?.agentName || targetId}`, 
      'learning'
    );
    
    // Configurăm un interval pentru actualizarea progresului
    const intervalTime = Math.floor(durationInMs / 20); // 20 de actualizări pe parcursul procesului
    progressIntervalRef.current[progressId] = window.setInterval(() => {
      // Căutăm înregistrarea de progress curentă
      setLearningProgress(prev => {
        const currentProgress = prev.find(p => p.id === progressId);
        if (!currentProgress || currentProgress.status !== 'in-progress') {
          clearInterval(progressIntervalRef.current[progressId]);
          delete progressIntervalRef.current[progressId];
          return prev;
        }
        
        // Calculăm noul progress
        let newProgressValue = currentProgress.progress + Math.floor(Math.random() * 15) + 5; // +5-20%
        
        // Dacă am ajuns aproape de 100%, oprim intervalul
        if (newProgressValue >= 95) {
          newProgressValue = 100;
          clearInterval(progressIntervalRef.current[progressId]);
          delete progressIntervalRef.current[progressId];
          
          // Generăm automat un raport după 1 secundă pentru a da timp animației să termine
          setTimeout(() => {
            const conceptsLearned = [
              `Concept de bază: ${learningType}`,
              `Implementare pentru: ${learningType}`,
              `Optimizări pentru: ${learningType}`
            ];
            
            const summary = `Agentul ${sourceAgent?.agentName || sourceId} a învățat cu succes concepte din categoria ${learningType} de la agentul ${targetAgent?.agentName || targetId}. Învățarea a durat aproximativ ${Math.round(durationInMs/1000)} secunde și a inclus concepte de bază, metode de implementare și tehnici de optimizare.`;
            
            completeLearningProcess(progressId, conceptsLearned, summary);
          }, 1000);
        }
        
        // Actualizăm progressul
        return prev.map(p => p.id === progressId ? { ...p, progress: newProgressValue } : p);
      });
    }, intervalTime);
    
    toast({
      title: "Învățare inițiată",
      description: `${sourceAgent?.agentName || sourceId} învață de la ${targetAgent?.agentName || targetId}`,
    });
    
    return newProgress;
  }, [activityData, toast]);

  // Actualizează progresul unei învățări
  const updateLearningProgress = useCallback((id: string, progress: number) => {
    setLearningProgress(prev => 
      prev.map(p => p.id === id ? { ...p, progress: Math.min(100, progress) } : p)
    );
  }, []);

  // Completarea unui proces de învățare și generarea raportului
  const completeLearningProcess = useCallback((id: string, conceptsLearned: string[], summary: string): LearningReport => {
    // Găsim înregistrarea de progres
    const progress = learningProgress.find(p => p.id === id);
    if (!progress) {
      throw new Error("Procesul de învățare nu a fost găsit");
    }
    
    // Marcăm procesul ca fiind completat
    setLearningProgress(prev => 
      prev.map(p => p.id === id ? { ...p, progress: 100, status: 'completed' } : p)
    );
    
    // Găsim numele agenților
    const sourceAgent = activityData.find(a => a.agentId === progress.sourceAgentId);
    const targetAgent = activityData.find(a => a.agentId === progress.targetAgentId);
    
    // Calculăm durata în secunde
    const duration = Math.round((new Date().getTime() - progress.startTime.getTime()) / 1000);
    
    // Creăm raportul
    const report: LearningReport = {
      id: generateRandomId(),
      sourceAgentId: progress.sourceAgentId,
      sourceAgentName: sourceAgent?.agentName || "Agent necunoscut",
      targetAgentId: progress.targetAgentId,
      targetAgentName: targetAgent?.agentName || "Agent necunoscut",
      learningType: progress.learningType,
      learningDate: new Date(),
      duration: duration,
      conceptsLearned: conceptsLearned,
      summary: summary
    };
    
    setLearningReports(prev => [report, ...prev]);
    
    // Logăm activitatea
    logAgentActivity(
      progress.sourceAgentId, 
      `A finalizat învățarea ${progress.learningType} de la ${targetAgent?.agentName || progress.targetAgentId}`, 
      'learning'
    );
    
    toast({
      title: "Învățare completă",
      description: `Raport nou de învățare disponibil`,
    });
    
    return report;
  }, [learningProgress, activityData, toast]);

  // Obținerea rapoartelor de învățare cu posibilitatea de filtrare după agent sursă/țintă
  const getLearningReports = useCallback((sourceId?: string, targetId?: string): LearningReport[] => {
    return learningReports.filter(report => {
      const sourceMatch = sourceId ? report.sourceAgentId === sourceId : true;
      const targetMatch = targetId ? report.targetAgentId === targetId : true;
      return sourceMatch && targetMatch;
    });
  }, [learningReports]);

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
        
        // Înregistrează interacțiunea de învățare și începe procesul de învățare
        logAgentInteraction(rule.sourceAgentId, rule.targetAgentId, randomLearningType);
        startLearningProcess(rule.sourceAgentId, rule.targetAgentId, randomLearningType);
        
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
  }, [learningRules, logAgentInteraction, startLearningProcess]);

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
      
      // Curățăm toate intervalele de progres active
      Object.values(progressIntervalRef.current).forEach(clearInterval);
      progressIntervalRef.current = {};
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
    toggleLearningRule,
    learningProgress,
    learningReports,
    startLearningProcess,
    updateLearningProgress,
    completeLearningProcess,
    getLearningReports
  };
};
