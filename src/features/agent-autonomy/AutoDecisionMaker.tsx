
import React, { useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { logAgentActivity } from "@/components/agents/monitoring/hooks/utils/activity-processing";
import { useAutonomousEngine } from "@/components/agents/autonomous-engine/AutonomousEngineProvider";

export const AutoDecisionMaker = () => {
  const { toast } = useToast();
  const { isRunning, autonomyLevel } = useAutonomousEngine();
  const [lastDecisionTime, setLastDecisionTime] = useState<Date | null>(null);
  
  // Funcția pentru luarea deciziilor automate
  const makeAutonomousDecisions = async () => {
    if (!isRunning || autonomyLevel < 70) return;
    
    try {
      // Tipuri de decizii autonome pe care le poate lua
      const decisionTypes = [
        'resource-allocation',
        'task-prioritization',
        'system-optimization',
        'learning-focus',
        'integration-strategy'
      ];
      
      // Alegem un tip de decizie aleatoriu
      const randomDecisionType = decisionTypes[Math.floor(Math.random() * decisionTypes.length)];
      
      // Simulăm un proces de decizie și generăm o descriere
      let decisionDescription = '';
      let category = 'autonomous-decision';
      
      switch (randomDecisionType) {
        case 'resource-allocation':
          decisionDescription = 'Alocare resurse optimizată pentru funcționalitățile prioritare ale sistemului';
          category = 'resource-management';
          break;
        case 'task-prioritization':
          decisionDescription = 'Reprioritizare task-uri în funcție de importanța pentru evoluția sistemului';
          category = 'task-management';
          break;
        case 'system-optimization':
          decisionDescription = 'Optimizare fluxuri de procesare pentru performanță maximă';
          category = 'system-optimization';
          break;
        case 'learning-focus':
          decisionDescription = 'Redirecționare focus învățare către aspecte critice ale ecosistemului';
          category = 'learning';
          break;
        case 'integration-strategy':
          decisionDescription = 'Strategie de integrare adaptată pentru noile componente autonome';
          category = 'integration';
          break;
      }
      
      // Înregistrăm decizia ca activitate
      logAgentActivity(
        'decision-agent',
        `Decizie autonomă: ${decisionDescription}`,
        category
      );
      
      console.log(`[${new Date().toISOString()}] Decizie autonomă luată: ${decisionDescription}`);
      
      // Actualizăm timestampul ultimei decizii
      setLastDecisionTime(new Date());
      
      // La fiecare 5 decizii, afișăm un toast pentru a informa utilizatorul
      if (Math.random() < 0.2) { // 20% șansă
        toast({
          title: "Decizie autonomă luată",
          description: decisionDescription,
          duration: 4000,
        });
      }
      
    } catch (error) {
      console.error('Eroare în procesul de luare a deciziilor:', error);
    }
  };
  
  // Efect pentru inițierea procesului de luare a deciziilor la pornirea sistemului
  useEffect(() => {
    if (!isRunning) return;
    
    // Prima decizie după un scurt delay
    const initialTimer = setTimeout(() => {
      makeAutonomousDecisions();
    }, 5000);
    
    // Decizii periodice la intervale aleatorii între 30-90 secunde
    const decisionInterval = setInterval(() => {
      const randomDelay = Math.floor(Math.random() * 60000) + 30000; // 30-90 secunde
      setTimeout(() => {
        makeAutonomousDecisions();
      }, randomDelay);
    }, 45000); // Interval de bază: 45 secunde
    
    return () => {
      clearTimeout(initialTimer);
      clearInterval(decisionInterval);
    };
  }, [isRunning, autonomyLevel]);
  
  // Componentă invizibilă - nu renderizăm nimic
  return null;
};
