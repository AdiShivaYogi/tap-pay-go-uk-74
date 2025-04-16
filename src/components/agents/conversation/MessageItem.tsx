
import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User2 } from "lucide-react";
import { Agent } from "../agents-data";

export interface Message {
  id: string;
  text: string;
  sender: "user" | "agent";
  timestamp: Date;
}

interface MessageItemProps {
  message: Message;
  agent: Agent;
}

export const MessageItem = ({ message, agent }: MessageItemProps) => {
  const isUserMessage = message.sender === "user";
  const AgentIcon = agent.icon;

  return (
    <div className={`flex ${isUserMessage ? "justify-end" : "justify-start"}`}>
      <div className={`flex items-start gap-3 max-w-[80%] ${isUserMessage ? "flex-row-reverse" : ""}`}>
        <Avatar className={isUserMessage ? "bg-primary/20" : `${agent.color.replace('text', 'bg')}/20`}>
          <AvatarFallback>
            {isUserMessage ? (
              <User2 className="h-5 w-5 text-primary" />
            ) : (
              <AgentIcon className={`h-5 w-5 ${agent.color}`} />
            )}
          </AvatarFallback>
        </Avatar>
        
        <div className={`rounded-lg p-3 ${
          isUserMessage 
            ? "bg-primary text-primary-foreground" 
            : "bg-muted"
        }`}>
          <p className="text-sm">{message.text}</p>
          <p className="text-xs opacity-70 mt-1">
            {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
          </p>
        </div>
      </div>
    </div>
  );
};
