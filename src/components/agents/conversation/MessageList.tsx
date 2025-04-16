
import React, { useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageItem, Message } from "./MessageItem";
import { TypingIndicator } from "./TypingIndicator";
import { Agent } from "../agents-data";

interface MessageListProps {
  messages: Message[];
  agent: Agent;
  typingIndicator: boolean;
}

export const MessageList = ({ messages, agent, typingIndicator }: MessageListProps) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Efect pentru scroll la noi mesaje
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, typingIndicator]);

  return (
    <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
      <div className="space-y-4">
        {messages.map((message) => (
          <MessageItem 
            key={message.id} 
            message={message} 
            agent={agent} 
          />
        ))}
        
        {typingIndicator && <TypingIndicator agent={agent} />}
      </div>
    </ScrollArea>
  );
};
