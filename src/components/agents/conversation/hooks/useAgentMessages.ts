
import { useState, useEffect, useCallback } from "react";
import { Agent } from "../../agents-data";
import { ConversationMessage } from "../useConversation";

export const useAgentMessages = (agent: Agent) => {
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  
  // Mesaj inițial de întâmpinare
  useEffect(() => {
    if (messages.length === 0) {
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
  }, [agent.id, messages.length]);

  // Funcția pentru adăugarea unui mesaj de la utilizator
  const addUserMessage = useCallback((text: string) => {
    const userMessage = {
      id: `user-${Date.now()}`,
      text: text,
      sender: "user" as const,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
  }, []);

  // Funcția pentru adăugarea unui mesaj de la agent
  const addAgentMessage = useCallback((text: string) => {
    const agentMessage = {
      id: `agent-${Date.now()}`,
      text: text,
      sender: "agent" as const,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, agentMessage]);
  }, []);

  return {
    messages,
    addUserMessage,
    addAgentMessage
  };
};
