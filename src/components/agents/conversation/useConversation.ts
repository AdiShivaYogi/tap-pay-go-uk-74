
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
        // Apelăm edge function pentru a genera un răspuns folosind Deepseek API
        const { data, error } = await supabase.functions.invoke('generate-agent-response', {
          body: { 
            message: text,
            agentId: agent.id,
            agentType: agent.name,
            agentDescription: agent.description
          }
        });
        
        if (error) {
          console.error('Eroare la apelul către generate-agent-response:', error);
          throw new Error(error.message);
        }
        
        console.log('Răspuns primit de la Deepseek API:', data);
        
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

  return {
    messages,
    typingIndicator,
    handleSendMessage,
    hasDeepseekKey,
    isApiLoading
  };
};
