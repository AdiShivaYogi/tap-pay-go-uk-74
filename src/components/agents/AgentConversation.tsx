
import React, { useImperativeHandle } from "react";
import { Agent } from "./agents-data";
import { MessageList } from "./conversation/MessageList";
import { MessageInput } from "./conversation/MessageInput";
import { useConversation } from "./conversation/useConversation";

interface AgentConversationProps {
  agent: Agent;
  isListening: boolean;
  setRef?: (ref: any) => void;
}

export const AgentConversation = ({ agent, isListening, setRef }: AgentConversationProps) => {
  const conversation = useConversation(agent, isListening);
  const { messages, typingIndicator, handleSendMessage, activeTask } = conversation;
  
  // Expunem funcțiile din hook către componenta părinte
  React.useEffect(() => {
    if (setRef) {
      setRef(conversation);
    }
  }, [conversation, setRef]);

  return (
    <div className="flex flex-col h-[500px] border-t">
      {activeTask && (
        <div className="bg-muted/20 px-4 py-2 border-b flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Task activ: {activeTask.title}</span>
            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
              Progres: {activeTask.progress || 0}%
            </span>
          </div>
        </div>
      )}
      
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
