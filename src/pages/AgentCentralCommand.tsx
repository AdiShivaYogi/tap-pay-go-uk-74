
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
import { useAgentAdminData } from "@/hooks/use-agent-admin-data";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AnthropicApiKeyDialog } from "@/components/agents/AnthropicApiKeyDialog";
import { OpenRouterApiKeyDialog } from "@/components/agents/OpenRouterApiKeyDialog";
import { AutoExecution } from "@/features/agent-autonomy/AutoExecution";
import { Separator } from "@/components/ui/separator";

const AgentCentralCommand = () => {
  const { user } = useAuth();
  const { isAdmin } = useUserRole();
  const [activeTab, setActiveTab] = useState("monitoring");
  const { submissions, progressHistory, codeProposals, loading } = useAgentAdminData(!!isAdmin);
  const [submissionsState, setSubmissionsState] = useState<any[]>([]);
  const [codeProposalsState, setCodeProposalsState] = useState<any[]>([]);
  
  // When data is loaded from the hook, update our state
  useEffect(() => {
    if (!loading) {
      setSubmissionsState(submissions);
      setCodeProposalsState(codeProposals);
    }
  }, [submissions, codeProposals, loading]);

  if (!user || !isAdmin) {
    return (
      <Layout>
        <Section>
          <AccessRestrictionAlert role={!user ? "vizitator" : "admin"} />
        </Section>
      </Layout>
    );
  }

  const renderActiveTab = () => {
    switch(activeTab) {
      case "monitoring":
        return (
          <AutonomousEngineProvider>
            <BaseMonitoringPage tabs="default" />
            <AutonomyEngine />
            <AutoExecution />
          </AutonomousEngineProvider>
        );
      case "admin":
        return (
          <AgentAdminTabs 
            submissions={submissionsState}
            codeProposals={codeProposalsState}
            progressHistory={progressHistory}
            userId={user?.id}
            setSubmissions={setSubmissionsState}
            setCodeProposals={setCodeProposalsState}
            loading={loading}
          />
        );
      case "unified":
        return (
          <AutonomousEngineProvider>
            <BaseMonitoringPage tabs="unified" />
            <AutonomyEngine />
            <AutoExecution />
          </AutonomousEngineProvider>
        );
      case "api-config":
        return (
          <div className="p-6 space-y-6 max-w-3xl">
            <div>
              <h2 className="text-2xl font-bold mb-2">Configurare API</h2>
              <p className="text-muted-foreground mb-6">
                Configurați cheile API pentru a activa capacitățile avansate ale agenților TapToGo
              </p>
              
              <Separator className="my-6" />
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Configurare Modele AI Claude</h3>
                  <p className="text-muted-foreground mb-4">
                    Există două modalități de a conecta agenții la modelele Claude AI pentru capacități avansate de raționament:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="border rounded-lg p-4 bg-slate-50">
                      <h4 className="font-medium mb-2">Opțiunea 1: Anthropic Direct</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Acces direct la API-ul Claude direct de la Anthropic pentru control maxim și cost optimizat
                      </p>
                      <AnthropicApiKeyDialog />
                    </div>
                    
                    <div className="border rounded-lg p-4 bg-slate-50">
                      <h4 className="font-medium mb-2">Opțiunea 2: OpenRouter</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Acces la Claude și alte modele de generație prin intermediul OpenRouter, cu opțiuni mai diverse
                      </p>
                      <OpenRouterApiKeyDialog />
                    </div>
                  </div>
                  
                  <p className="text-sm bg-blue-50 border border-blue-200 rounded-md p-3">
                    <strong className="text-blue-700">Sfat:</strong> Puteți configura ambele opțiuni pentru redundanță. 
                    Sistemul va încerca mai întâi conexiunea directă Anthropic și va folosi OpenRouter ca rezervă.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AgentCentralCommandSidebar 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
          />
          <Section className="flex-1">
            {renderActiveTab()}
          </Section>
        </div>
      </SidebarProvider>
    </Layout>
  );
};

export default AgentCentralCommand;
