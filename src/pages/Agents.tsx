
import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/layout";
import { Section } from "@/components/ui/layout/section";
import { PageHeader } from "@/components/ui/layout/page-header";
import { StyledCard, StyledCardHeader, StyledCardTitle, StyledCardContent } from "@/components/ui/cards";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Bot, PlayCircle, PauseCircle, Users, CreditCard, Headphones, Brain, BarChart3, Shield } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { AgentCard } from "@/components/agents/AgentCard";
import { AgentConversation } from "@/components/agents/AgentConversation";
import { AccessRestrictionAlert } from "@/features/roadmap/components/AccessRestrictionAlert";

const Agents = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [activeAgent, setActiveAgent] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  
  const agents = [
    {
      id: "payment-agent",
      name: "Expert Plăți",
      description: "Specialist în procesarea plăților și integrare Stripe",
      icon: CreditCard,
      color: "text-green-500",
      status: "online"
    },
    {
      id: "support-agent",
      name: "Asistență Clienți",
      description: "Agenți pentru suport tehnic și întrebări frecvente",
      icon: Headphones,
      color: "text-blue-500",
      status: "online"
    },
    {
      id: "analytics-agent",
      name: "Expert Analiză Date",
      description: "Analist pentru interpretarea datelor și rapoartelor",
      icon: BarChart3,
      color: "text-purple-500",
      status: "online"
    },
    {
      id: "security-agent",
      name: "Consultant Securitate",
      description: "Specialist în securitate cibernetică și protecția datelor",
      icon: Shield,
      color: "text-red-500",
      status: "online"
    },
    {
      id: "ai-assistant",
      name: "Asistent AI General",
      description: "Asistent general pentru diverse întrebări despre platformă",
      icon: Brain,
      color: "text-amber-500",
      status: "online"
    }
  ];

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
                      onSelect={() => handleSelectAgent(agent.id)}
                    />
                  ))}
                </div>
              </StyledCardContent>
            </StyledCard>
          </div>
          
          <div className="md:col-span-2">
            <div className="space-y-6">
              <StyledCard>
                <StyledCardHeader>
                  <StyledCardTitle className="flex items-center gap-2">
                    {activeAgentData ? (
                      <>
                        <activeAgentData.icon className={`h-5 w-5 ${activeAgentData.color}`} />
                        Conversație cu {activeAgentData.name}
                      </>
                    ) : (
                      <>
                        <Bot className="h-5 w-5 text-muted-foreground" />
                        Selectează un agent pentru a începe o conversație
                      </>
                    )}
                  </StyledCardTitle>
                </StyledCardHeader>
                <StyledCardContent className="p-0">
                  {activeAgentData ? (
                    <AgentConversation agent={activeAgentData} isListening={isListening} />
                  ) : (
                    <div className="flex items-center justify-center p-12 text-center text-muted-foreground border-t">
                      <div>
                        <Bot className="h-16 w-16 mx-auto mb-4 opacity-20" />
                        <p>Selectează un agent din lista din stânga pentru a începe o conversație</p>
                      </div>
                    </div>
                  )}
                </StyledCardContent>
              </StyledCard>
              
              {activeAgentData && (
                <div className="flex justify-center">
                  <Button 
                    onClick={toggleListening}
                    size="lg" 
                    className={`w-64 gap-2 ${isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-primary hover:bg-primary/90'}`}
                  >
                    {isListening ? (
                      <>
                        <PauseCircle className="h-5 w-5" />
                        Oprește Ascultarea
                      </>
                    ) : (
                      <>
                        <PlayCircle className="h-5 w-5" />
                        Începe Conversația
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Section>
    </Layout>
  );
};

export default Agents;
