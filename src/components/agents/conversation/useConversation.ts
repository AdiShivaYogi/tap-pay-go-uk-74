
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Agent, DEMO_RESPONSES } from "../agents-data";
import { supabase } from "@/integrations/supabase/client";

export interface Message {
  id: string;
  text: string;
  sender: "user" | "agent";
  timestamp: Date;
}

export const useConversation = (agent: Agent, isListening: boolean) => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [typingIndicator, setTypingIndicator] = useState(false);
  const [hasDeepseekKey, setHasDeepseekKey] = useState<boolean | null>(null);
  const [isApiLoading, setIsApiLoading] = useState(false);
  const [activeTask, setActiveTask] = useState<any>(null);
  
  // Verificăm dacă există o cheie API Deepseek configurată
  useEffect(() => {
    const checkDeepseekKey = async () => {
      try {
        // Încercăm să obținem o confirmare că există o cheie API configurată
        setIsApiLoading(true);
        const { data, error } = await supabase.functions.invoke('check-deepseek-key', {
          body: {}
        });
        
        if (!error && data?.hasKey) {
          setHasDeepseekKey(true);
          console.log('Cheie Deepseek API configurată corect:', data.keyInfo);
        } else {
          setHasDeepseekKey(false);
          console.log('Nu există o cheie Deepseek API configurată sau a apărut o eroare:', error);
        }
      } catch (err) {
        console.error('Eroare la verificarea cheii Deepseek:', err);
        setHasDeepseekKey(false);
      } finally {
        setIsApiLoading(false);
      }
    };
    
    checkDeepseekKey();
  }, []);
  
  // Simulează primirea unui mesaj de la agent
  useEffect(() => {
    if (messages.length === 0) {
      // Mesaj inițial de întâmpinare
      const initialMessage = {
        id: `agent-${Date.now()}`,
        text: `Bună! Sunt asistentul specializat pentru ${agent.name}. Cu ce te pot ajuta astăzi?`,
        sender: "agent" as const,
        timestamp: new Date()
      };
      
      setTimeout(() => {
        setMessages([initialMessage]);
      }, 500);
    }
  }, [agent.id]);

  // Verifică dacă există taskuri asignate pentru acest agent
  useEffect(() => {
    const checkAgentTasks = async () => {
      if (agent && hasDeepseekKey === true) {
        try {
          const { data, error } = await supabase.functions.invoke('agent-roadmap-tasks', {
            body: { 
              action: 'getAssignedTasks',
              agentId: agent.id
            }
          });
          
          if (!error && data?.data && data.data.length > 0) {
            // Dacă există taskuri, setează unul activ
            setActiveTask(data.data[0]);
            
            // Informează utilizatorul despre taskul activ
            const taskMessage = {
              id: `agent-task-${Date.now()}`,
              text: `Am observat că lucrez la taskul "${data.data[0].title}". Pot continua progresul la acesta sau te pot asista cu orice altă întrebare legată de ${agent.name}.`,
              sender: "agent" as const,
              timestamp: new Date()
            };
            
            if (messages.length === 1) {  // Doar după mesajul de bun venit
              setTimeout(() => {
                setMessages(prev => [...prev, taskMessage]);
              }, 1000);
            }
          }
        } catch (err) {
          console.error('Eroare la verificarea taskurilor agentului:', err);
        }
      }
    };
    
    checkAgentTasks();
  }, [agent, hasDeepseekKey]);

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
        const newMessage = {
          id: `agent-${Date.now()}`,
          text: randomResponse,
          sender: "agent" as const,
          timestamp: new Date()
        };
        
        setTypingIndicator(true);
        
        // Simulează tastarea
        setTimeout(() => {
          setTypingIndicator(false);
          setMessages(prev => [...prev, newMessage]);
          toast({
            title: "Răspuns primit",
            description: "Agentul a răspuns la întrebarea ta."
          });
        }, 2000);
      }, randomTime);
    }
    
    return () => clearTimeout(listeningTimer);
  }, [isListening, agent.id, toast]);

  const handleSendMessage = async (text: string) => {
    // Adaugă mesajul utilizatorului
    const userMessage = {
      id: `user-${Date.now()}`,
      text: text,
      sender: "user" as const,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Simulează tastarea agentului
    setTypingIndicator(true);
    
    // Verificăm dacă avem o cheie API Deepseek configurată
    if (hasDeepseekKey === true) {
      try {
        console.log('Generăm răspuns folosind Deepseek API');
        
        // Pregătim contextul pentru agent, inclusiv despre taskurile active dacă există
        const context = activeTask ? 
          `Lucrezi la taskul: ${activeTask.title} - ${activeTask.description}` : 
          '';
        
        // Apelăm edge function pentru a genera un răspuns folosind Deepseek API
        const { data, error } = await supabase.functions.invoke('generate-agent-response', {
          body: { 
            message: text,
            agentId: agent.id,
            agentType: agent.name,
            agentDescription: agent.description,
            context: context,
            activeTask: activeTask
          }
        });
        
        if (error) {
          console.error('Eroare la apelul către generate-agent-response:', error);
          throw new Error(error.message);
        }
        
        console.log('Răspuns primit de la Deepseek API:', data);
        
        // Verificăm dacă răspunsul conține actualizări de task
        if (data?.taskUpdate && activeTask) {
          // Actualizăm progresul taskului în baza de date
          await supabase.functions.invoke('agent-roadmap-tasks', {
            body: { 
              action: 'updateTaskProgress',
              agentId: agent.id,
              taskId: activeTask.id,
              progressData: {
                progress: data.taskUpdate.progress || activeTask.progress + 5,
                notes: `Progres actualizat în urma conversației: ${text}`,
                updateMainTask: true
              }
            }
          });
          
          // Actualizăm starea taskului activ local
          setActiveTask(prev => ({
            ...prev,
            progress: data.taskUpdate.progress || prev.progress + 5
          }));
        }
        
        // Afișăm răspunsul generat
        setTimeout(() => {
          const agentMessage = {
            id: `agent-${Date.now()}`,
            text: data?.response || "Îmi pare rău, nu am putut genera un răspuns. Te rog încearcă din nou.",
            sender: "agent" as const,
            timestamp: new Date()
          };
          
          setTypingIndicator(false);
          setMessages(prev => [...prev, agentMessage]);
          
          toast({
            title: "Răspuns AI generat",
            description: "Răspunsul a fost generat folosind Deepseek AI."
          });
        }, 1000);
      } catch (err) {
        console.error('Eroare la generarea răspunsului:', err);
        
        // Revenim la răspunsurile demo în caz de eroare
        setTimeout(() => {
          const responses = DEMO_RESPONSES[agent.id] || ["Îmi pare rău, dar nu am un răspuns pentru această întrebare."];
          const randomResponse = responses[Math.floor(Math.random() * responses.length)];
          
          const agentMessage = {
            id: `agent-${Date.now()}`,
            text: randomResponse,
            sender: "agent" as const,
            timestamp: new Date()
          };
          
          setTypingIndicator(false);
          setMessages(prev => [...prev, agentMessage]);
          
          toast({
            variant: "destructive",
            title: "Eroare",
            description: "Nu s-a putut genera un răspuns. S-a folosit un răspuns predefinit.",
          });
        }, 2000);
      }
    } else {
      // Folosim răspunsuri demo dacă nu avem cheie Deepseek
      console.log('Folosim răspunsuri predefinite (cheia API nu este configurată)');
      setTimeout(() => {
        const responses = DEMO_RESPONSES[agent.id] || ["Îmi pare rău, dar nu am un răspuns pentru această întrebare."];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        const agentMessage = {
          id: `agent-${Date.now()}`,
          text: randomResponse,
          sender: "agent" as const,
          timestamp: new Date()
        };
        
        setTypingIndicator(false);
        setMessages(prev => [...prev, agentMessage]);
        
        if (hasDeepseekKey === false) {
          toast({
            variant: "default",  // Changed from "warning" to "default"
            title: "Mod demonstrativ",
            description: "Folosim răspunsuri predefinite. Configurați cheia API pentru răspunsuri avansate."
          });
        }
      }, 2000);
    }
  };

  const assignTaskToAgent = async (taskId) => {
    try {
      const { data, error } = await supabase.functions.invoke('agent-roadmap-tasks', {
        body: { 
          action: 'getTaskDetails',
          taskId: taskId
        }
      });
      
      if (error) throw error;
      
      setActiveTask(data.data);
      
      const taskAssignedMessage = {
        id: `agent-${Date.now()}`,
        text: `Am primit taskul "${data.data.title}". Voi începe să lucrez la acest task și te voi ține la curent cu progresul. Ai vreo instrucțiune specifică pentru mine?`,
        sender: "agent" as const,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, taskAssignedMessage]);
      
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
