
import { useState } from "react";
import { LucideIcon, PowerIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

interface Agent {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
  status: "online" | "offline" | "busy";
  powerLevel: number;
  relevance: "core" | "support" | "auxiliary";
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
      <div className={`h-10 w-10 rounded-full ${agent.color.replace('text', 'bg')}/20 flex items-center justify-center`}>
        <agent.icon className={`h-5 w-5 ${agent.color}`} />
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
        
        <div className="flex items-center gap-1 mt-1">
          <Badge 
            variant={
              agent.relevance === "core" ? "default" : 
              agent.relevance === "support" ? "outline" : "secondary"
            }
            className="text-[10px] h-5"
          >
            {agent.relevance === "core" ? "Core" : 
             agent.relevance === "support" ? "Support" : "Auxiliary"}
          </Badge>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-muted-foreground">Nivel: {agent.powerLevel}/10</span>
                  <div className="bg-gray-200 h-1.5 w-12 rounded-full">
                    <div 
                      className={`h-full rounded-full ${
                        agent.powerLevel >= 8 ? 'bg-green-500' : 
                        agent.powerLevel >= 5 ? 'bg-amber-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${agent.powerLevel * 10}%` }}
                    ></div>
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Nivel de putere: {agent.powerLevel}/10</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      {isSelected && (
        <div className="absolute top-1/2 -right-1 transform -translate-y-1/2 h-4 w-4 bg-primary rotate-45" />
      )}
    </div>
  );
};
