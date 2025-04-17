
import { useState, useEffect } from "react";
import { Agent } from "../agents-data";

// Define the type for the conversation task
interface ConversationTask {
  id: string;
  title: string;
  progress: number;
}

// Define the message type
export interface ConversationMessage {
  id: string;
  text: string;
  sender: "user" | "agent";
  timestamp: Date;
}

export const useConversation = (agent: Agent, isListening: boolean) => {
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [typingIndicator, setTypingIndicator] = useState(false);
  const [activeTask, setActiveTask] = useState<ConversationTask | null>(null);

  // Efect pentru mesajele de bun venit
  useEffect(() => {
    if (agent) {
      setMessages([
        {
          id: "welcome-1",
          text: `Bună! Sunt ${agent.name}, sunt aici să te ajut cu ${agent.specialization}.`,
          sender: "agent",
          timestamp: new Date(),
        }
      ]);
    }
  }, [agent]);

  // Efect pentru ascultare
  useEffect(() => {
    if (isListening) {
      // Logică pentru ascultare voce (în implementarea reală)
      console.log("Listening started...");
      return () => {
        console.log("Listening stopped...");
      };
    }
  }, [isListening]);

  // Funcția pentru trimiterea mesajelor
  const handleSendMessage = (text: string) => {
    // Adaugă mesajul utilizatorului
    const userMessage: ConversationMessage = {
      id: `msg-${Date.now()}-user`,
      text,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages(msgs => [...msgs, userMessage]);
    setTypingIndicator(true);
    
    // Simulează răspunsul agentului (în implementarea reală ar fi o cerere API)
    setTimeout(() => {
      const agentMessage: ConversationMessage = {
        id: `msg-${Date.now()}-agent`,
        text: `Răspuns la: ${text}`,
        sender: "agent",
        timestamp: new Date(),
      };
      
      setTypingIndicator(false);
      setMessages(msgs => [...msgs, agentMessage]);
    }, 1500);
  };
  
  return {
    messages,
    typingIndicator,
    handleSendMessage,
    activeTask
  };
};
