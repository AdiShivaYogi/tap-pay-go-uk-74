
import { useState, useEffect, useRef, useCallback } from "react";
import { 
  AgentLearningRule,
  AgentInteraction
} from "./types/agent-monitoring.types";
import { useToast } from "@/hooks/use-toast";
import { logAgentActivity } from "./utils/activity-processing";

// Lista de tipuri de învățare care pot fi transferate automat între agenți
export const AUTO_LEARNING_TYPES = [
  "Algoritmi de bază",
  "Reguli simple",
  "Concepte fundamentale",
  "Optimizări minore",
  "Instrucțiuni standardizate"
];

export const useLearningRules = (
  activityData: any[],
  startLearningProcess: (sourceId: string, targetId: string, learningType: string) => any
) => {
  const [learningRules, setLearningRules] = useState<AgentLearningRule[]>([]);
  const learningIntervalRef = useRef<number | null>(null);
  const { toast } = useToast();

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

  // Funcție pentru a înregistra o interacțiune între agenți (învățare)
  const logAgentInteraction = useCallback((sourceAgentId: string, targetAgentId: string, learningType: string): AgentInteraction => {
    const description = `Agent ${sourceAgentId} învață de la ${targetAgentId}: ${learningType}`;
    logAgentActivity(sourceAgentId, description, "learning");
    return { sourceAgentId, targetAgentId, learningType, timestamp: new Date() };
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

  return {
    learningRules,
    addLearningRule,
    removeLearningRule,
    toggleLearningRule,
    logAgentInteraction,
    executeAutoLearning
  };
};
