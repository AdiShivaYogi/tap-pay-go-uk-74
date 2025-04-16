
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Agent } from "../agents-data";
import { DEMO_RESPONSES } from "../agents-data";
import { useAgentApi } from "./hooks/useAgentApi";
import { useAgentMessages } from "./hooks/useAgentMessages";
import { useAgentTasks } from "./hooks/useAgentTasks";

export interface Message {
  id: string;
  text: string;
  sender: "user" | "agent";
  timestamp: Date;
}

export const useConversation = (agent: Agent, isListening: boolean) => {
  const { toast } = useToast();
  const [typingIndicator, setTypingIndicator] = useState(false);
  
  // Utilizăm hook-urile separate
  const { hasDeepseekKey, isApiLoading } = useAgentApi();
  const { messages, addUserMessage, addAgentMessage } = useAgentMessages(agent);
  const { activeTask, setActiveTask, assignTaskToAgent } = useAgentTasks(agent.id);

  // Efect pentru simularea ascultării active
  useEffect(() => {
    let listeningTimer: ReturnType<typeof setTimeout>;
    
    if (isListening) {
      // Simulăm primirea unui răspuns după un timp aleatoriu
      const randomTime = 5000 + Math.random() * 5000;
      listeningTimer = setTimeout(() => {
        // Alege un răspuns aleatoriu din lista de demo
        const responses = DEMO_RESPONSES[agent.id] || ["Îmi pare rău, dar nu am un răspuns pentru această întrebare."];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        // Simulează primirea mesajului
        setTypingIndicator(true);
        
        // Simulează tastarea
        setTimeout(() => {
          setTypingIndicator(false);
          addAgentMessage(randomResponse);
          
          toast({
            title: "Răspuns primit",
            description: "Agentul a răspuns la întrebarea ta."
          });
        }, 2000);
      }, randomTime);
    }
    
    return () => clearTimeout(listeningTimer);
  }, [isListening, agent.id, toast, addAgentMessage]);

  const handleSendMessage = async (text: string) => {
    // Adaugă mesajul utilizatorului
    addUserMessage(text);
    
    // Simulează tastarea agentului
    setTypingIndicator(true);
    
    try {
      const { response, taskUpdate } = await generateResponse(text, agent, activeTask, hasDeepseekKey);
      
      // Actualizăm taskul dacă este necesar
      if (taskUpdate && activeTask) {
        await updateTaskProgress(agent.id, activeTask.id, taskUpdate);
        setActiveTask({
          ...activeTask,
          progress: taskUpdate.progress || activeTask.progress + 5
        });
      }
      
      // Afișăm răspunsul generat
      setTimeout(() => {
        setTypingIndicator(false);
        addAgentMessage(response);
        
        toast({
          title: hasDeepseekKey ? "Răspuns AI generat" : "Mod demonstrativ",
          description: hasDeepseekKey 
            ? "Răspunsul a fost generat folosind Deepseek AI."
            : "Folosim răspunsuri predefinite. Configurați cheia API pentru răspunsuri avansate."
        });
      }, 1000);
    } catch (err) {
      console.error('Eroare la generarea răspunsului:', err);
      
      // Revenim la răspunsurile demo în caz de eroare
      setTimeout(() => {
        const responses = DEMO_RESPONSES[agent.id] || ["Îmi pare rău, dar nu am un răspuns pentru această întrebare."];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        setTypingIndicator(false);
        addAgentMessage(randomResponse);
        
        toast({
          variant: "destructive",
          title: "Eroare",
          description: "Nu s-a putut genera un răspuns. S-a folosit un răspuns predefinit.",
        });
      }, 2000);
    }
  };

  // Helper function to generate response (local to useConversation)
  const generateResponse = async (text: string, agent: Agent, activeTask: any, hasDeepseekKey: boolean | null) => {
    if (hasDeepseekKey === true) {
      const { data, error } = await import("@/integrations/supabase/types-extension").then(({ supabase }) => 
        supabase.functions.invoke('generate-agent-response', {
          body: { 
            message: text,
            agentId: agent.id,
            agentType: agent.name,
            agentDescription: agent.description,
            context: activeTask ? `Lucrezi la taskul: ${activeTask.title} - ${activeTask.description}` : '',
            activeTask: activeTask
          }
        })
      );
      
      if (error) throw error;
      return {
        response: data?.response || "Îmi pare rău, nu am putut genera un răspuns.",
        taskUpdate: data?.taskUpdate
      };
    } else {
      // Demo responses for when API key is not available
      const responses = DEMO_RESPONSES[agent.id] || ["Îmi pare rău, dar nu am un răspuns pentru această întrebare."];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      return { 
        response: randomResponse,
        taskUpdate: null
      };
    }
  };
  
  // Helper function to update task progress (local to useConversation)
  const updateTaskProgress = async (agentId: string, taskId: string, taskUpdate: any) => {
    try {
      await import("@/integrations/supabase/types-extension").then(({ supabase }) => 
        supabase.functions.invoke('agent-roadmap-tasks', {
          body: { 
            action: 'updateTaskProgress',
            agentId: agentId,
            taskId: taskId,
            progressData: {
              progress: taskUpdate.progress || 0,
              notes: taskUpdate.notes || `Progres actualizat în urma conversației`,
              updateMainTask: true
            }
          }
        })
      );
    } catch (error) {
      console.error("Error updating task progress:", error);
    }
  };

  return {
    messages,
    typingIndicator,
    handleSendMessage,
    hasDeepseekKey,
    isApiLoading,
    activeTask,
    assignTaskToAgent
  };
};
