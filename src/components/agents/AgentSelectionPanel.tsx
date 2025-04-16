
import { StyledCard, StyledCardHeader, StyledCardTitle, StyledCardContent } from "@/components/ui/cards";
import { Users } from "lucide-react";
import { AgentCard } from "./AgentCard";
import { Agent } from "./agents-data";

interface AgentSelectionPanelProps {
  agents: Agent[];
  activeAgent: string | null;
  onSelectAgent: (agentId: string) => void;
}

export const AgentSelectionPanel = ({ agents, activeAgent, onSelectAgent }: AgentSelectionPanelProps) => {
  return (
    <StyledCard>
      <StyledCardHeader>
        <StyledCardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Agenți disponibili
        </StyledCardTitle>
      </StyledCardHeader>
      <StyledCardContent className="p-4">
        <div className="flex flex-col space-y-4">
          {agents.map((agent) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              isSelected={activeAgent === agent.id}
              onSelect={() => onSelectAgent(agent.id)}
            />
          ))}
        </div>
      </StyledCardContent>
    </StyledCard>
  );
};
