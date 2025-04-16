
import { useState } from "react";
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Agent {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
  status: "online" | "offline" | "busy";
}

interface AgentCardProps {
  agent: Agent;
  isSelected: boolean;
  onSelect: () => void;
}

export const AgentCard = ({ agent, isSelected, onSelect }: AgentCardProps) => {
  return (
    <div 
      className={`relative flex items-center p-3 border rounded-lg transition-all cursor-pointer
        ${isSelected ? 'border-primary bg-primary/5' : 'hover:border-primary/50'}`}
      onClick={onSelect}
    >
      <div className={`h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center ${agent.color}`}>
        <agent.icon className="h-5 w-5" />
      </div>
      
      <div className="ml-3 flex-1">
        <div className="flex items-center">
          <h4 className="font-medium">{agent.name}</h4>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="ml-2 flex">
                  <div className={`h-2 w-2 rounded-full ${
                    agent.status === "online" ? "bg-green-500" : 
                    agent.status === "busy" ? "bg-amber-500" : "bg-gray-400"
                  }`} />
                </div>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>{agent.status === "online" ? "Online" : 
                    agent.status === "busy" ? "Ocupat" : "Offline"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-1">{agent.description}</p>
      </div>
      
      {isSelected && (
        <div className="absolute top-1/2 -right-1 transform -translate-y-1/2 h-4 w-4 bg-primary rotate-45" />
      )}
    </div>
  );
};
