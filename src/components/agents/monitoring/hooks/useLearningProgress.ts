
import { useState, useCallback, useRef } from "react";
import { 
  LearningProgress, 
  LearningReport,
  ActivityData
} from "./types/agent-monitoring.types";
import { useToast } from "@/hooks/use-toast";
import { generateRandomId } from "@/lib/utils";
import { logAgentActivity } from "./utils/activity-processing";

export const useLearningProgress = (activityData: ActivityData[]) => {
  const [learningProgress, setLearningProgress] = useState<LearningProgress[]>([]);
  const [learningReports, setLearningReports] = useState<LearningReport[]>([]);
  const progressIntervalRef = useRef<Record<string, number>>({});
  const { toast } = useToast();

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

  // Curățare la unmount
  const cleanupProgressIntervals = useCallback(() => {
    // Curățăm toate intervalele de progres active
    Object.values(progressIntervalRef.current).forEach(clearInterval);
    progressIntervalRef.current = {};
  }, []);

  return {
    learningProgress,
    learningReports,
    startLearningProcess,
    updateLearningProgress,
    completeLearningProcess,
    getLearningReports,
    cleanupProgressIntervals
  };
};
