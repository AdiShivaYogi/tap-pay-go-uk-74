
import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Agent } from "../agents-data";

interface TypingIndicatorProps {
  agent: Agent;
}

export const TypingIndicator = ({ agent }: TypingIndicatorProps) => {
  const AgentIcon = agent.icon;
  
  return (
    <div className="flex justify-start">
      <div className="flex items-start gap-3 max-w-[80%]">
        <Avatar className={`${agent.color.replace('text', 'bg')}/20`}>
          <AvatarFallback>
            <AgentIcon className={`h-5 w-5 ${agent.color}`} />
          </AvatarFallback>
        </Avatar>
        
        <div className="rounded-lg p-3 bg-muted flex items-center">
          <div className="flex space-x-1">
            <div className="h-2 w-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-2 w-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-2 w-2 bg-muted-foreground/50 rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
