import { useState, useEffect } from 'react';
import { AgentTaskExtended, AgentTask } from '../types/task.types';
import { supabase } from "@/integrations/supabase/types-extension";
import { calculateDifficulty, calculateCost, calculateRecommendationScore, getAgentTypeFromId } from '../utils/task-calculations';
import { useToast } from "@/hooks/use-toast";

export const useAgentTasks = (agentId: string | null) => {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<AgentTaskExtended[]>([]);
  const [loading, setLoading] = useState(false);
  const [assigningTask, setAssigningTask] = useState<string | null>(null);
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [sortBy, setSortBy] = useState<string>("recommended");

  useEffect(() => {
    const fetchTasks = async () => {
      if (!agentId) return;
      
      try {
        setLoading(true);
        const { data, error } = await supabase.functions.invoke('agent-roadmap-tasks', {
          body: { 
            action: 'getAssignedTasks',
            agentId: agentId,
            includeAllAvailable: true
          }
        });
        
        if (error) throw error;
        
        const enrichedTasks = (data?.data || []).map((task: AgentTask) => ({
          ...task,
          difficulty: calculateDifficulty(task),
          costEstimate: calculateCost(task),
          recommendationScore: calculateRecommendationScore(task, agentId)
        }));
        
        setTasks(enrichedTasks);
      } catch (err) {
        console.error('Eroare la încărcarea taskurilor:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTasks();
  }, [agentId]);

  useEffect(() => {
    console.log("useAgentTasks: sortBy changed to", sortBy);
  }, [sortBy]);

  const handleAssignTask = async (taskId: string, onSelectTask?: (taskId: string) => Promise<boolean>) => {
    if (!onSelectTask) return;
    
    setAssigningTask(taskId);
    try {
      const success = await onSelectTask(taskId);
      if (success) {
        setTasks(tasks.map(task => 
          task.id === taskId ? {...task, assigned: true} : task
        ));
        
        toast({
          title: "Task atribuit",
          description: "Agentul a început să lucreze la acest task."
        });
      }
    } catch (err) {
      console.error('Eroare la asignarea taskului:', err);
      toast({
        variant: "destructive",
        title: "Eroare",
        description: "Nu s-a putut atribui taskul agentului."
      });
    } finally {
      setAssigningTask(null);
    }
  };

  const handleGenerateNewTaskProposal = async () => {
    if (!agentId) return;
    
    setIsCreatingTask(true);
    console.log(`Generare propunere task pentru agent: ${agentId}`);
    
    try {
      const { data: responseData, error: responseError } = await supabase.functions.invoke('generate-agent-response', {
        body: { 
          message: "Creează o propunere detaliată pentru un task nou de dezvoltare care ar ajuta platforma TapPayGo",
          agentId: agentId,
          agentType: getAgentTypeFromId(agentId),
          agentDescription: "Agent specializat în generarea de propuneri pentru îmbunătățirea platformei",
          isTaskProposal: true
        }
      });
      
      if (responseError) throw responseError;
      
      const proposalResponse = responseData.response;
      
      const titleMatch = proposalResponse.match(/Titlu:?\s*(.*?)(?:\n|$)/i);
      const descriptionMatch = proposalResponse.match(/Descriere:?\s*(.*?)(?:\n\n|\n[A-Z]|$)/is);
      const benefitsMatch = proposalResponse.match(/Beneficii:?\s*(.*?)(?:\n\n|\n[A-Z]|$)/is);
      const implementationMatch = proposalResponse.match(/(?:Pași tehnici|Implementare):?\s*(.*?)(?:\n\n|\n[A-Z]|$)/is);
      
      const title = titleMatch ? titleMatch[1].trim() : "Propunere nouă";
      const description = descriptionMatch ? descriptionMatch[1].trim() : proposalResponse.substring(0, 200);
      const benefits = benefitsMatch ? benefitsMatch[1].trim() : "";
      const implementation = implementationMatch ? implementationMatch[1].trim() : "";
      
      const fullDetails = `${description}\n\nBeneficii: ${benefits}\n\nImplementare: ${implementation}`;
      
      const agentToCategory = {
        'payment-agent': 'payment',
        'support-agent': 'product',
        'analytics-agent': 'monitoring',
        'security-agent': 'security',
        'ai-assistant': 'product'
      };
      
      const category = agentToCategory[agentId as keyof typeof agentToCategory] || 'product';
      
      const { data, error } = await supabase.functions.invoke('agent-roadmap-tasks', {
        body: { 
          action: 'proposeNewTask',
          agentId: agentId,
          taskProposal: {
            title: title,
            description: description,
            category: category,
            implementation_details: fullDetails,
            notes: "Propunere generată automat de agent"
          }
        }
      });
      
      console.log('Răspuns generare propunere:', proposalResponse);
      console.log('Rezultat trimitere propunere:', { data, error });
      
      if (error) throw error;
      
      toast({
        title: "Propunere trimisă",
        description: "Propunerea de task a fost trimisă și așteaptă aprobarea unui administrator.",
      });
      
    } catch (err) {
      console.error('Eroare la generarea propunerii:', err);
      toast({
        variant: "destructive",
        title: "Eroare",
        description: "Nu s-a putut genera propunerea de task."
      });
    } finally {
      setIsCreatingTask(false);
    }
  };

  return {
    tasks,
    loading,
    assigningTask,
    isCreatingTask,
    sortBy,
    setSortBy: (newSort: string) => {
      console.log("Setting sort to:", newSort);
      setSortBy(newSort);
    },
    handleAssignTask,
    handleGenerateNewTaskProposal
  };
};
