
import React from "react";
import { Agent } from "./agents-data";
import { MessageList } from "./conversation/MessageList";
import { MessageInput } from "./conversation/MessageInput";
import { useConversation } from "./conversation/useConversation";

interface AgentConversationProps {
  agent: Agent;
  isListening: boolean;
}

export const AgentConversation = ({ agent, isListening }: AgentConversationProps) => {
  const { messages, typingIndicator, handleSendMessage } = useConversation(agent, isListening);

  return (
    <div className="flex flex-col h-[500px] border-t">
      <MessageList 
        messages={messages} 
        agent={agent} 
        typingIndicator={typingIndicator} 
      />
      
      <div className="p-4 border-t bg-background/80">
        <MessageInput 
          onSendMessage={handleSendMessage} 
          isListening={isListening} 
        />
      </div>
    </div>
  );
};
