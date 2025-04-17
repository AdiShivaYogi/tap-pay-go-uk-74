
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AgentSelectorProps {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  agents: { id: string; name: string }[];
}

export const AgentSelector: React.FC<AgentSelectorProps> = ({
  label,
  value,
  onValueChange,
  agents
}) => {
  return (
    <div>
      <label className="text-xs mb-1 block">{label}</label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Selectează agentul"/>
        </SelectTrigger>
        <SelectContent>
          {agents.map(agent => (
            <SelectItem key={`${label}-${agent.id}`} value={agent.id}>
              {agent.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
