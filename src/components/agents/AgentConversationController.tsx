
import React, { useState } from 'react';
import { StyledCard } from "@/components/ui/cards";
import { AgentConversation } from './AgentConversation';
import { AgentRoadmapPanel } from './roadmap/AgentRoadmapPanel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, Sparkles } from "lucide-react";
import { agents } from './agents-data';

interface AgentConversationControllerProps {
  activeAgentData: any | null;
  isListening: boolean;
  toggleListening: () => void;
}

export const AgentConversationController: React.FC<AgentConversationControllerProps> = ({
  activeAgentData,
  isListening,
  toggleListening
}) => {
  const [activeTab, setActiveTab] = useState<string>("conversation");
  
  const handleSelectTask = async (taskId: string) => {
    // Schimbă tabul înapoi la conversație atunci când un task este selectat
    setActiveTab("conversation");
    
    // Returnează true pentru a indica că task-ul a fost asignat cu succes
    return true;
  };
  
  if (!activeAgentData) {
    return (
      <StyledCard>
        <div className="p-6 text-center">
          <Sparkles className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
          <h3 className="text-lg font-medium mb-2">Selectează un agent</h3>
          <p className="text-muted-foreground">
            Alege un agent din panel-ul din stânga pentru a începe o conversație sau pentru a vedea taskurile disponibile.
          </p>
        </div>
      </StyledCard>
    );
  }
  
  return (
    <div className="space-y-4">
      <Tabs defaultValue="conversation" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="conversation" className="flex items-center gap-1.5">
            <MessageCircle className="h-4 w-4" />
            Conversație
          </TabsTrigger>
          <TabsTrigger value="roadmap" className="flex items-center gap-1.5">
            <Sparkles className="h-4 w-4" />
            Taskuri Roadmap
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="conversation" className="pt-2">
          <AgentConversation
            agentId={activeAgentData.id}
            agentName={activeAgentData.name}
            agentType={activeAgentData.type}
            isListening={isListening}
            toggleListening={toggleListening}
          />
        </TabsContent>
        
        <TabsContent value="roadmap" className="pt-2">
          <AgentRoadmapPanel 
            agentId={activeAgentData.id} 
            onSelectTask={handleSelectTask}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
