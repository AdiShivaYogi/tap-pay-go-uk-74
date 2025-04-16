
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/types-extension";
import { useToast } from "@/hooks/use-toast";

export const useAgentTasks = (agentId: string) => {
  const { toast } = useToast();
  const [activeTask, setActiveTask] = useState<any>(null);
  
  // Verifică dacă există taskuri asignate pentru acest agent
  useEffect(() => {
    const checkAgentTasks = async () => {
      if (!agentId) return;
      
      try {
        const { data, error } = await supabase.functions.invoke('agent-roadmap-tasks', {
          body: { 
            action: 'getAssignedTasks',
            agentId: agentId
          }
        });
        
        if (!error && data?.data && data.data.length > 0) {
          // Dacă există taskuri, setează unul activ
          setActiveTask(data.data[0]);
        }
      } catch (err) {
        console.error('Eroare la verificarea taskurilor agentului:', err);
      }
    };
    
    checkAgentTasks();
  }, [agentId]);

  // Funcție pentru atribuirea unui nou task agentului
  const assignTaskToAgent = useCallback(async (taskId: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('agent-roadmap-tasks', {
        body: { 
          action: 'getTaskDetails',
          taskId: taskId
        }
      });
      
      if (error) throw error;
      
      setActiveTask(data.data);
      
      toast({
        title: "Task atribuit",
        description: `Task-ul "${data.data.title}" a fost atribuit agentului.`
      });
      
      return true;
    } catch (err) {
      console.error('Eroare la asignarea taskului:', err);
      
      toast({
        variant: "destructive",
        title: "Eroare",
        description: "Nu s-a putut asigna taskul către agent."
      });
      
      return false;
    }
  }, [toast]);

  return {
    activeTask,
    setActiveTask,
    assignTaskToAgent
  };
};
