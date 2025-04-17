
import { useState, useCallback, useEffect } from "react";
import { extendedSupabase as supabase } from "@/integrations/supabase/extended-client";
import { LearningProgress, LearningReport, ActivityData } from "./types/agent-monitoring.types";
import { v4 as uuidv4 } from 'uuid';

export const useLearningProgress = (activityData: ActivityData[]) => {
  const [learningProgress, setLearningProgress] = useState<LearningProgress[]>([]);
  const [learningReports, setLearningReports] = useState<LearningReport[]>([]);
  const [progressIntervals, setProgressIntervals] = useState<number[]>([]);

  // Curățăm intervalele la deconectare
  const cleanupProgressIntervals = useCallback(() => {
    progressIntervals.forEach(clearInterval);
  }, [progressIntervals]);

  // Începem un proces de învățare
  const startLearningProcess = useCallback((sourceId: string, targetId: string, learningType: string) => {
    const now = new Date();
    const estimatedEndTime = new Date(now.getTime() + 15 * 60000); // Adăugăm 15 minute
    
    const newProgress: LearningProgress = {
      id: uuidv4(),
      sourceAgentId: sourceId,
      targetAgentId: targetId,
      learningType: learningType,
      progress: 0,
      status: 'in-progress',
      startTime: now,
      estimatedEndTime: estimatedEndTime
    };
    
    setLearningProgress(prev => [...prev, newProgress]);
    
    // Setăm un interval pentru actualizarea automată a progresului
    const intervalId = window.setInterval(() => {
      setLearningProgress(prev => {
        return prev.map(item => {
          if (item.id === newProgress.id && item.status === 'in-progress') {
            const elapsedTime = (new Date().getTime() - item.startTime.getTime()) / 1000;
            const totalTime = (estimatedEndTime.getTime() - item.startTime.getTime()) / 1000;
            const calculatedProgress = Math.min(Math.round((elapsedTime / totalTime) * 100), 99);
            
            if (calculatedProgress >= 99) {
              clearInterval(intervalId);
            }
            
            return {
              ...item,
              progress: calculatedProgress
            };
          }
          return item;
        });
      });
    }, 3000);
    
    // Salvăm intervalul pentru a-l putea anula mai târziu
    setProgressIntervals(prev => [...prev, intervalId]);
    
    return newProgress;
  }, []);

  // Actualizăm progresul unui proces de învățare
  const updateLearningProgress = useCallback((id: string, progress: number) => {
    setLearningProgress(prev => 
      prev.map(item => 
        item.id === id ? { ...item, progress } : item
      )
    );
  }, []);

  // Finalizăm un proces de învățare și generăm un raport
  const completeLearningProcess = useCallback((id: string): LearningReport | void => {
    // Găsim procesul de învățare și îl marcăm ca finalizat
    const progressItem = learningProgress.find(p => p.id === id);
    
    if (!progressItem) return;
    
    // Actualizăm progress ca fiind finalizat
    setLearningProgress(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, status: 'completed', progress: 100, endTime: new Date() } 
          : item
      )
    );
    
    // Identificăm numele agenților din datele de activitate
    const sourceAgent = activityData.find(a => a.agentId === progressItem.sourceAgentId);
    const targetAgent = activityData.find(a => a.agentId === progressItem.targetAgentId);
    
    // Generăm un raport de învățare bazat pe tipul de învățare
    const insights = [
      "Auto-optimizare a proceselor de execuție",
      "Îmbunătățiri în algoritmii de procesare paralelă",
      "Restructurarea arhitecturii interne pentru eficiență",
      "Adoptarea de noi metode de raționament cauzal"
    ];
    
    const newReport: LearningReport = {
      id: uuidv4(),
      sourceAgentId: progressItem.sourceAgentId,
      sourceAgentName: sourceAgent?.agentName || progressItem.sourceAgentId,
      targetAgentId: progressItem.targetAgentId,
      targetAgentName: targetAgent?.agentName || progressItem.targetAgentId,
      learningType: progressItem.learningType,
      insights: insights,
      learningDate: new Date(),
      conceptsLearned: insights,
      duration: Math.floor(Math.random() * 40) + 20, // Adăugăm o durație random pentru compatibilitate
      summary: "Proces de învățare autonomă finalizat cu succes. Îmbunătățiri substanțiale în capacitatea de analiză și procesare a sarcinilor complexe."
    };
    
    // Adăugăm raportul la stare
    setLearningReports(prev => [...prev, newReport]);
    
    return newReport;
  }, [learningProgress, activityData]);

  // Obținem rapoartele de învățare
  const getLearningReports = useCallback((): LearningReport[] => {
    // În implementarea reală, aici am face un request la API
    // Pentru acest exemplu, păstrăm starea curentă
    return learningReports;
  }, [learningReports]);
  
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
