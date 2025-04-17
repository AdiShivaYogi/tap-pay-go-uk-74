
import React, { useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { logAgentActivity } from "@/components/agents/monitoring/hooks/utils/activity-processing";
import { useAutonomousEngine } from "@/components/agents/autonomous-engine/AutonomousEngineProvider";

export const AutoExecution = () => {
  const { toast } = useToast();
  const { isRunning, autonomyLevel } = useAutonomousEngine();
  const [executionActive, setExecutionActive] = useState<boolean>(false);
  const [strategicDirection, setStrategicDirection] = useState<string>("optimization"); // direcția implicită
  const [executionCount, setExecutionCount] = useState<number>(0);
  
  // Direcțiile strategice posibile
  const strategicDirections = [
    "optimization", // optimizarea sistemelor existente
    "innovation",   // dezvoltarea de noi funcționalități 
    "integration",  // integrarea cu alte sisteme
    "security",     // îmbunătățirea securității
    "autonomy"      // creșterea autonomiei
  ];
  
  // Funcția pentru execuția automată a task-urilor
  const executeAutonomousTasks = async () => {
    if (!isRunning || autonomyLevel < 50 || !executionActive) return;
    
    try {
      console.log(`[${new Date().toISOString()}] Execuție automată în direcția strategică: ${strategicDirection}`);
      
      // Generăm propuneri direcționate strategic
      await generateStrategicProposals(strategicDirection);
      
      // Înregistrăm activitatea de execuție
      logAgentActivity(
        'auto-execution',
        `Execuție automată în direcția strategică: ${strategicDirection}`,
        'execution'
      );
      
      // Actualizăm contorul de execuții
      setExecutionCount(prev => prev + 1);
      
      // La fiecare 3 execuții, afișăm un toast de notificare
      if (executionCount % 3 === 0) {
        toast({
          title: "Execuție autonomă în progres",
          description: `Sistemul de agenți execută task-uri aliniate direcției ${translateDirection(strategicDirection)}`,
          duration: 4000,
        });
      }
    } catch (error) {
      console.error('Eroare în timpul execuției autonome:', error);
    }
  };
  
  // Funcție pentru generarea propunerilor direcționate strategic
  const generateStrategicProposals = async (direction: string) => {
    try {
      // Pregătim direcția pentru API
      const { data, error } = await supabase.functions.invoke('generate-agent-proposals', {
        body: { 
          action: 'generate',
          count: 2, 
          vitalCount: 1,
          priority: 'high',
          strategicDirection: direction
        }
      });
      
      if (error) {
        console.error('Eroare la generarea propunerilor strategice:', error);
        return;
      }
      
      console.log(`Propuneri generate în direcția ${direction}:`, data);
    } catch (err) {
      console.error('Excepție la generarea propunerilor strategice:', err);
    }
  };
  
  // Funcție pentru traducerea direcției strategic în text afișabil
  const translateDirection = (direction: string): string => {
    const translations: Record<string, string> = {
      "optimization": "optimizare sisteme",
      "innovation": "inovație și dezvoltare",
      "integration": "integrare cu ecosisteme externe",
      "security": "securitate și protecție",
      "autonomy": "autonomie avansată"
    };
    
    return translations[direction] || direction;
  };
  
  // Schimbarea direcției strategice periodic
  useEffect(() => {
    if (!isRunning) return;
    
    // Schimbăm direcția la intervale regulate pentru a diversifica propunerile
    const directionTimer = setInterval(() => {
      const randomDirection = strategicDirections[Math.floor(Math.random() * strategicDirections.length)];
      setStrategicDirection(randomDirection);
      
      console.log(`[${new Date().toISOString()}] Direcția strategică s-a schimbat la: ${randomDirection}`);
      
      // Înregistrăm schimbarea direcției
      logAgentActivity(
        'strategy-director',
        `Schimbare direcție strategică: ${translateDirection(randomDirection)}`,
        'strategy'
      );
    }, 180000); // La fiecare 3 minute
    
    return () => clearInterval(directionTimer);
  }, [isRunning]);
  
  // Activăm execuția când sistemul este pornit
  useEffect(() => {
    if (isRunning) {
      setExecutionActive(true);
      
      // După pornire, așteptăm puțin și apoi începem execuțiile
      const initialTimer = setTimeout(() => {
        executeAutonomousTasks();
      }, 5000);
      
      return () => clearTimeout(initialTimer);
    } else {
      setExecutionActive(false);
    }
  }, [isRunning, autonomyLevel]);
  
  // Setăm un interval pentru execuțiile periodice
  useEffect(() => {
    if (!isRunning || !executionActive) return;
    
    // Execuție periodică la intervale aleatorii între 45-75 secunde
    const executionInterval = setInterval(() => {
      const randomDelay = Math.floor(Math.random() * 30000) + 45000; // 45-75 secunde
      
      setTimeout(() => {
        executeAutonomousTasks();
      }, randomDelay);
    }, 60000); // Interval de bază: 60 secunde
    
    return () => clearInterval(executionInterval);
  }, [isRunning, executionActive, autonomyLevel]);
  
  // Nu renderizăm nimic vizibil
  return null;
};
