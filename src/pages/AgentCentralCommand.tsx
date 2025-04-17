
import React, { useState, useEffect } from "react";
import { Layout } from "@/components/layout/layout";
import { Section } from "@/components/ui/layout/section";
import { AgentCentralCommandSidebar } from "@/components/agents/AgentCentralCommandSidebar";
import { useAuth } from "@/hooks/use-auth";
import { useUserRole } from "@/hooks/use-user-role";
import { AccessRestrictionAlert } from "@/features/roadmap/components/AccessRestrictionAlert";
import { BaseMonitoringPage } from "@/components/agents/monitoring/BaseMonitoringPage";
import { AutonomousEngineProvider } from "@/components/agents/autonomous-engine/AutonomousEngineProvider";
import { AutonomyEngine } from "@/components/agents/monitoring/autonomy/AutonomyEngine";
import { AgentAdminTabs } from "@/components/agent-admin/AgentAdminTabs";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AnthropicApiKeyDialog } from "@/components/agents/AnthropicApiKeyDialog";
import { OpenRouterApiKeyDialog } from "@/components/agents/OpenRouterApiKeyDialog";
import { AutoExecution } from "@/features/agent-autonomy/AutoExecution";
import { Separator } from "@/components/ui/separator";
import { useAutonomousAgents } from "@/hooks/use-autonomous-agents";
import { 
  BrainCircuit, 
  Sparkles, 
  Server, 
  Bot, 
  Command, 
  Shield 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { StatsCard } from "@/components/ui/cards";

const AgentCentralCommand = () => {
  const { user } = useAuth();
  const { isAdmin } = useUserRole();
  const [activeTab, setActiveTab] = useState("monitoring");
  const { toast } = useToast();
  const { submissions, progressHistory, codeProposals, loading } = useAgentAdminData(!!isAdmin);
  const [submissionsState, setSubmissionsState] = useState<any[]>([]);
  const [codeProposalsState, setCodeProposalsState] = useState<any[]>([]);
  const { isRunning, autonomyLevel, startAgents } = useAutonomousAgents({ autoStart: true });
  
  // When data is loaded from the hook, update our state
  useEffect(() => {
    if (!loading) {
      setSubmissionsState(submissions);
      setCodeProposalsState(codeProposals);
    }
  }, [submissions, codeProposals, loading]);

  // Afișăm un toast când pagina este încărcată
  useEffect(() => {
    toast({
      title: "Centru de Comandă Agenți",
      description: "Toate sistemele autonome sunt active și funcționale.",
      duration: 5000,
    });
  }, [toast]);

  if (!user || !isAdmin) {
    return (
      <Layout>
        <Section>
          <AccessRestrictionAlert role={!user ? "vizitator" : "admin"} />
        </Section>
      </Layout>
    );
  }

  // Componenta pentru header
  const CommandCenterHeader = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Command className="h-6 w-6 text-purple-600" />
            Centru de Comandă Agenți
          </h1>
          <p className="text-slate-500 mt-1">
            Monitorizare și control unificat pentru întregul ecosistem de agenți autonomi
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="bg-green-100 text-green-700 px-3 py-1.5 rounded-full text-xs font-medium flex items-center">
            <span className="relative flex h-2.5 w-2.5 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-600"></span>
            </span>
            Sistem activ
          </div>
          
          <div className="bg-purple-100 text-purple-700 px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5">
            <BrainCircuit className="h-3.5 w-3.5" />
            Autonomie: {autonomyLevel}%
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        <StatsCard
          title="Agenți Activi"
          value="5"
          description="Toți agenții funcționează optim"
          icon={Bot}
          colorClass="text-blue-600"
        />
        <StatsCard
          title="Autonomie Sistem"
          value={`${autonomyLevel}%`}
          description="Nivel curent de independență"
          icon={BrainCircuit}
          colorClass="text-purple-600"
        />
        <StatsCard
          title="Propuneri"
          value={submissionsState.length + codeProposalsState.length}
          description="Propuneri în așteptare"
          icon={Sparkles}
          colorClass="text-amber-600"
        />
        <StatsCard
          title="Nivel Securitate"
          value="92%"
          description="Protecție activă"
          icon={Shield}
          colorClass="text-emerald-600"
        />
      </div>
    </div>
  );

  const renderActiveTab = () => {
    switch(activeTab) {
      case "monitoring":
        return (
          <AutonomousEngineProvider>
            <CommandCenterHeader />
            <div className="mb-8 overflow-hidden rounded-lg border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-50 to-white">
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                  Centru Unificat de Monitorizare
                </h2>
                <p className="text-sm text-slate-600">
                  Vizualizare integrată a tuturor activităților agenților autonomi, cu statistici în timp real
                  și capacități avansate de monitorizare. Sistemul este activ și monitorizează continuu toate operațiunile.
                </p>
              </div>
            </div>
            
            <BaseMonitoringPage tabs="default" />
            <AutonomyEngine />
            <AutoExecution />
          </AutonomousEngineProvider>
        );
      case "admin":
        return (
          <>
            <CommandCenterHeader />
            <div className="mb-8 overflow-hidden rounded-lg border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 to-white">
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <Bot className="h-5 w-5 text-blue-600" />
                  Administrare Propuneri și Feedback
                </h2>
                <p className="text-sm text-slate-600">
                  Gestionați propunerile generate de agenți și oferiți feedback pentru a îmbunătăți performanța sistemului.
                  Toate propunerile așteaptă revizuirea și aprobarea dumneavoastră.
                </p>
              </div>
            </div>
            
            <AgentAdminTabs 
              submissions={submissionsState}
              codeProposals={codeProposalsState}
              progressHistory={progressHistory}
              userId={user?.id}
              setSubmissions={setSubmissionsState}
              setCodeProposals={setCodeProposalsState}
              loading={loading}
            />
          </>
        );
      case "unified":
        return (
          <AutonomousEngineProvider>
            <CommandCenterHeader />
            <div className="mb-8 overflow-hidden rounded-lg border-l-4 border-l-emerald-500 bg-gradient-to-r from-emerald-50 to-white">
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <Command className="h-5 w-5 text-emerald-600" />
                  Control Unificat Agenți
                </h2>
                <p className="text-sm text-slate-600">
                  Interfață unificată pentru controlul și monitorizarea tuturor agenților din ecosistem,
                  cu acces complet la toate funcționalitățile și setările sistemului.
                </p>
              </div>
            </div>
            
            <BaseMonitoringPage tabs="unified" />
            <AutonomyEngine />
            <AutoExecution />
          </AutonomousEngineProvider>
        );
      case "api-config":
        return (
          <>
            <CommandCenterHeader />
            <div className="mb-8 overflow-hidden rounded-lg border-l-4 border-l-amber-500 bg-gradient-to-r from-amber-50 to-white">
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <Server className="h-5 w-5 text-amber-600" />
                  Configurare API și Integrări
                </h2>
                <p className="text-sm text-slate-600">
                  Gestionați cheile API și configurați integrările necesare pentru funcționarea optimă a 
                  sistemului de agenți autonomi. Aceste configurări sunt esențiale pentru capacitățile avansate.
                </p>
              </div>
            </div>
            
            <div className="p-6 space-y-6 max-w-3xl bg-white rounded-lg border border-slate-200 shadow-sm">
              <div>
                <h2 className="text-2xl font-bold mb-2">Configurare API</h2>
                <p className="text-slate-600 mb-6">
                  Configurați cheile API pentru a activa capacitățile avansate ale agenților TapToGo
                </p>
                
                <Separator className="my-6" />
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Configurare Modele AI Claude</h3>
                    <p className="text-slate-600 mb-4">
                      Există două modalități de a conecta agenții la modelele Claude AI pentru capacități avansate de raționament:
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="border rounded-lg p-4 bg-gradient-to-b from-slate-50 to-slate-100 hover:shadow-md transition-shadow">
                        <h4 className="font-medium mb-2">Opțiunea 1: Anthropic Direct</h4>
                        <p className="text-sm text-slate-600 mb-3">
                          Acces direct la API-ul Claude direct de la Anthropic pentru control maxim și cost optimizat
                        </p>
                        <AnthropicApiKeyDialog />
                      </div>
                      
                      <div className="border rounded-lg p-4 bg-gradient-to-b from-slate-50 to-slate-100 hover:shadow-md transition-shadow">
                        <h4 className="font-medium mb-2">Opțiunea 2: OpenRouter</h4>
                        <p className="text-sm text-slate-600 mb-3">
                          Acces la Claude și alte modele de generație prin intermediul OpenRouter, cu opțiuni mai diverse
                        </p>
                        <OpenRouterApiKeyDialog />
                      </div>
                    </div>
                    
                    <div className="text-sm bg-blue-50 border border-blue-200 rounded-md p-3">
                      <strong className="text-blue-700">Sfat:</strong> Puteți configura ambele opțiuni pentru redundanță. 
                      Sistemul va încerca mai întâi conexiunea directă Anthropic și va folosi OpenRouter ca rezervă.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <SidebarProvider>
        <div className="flex min-h-screen w-full bg-gradient-to-b from-slate-50 to-slate-100">
          <AgentCentralCommandSidebar 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
          />
          <div className="flex-1 overflow-auto">
            <Section className="p-6">
              <div className="max-w-[1300px] mx-auto">
                {renderActiveTab()}
              </div>
            </Section>
          </div>
        </div>
      </SidebarProvider>
    </Layout>
  );
};

export default AgentCentralCommand;
