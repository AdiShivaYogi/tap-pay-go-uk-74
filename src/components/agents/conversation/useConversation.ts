
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Agent, DEMO_RESPONSES } from "../agents-data";

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

  const handleSendMessage = (text: string) => {
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
    
    // Alege un răspuns aleatoriu din lista de demo
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
    }, 2000);
  };

  return {
    messages,
    typingIndicator,
    handleSendMessage
  };
};
