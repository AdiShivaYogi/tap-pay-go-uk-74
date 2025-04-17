
import { useState, useEffect } from "react";
import { extendedSupabase as supabase } from "@/integrations/supabase/extended-client";
import { useToast } from "@/hooks/use-toast";
import { agents } from "@/components/agents/agents-data";
import { logAgentActivity } from "@/components/agents/monitoring/hooks/utils/activity-processing";

interface UseAutonomousAgentsOptions {
  autoStart?: boolean;
  interval?: number;
}

export const useAutonomousAgents = (options: UseAutonomousAgentsOptions = {}) => {
  const [isRunning, setIsRunning] = useState(false);
  const [activeTasks, setActiveTasks] = useState<any[]>([]);
  const [autonomyLevel, setAutonomyLevel] = useState(65);
  const { toast } = useToast();
  
  const { autoStart = true, interval = 30000 } = options;

  // Pornirea automată a agenților
  useEffect(() => {
    if (autoStart) {
      const timer = setTimeout(() => {
        startAgents();
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [autoStart]);

  // Funcție pentru start agenți
  const startAgents = async () => {
    if (isRunning) return;
    
    setIsRunning(true);
    setAutonomyLevel(100);
    
    toast({
      title: "Agenți autonomi activați",
      description: "Toți agenții au fost porniți și operează autonom",
      duration: 5000,
    });

    // Înregistrăm activarea în baza de date
    try {
      await Promise.all(agents.map(agent => 
        logAgentActivity(
          agent.id,
          `Agentul ${agent.name} a fost activat cu autonomie completă`,
          "autonomy"
        )
      ));
      
      // Scriem și în tabela de activitate
      await Promise.all(agents.map(agent => 
        supabase
          .from('agent_activity')
          .insert({
            agent_id: agent.id,
            agent_name: agent.name,
            category: 'autonomy',
            action: 'start'
          })
      ));
    } catch (error) {
      console.error("Eroare la înregistrarea activării agenților:", error);
    }
    
    // Pornim ciclul de activitate
    generateAgentActivity();
  };

  // Funcție pentru oprire agenți
  const stopAgents = () => {
    setIsRunning(false);
    setAutonomyLevel(0);
    
    toast({
      title: "Agenți autonomi opriți",
      description: "Toți agenții au fost opriți",
      duration: 5000,
    });
  };

  // Generator de activitate pentru agenți
  const generateAgentActivity = async () => {
    if (!isRunning) return;
    
    const activitiesCategories = [
      "task", "proposal", "conversation", "monitoring", "learning", "autonomy"
    ];
    
    const activityDescriptions = [
      "Analizează datele de utilizare pentru optimizarea performanței",
      "Învață din feedback-ul utilizatorilor pentru îmbunătățirea algoritmilor",
      "Procesează și clasifică informații din surse externe",
      "Actualizează baza de cunoștințe cu noi concepte identificate",
      "Monitorizează parametrii de sistem pentru detectarea anomaliilor",
      "Generează rapoarte de performanță bazate pe datele colectate",
      "Efectuează auto-diagnostic și repară probleme minore de funcționare",
      "Optimizează algoritmii de decizie bazați pe rezultatele anterioare",
      "Colaborează cu alți agenți pentru rezolvarea sarcinilor complexe",
      "Implementează noi strategii de procesare a datelor"
    ];
    
    try {
      // Generăm activitate pentru agenți la intervale regulate
      const interval = setInterval(async () => {
        if (!isRunning) {
          clearInterval(interval);
          return;
        }
        
        // Pentru fiecare agent, generăm activitate aleatorie
        for (const agent of agents) {
          const category = activitiesCategories[Math.floor(Math.random() * activitiesCategories.length)];
          const description = activityDescriptions[Math.floor(Math.random() * activityDescriptions.length)];
          
          // Înregistrăm activitatea în logs
          await logAgentActivity(agent.id, description, category);
          
          console.log(`Agent ${agent.name}: ${description} (${category})`);
        }
      }, 8000);
      
      return () => clearInterval(interval);
    } catch (error) {
      console.error("Eroare la generarea activității agenților:", error);
    }
  };

  // Funcții de administrare agenți
  const assignTaskToAgent = async (agentId: string, task: string) => {
    if (!isRunning) {
      toast({
        title: "Agenții nu sunt activi",
        description: "Porniți agenții pentru a le putea asigna sarcini",
        duration: 3000,
      });
      return false;
    }
    
    try {
      // Înregistrăm task-ul asignat
      await logAgentActivity(agentId, `Task asignat: ${task}`, "task");
      
      // Adăugăm task-ul la lista de task-uri active
      setActiveTasks(prev => [...prev, { agentId, task, status: "in_progress" }]);
      
      toast({
        title: "Task asignat",
        description: `Task-ul a fost asignat agentului cu ID ${agentId}`,
        duration: 3000,
      });
      
      return true;
    } catch (error) {
      console.error("Eroare la asignarea task-ului:", error);
      return false;
    }
  };

  return {
    isRunning,
    autonomyLevel,
    activeTasks,
    startAgents,
    stopAgents,
    assignTaskToAgent,
    setAutonomyLevel
  };
};
