
import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/layout";
import { Section } from "@/components/ui/layout/section";
import { PageHeader } from "@/components/ui/layout/page-header";
import { Bot, Settings, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { AccessRestrictionAlert } from "@/features/roadmap/components/AccessRestrictionAlert";
import { AgentSelectionPanel } from "@/components/agents/AgentSelectionPanel";
import { AgentConversationController } from "@/components/agents/AgentConversationController";
import { agents } from "@/components/agents/agents-data";
import { AgentApiKeyDialog } from "@/components/agents/AgentApiKeyDialog";
import { useUserRole } from "@/hooks/use-user-role";
import { useAgentApi } from "@/components/agents/conversation/hooks/useAgentApi";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AnthropicApiKeyDialog } from "@/components/agents/AnthropicApiKeyDialog";
import { OpenRouterApiKeyDialog } from "@/components/agents/OpenRouterApiKeyDialog";
import { Card } from "@/components/ui/card";

const Agents = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const { isAdmin } = useUserRole();
  const [activeAgent, setActiveAgent] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [isAnthropicDialogOpen, setIsAnthropicDialogOpen] = useState(false);
  const [isOpenRouterDialogOpen, setIsOpenRouterDialogOpen] = useState(false);
  
  const { 
    hasAnthropicKey,
    hasOpenRouterKey, 
    isApiLoading 
  } = useAgentApi();
  
  const hasConfiguredKeys = hasAnthropicKey || hasOpenRouterKey;

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
    // Verificăm dacă sunt configurate chei API
    if (!hasConfiguredKeys && !isListening) {
      toast({
        title: "API neconfigurat",
        description: "Pentru conversații cu agenți, configurați o cheie API Anthropic sau OpenRouter.",
        variant: "destructive"
      });
      return;
    }
    
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
      <Section className="px-4 md:px-6">
        <div className="flex justify-between items-center mb-6">
          <PageHeader
            icon={Bot}
            title="Agenți Specializați R1"
            description="Conectează-te cu agenți specializați pentru suport și consultanță"
            gradient={true}
          />
          
          {isAdmin && (
            <div className="flex items-center">
              <AgentApiKeyDialog />
            </div>
          )}
        </div>
        
        {!isApiLoading && !hasConfiguredKeys && (
          <Alert className="mb-6 bg-gradient-to-r from-amber-50 to-amber-100 border-amber-200">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            <AlertTitle className="text-amber-800 font-semibold">API Neconfigurat</AlertTitle>
            <AlertDescription className="text-amber-700">
              <p className="mt-2 mb-3">
                Pentru a putea conversa cu agenții, este necesară configurarea unei chei API Claude (Anthropic sau OpenRouter).
                Aceste chei permit agenților să genereze răspunsuri inteligente la întrebările dvs.
              </p>
              
              <div className="flex flex-wrap gap-3 mt-4">
                <Button 
                  size="sm" 
                  variant="outline"
                  className="bg-white border-amber-300 hover:bg-amber-100 text-amber-800"
                  onClick={() => setIsAnthropicDialogOpen(true)}
                >
                  Configurare API Claude (Anthropic)
                </Button>
                
                <Button 
                  size="sm" 
                  variant="outline"
                  className="bg-white border-amber-300 hover:bg-amber-100 text-amber-800"
                  onClick={() => setIsOpenRouterDialogOpen(true)}
                >
                  Configurare API Claude (OpenRouter)
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}
        
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
        
        {/* Dialoguri pentru configurarea cheilor API */}
        <AnthropicApiKeyDialog 
          isOpen={isAnthropicDialogOpen} 
          setIsOpen={setIsAnthropicDialogOpen} 
        />
        
        <OpenRouterApiKeyDialog
          isOpen={isOpenRouterDialogOpen}
          setIsOpen={setIsOpenRouterDialogOpen}
        />
      </Section>
    </Layout>
  );
};

export default Agents;
