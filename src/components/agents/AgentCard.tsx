
import { useState } from "react";
import { LucideIcon, PowerIcon, Star, Zap } from "lucide-react";
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
  const isHighValue = agent.powerLevel >= 8;
  const platformValue = "1M+ €";
  
  // Determinăm impactul agentului asupra valorii platformei
  const getValueImpact = () => {
    if (agent.relevance === "core") return "Impact major în valoarea platformei";
    if (agent.relevance === "support") return "Contribuie la menținerea valorii platformei";
    return "Adaugă valoare complementară";
  };
  
  return (
    <div 
      className={`relative flex items-center p-3 border rounded-lg transition-all cursor-pointer
        ${isSelected ? 'border-primary bg-primary/5 shadow-md' : 'hover:border-primary/50'}`}
      onClick={onSelect}
    >
      <div className={`h-12 w-12 rounded-full ${agent.color.replace('text', 'bg')}/20 flex items-center justify-center`}>
        <agent.icon className={`h-6 w-6 ${agent.color}`} />
      </div>
      
      <div className="ml-3 flex-1">
        <div className="flex items-center">
          <h4 className="font-medium flex items-center">
            {agent.name}
            {isHighValue && <Zap className="h-3.5 w-3.5 ml-1 text-amber-500" />}
          </h4>
          
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
                  <span className="text-xs text-muted-foreground flex items-center">
                    <PowerIcon className="h-3 w-3 mr-0.5" />
                    {agent.powerLevel}/10
                  </span>
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
              <TooltipContent side="top" className="w-60">
                <p className="font-medium">Nivel de putere: {agent.powerLevel}/10</p>
                <p className="text-xs mt-1">{getValueImpact()}</p>
                {isHighValue && (
                  <div className="flex items-center mt-1 text-xs text-amber-500">
                    <Star className="h-3 w-3 mr-1 fill-amber-500" />
                    <span>Contribuie semnificativ la evaluarea platformei de {platformValue}</span>
                  </div>
                )}
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
