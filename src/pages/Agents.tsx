
import { useState } from "react";
import { Layout } from "@/components/layout/layout";
import { Section } from "@/components/ui/layout/section";
import { PageHeader } from "@/components/ui/layout/page-header";
import { Bot } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { AccessRestrictionAlert } from "@/features/roadmap/components/AccessRestrictionAlert";
import { AgentSelectionPanel } from "@/components/agents/AgentSelectionPanel";
import { AgentConversationController } from "@/components/agents/AgentConversationController";
import { agents } from "@/components/agents/agents-data";

const Agents = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [activeAgent, setActiveAgent] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);

  const handleSelectAgent = (agentId: string) => {
    if (activeAgent === agentId) {
      setActiveAgent(null);
    } else {
      setActiveAgent(agentId);
      toast({
        title: "Agent conectat",
        description: `Te-ai conectat la agentul ${agents.find(a => a.id === agentId)?.name}`,
      });
    }
  };

  const toggleListening = () => {
    if (!isListening) {
      if (!activeAgent) {
        toast({
          title: "Selectează un agent",
          description: "Te rugăm să selectezi un agent înainte de a începe o conversație",
          variant: "destructive"
        });
        return;
      }
      
      setIsListening(true);
      toast({
        title: "Asculta activ",
        description: "Agentul te ascultă. Vorbește pentru a interacționa."
      });
    } else {
      setIsListening(false);
      toast({
        title: "Ascultare oprită",
        description: "Agentul nu mai ascultă."
      });
    }
  };
  
  if (!user) {
    return (
      <Layout>
        <Section>
          <AccessRestrictionAlert role="vizitator" />
        </Section>
      </Layout>
    );
  }
  
  const activeAgentData = activeAgent ? agents.find(a => a.id === activeAgent) : null;
  
  return (
    <Layout>
      <Section>
        <PageHeader
          icon={Bot}
          title="Agenți Specializați R1"
          description="Conectează-te cu agenți specializați pentru suport și consultanță"
          gradient={true}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <AgentSelectionPanel 
              agents={agents}
              activeAgent={activeAgent}
              onSelectAgent={handleSelectAgent}
            />
          </div>
          
          <div className="md:col-span-2">
            <AgentConversationController
              activeAgentData={activeAgentData}
              isListening={isListening}
              toggleListening={toggleListening}
            />
          </div>
        </div>
      </Section>
    </Layout>
  );
};

export default Agents;
