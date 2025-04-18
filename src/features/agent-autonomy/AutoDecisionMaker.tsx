
import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { logAgentActivity } from "@/components/agents/monitoring/hooks/utils/activity-processing";
import { useAutonomousEngine } from "@/components/agents/autonomous-engine/AutonomousEngineProvider";

export const AutoDecisionMaker = () => {
  const { toast } = useToast();
  const { isRunning, autonomyLevel } = useAutonomousEngine();
  const [lastDecision, setLastDecision] = useState<Date | null>(null);
  
  // Funcția pentru luarea deciziilor automate
  const makeAutonomousDecision = async () => {
    if (!isRunning || autonomyLevel < 60) return;
    
    try {
      // Înregistrăm activitatea de decizie
      logAgentActivity(
        'decision-maker',
        `Decizie autonomă luată pentru direcționarea propunerilor`,
        'decision'
      );
      
      // Obținem direcția strategică curentă
      const { data: stats, error: statsError } = await supabase.functions.invoke('monitor-agent-proposals', {
        body: { action: 'getStats' }
      });
      
      if (statsError) {
        console.error('Eroare la obținerea statisticilor:', statsError);
        return;
      }
      
      const currentDirection = stats?.data?.strategicInfo?.currentDirection || 'optimization';
      console.log(`Direcția curentă: ${currentDirection}`);
      
      // Evaluăm dacă trebuie să schimbăm direcția
      // Implementăm o logică simplă pentru început - schimbăm direcția la fiecare 10 minute
      if (lastDecision && (new Date().getTime() - lastDecision.getTime() > 10 * 60 * 1000)) {
        // Alegem o nouă direcție diferită de cea curentă
        const directions = ["optimization", "innovation", "integration", "security", "autonomy"];
        const filteredDirections = directions.filter(d => d !== currentDirection);
        const newDirection = filteredDirections[Math.floor(Math.random() * filteredDirections.length)];
        
        // Actualizăm direcția
        const { error: updateError } = await supabase.functions.invoke('monitor-agent-proposals', {
          body: { 
            action: 'updateStrategy',
            direction: newDirection
          }
        });
        
        if (updateError) {
          console.error('Eroare la actualizarea direcției:', updateError);
        } else {
          toast({
            title: "Schimbare automată de direcție",
            description: `Sistemul a decis să schimbe direcția strategică la: ${newDirection}`,
            duration: 5000,
          });
          
          // Înregistrăm decizia
          logAgentActivity(
            'decision-maker',
            `Schimbare automată de direcție strategică la: ${newDirection}`,
            'strategic-decision'
          );
        }
      }
      
      setLastDecision(new Date());
    } catch (error) {
      console.error('Eroare în timpul procesului decizional:', error);
    }
  };
  
  // Planificăm deciziile la intervale regulate
  useEffect(() => {
    if (!isRunning) return;
    
    // Prima decizie după 5 minute
    const initialTimer = setTimeout(() => {
      makeAutonomousDecision();
    }, 5 * 60 * 1000);
    
    // Decizii la fiecare 4-6 minute
    const decisionInterval = setInterval(() => {
      const randomDelay = Math.floor(Math.random() * 2 * 60 * 1000); // 0-2 minute delay aleatoriu
      
      setTimeout(() => {
        makeAutonomousDecision();
      }, randomDelay);
    }, 4 * 60 * 1000); // Interval de bază: 4 minute
    
    return () => {
      clearTimeout(initialTimer);
      clearInterval(decisionInterval);
    };
  }, [isRunning, autonomyLevel]);
  
  // Componentă invizibilă - nu renderizăm nimic
  return null;
};
