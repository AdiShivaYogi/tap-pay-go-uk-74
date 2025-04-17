
import React, { useState, useEffect } from "react";
import { Layout } from "@/components/layout/layout";
import { Section } from "@/components/ui/layout/section";
import { useAuth } from "@/hooks/use-auth";
import { useUserRole } from "@/hooks/use-user-role";
import { AccessRestrictionAlert } from "@/features/roadmap/components/AccessRestrictionAlert";
import { Bot, Command, ShieldCheck } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/ui/layout/page-header";
import { BaseMonitoringPage } from "@/components/agents/monitoring/BaseMonitoringPage";
import { useAgentAdminData } from "@/hooks/use-agent-admin-data";
import { AgentAdminTabs } from "@/components/agent-admin/AgentAdminTabs";
import { useToast } from "@/hooks/use-toast";
import { AutonomousEngineProvider } from "@/components/agents/autonomous-engine/AutonomousEngineProvider";
import { AutonomyEngine } from "@/components/agents/monitoring/autonomy/AutonomyEngine";
import { Card } from "@/components/ui/card";
import { AgentApiKeyDialog } from "@/components/agents/AgentApiKeyDialog";
import { OpenRouterApiKeyDialog } from "@/components/agents/OpenRouterApiKeyDialog";
import { AnthropicApiKeyDialog } from "@/components/agents/AnthropicApiKeyDialog";

const AgentCentralCommand = () => {
  const { user } = useAuth();
  const { isAdmin } = useUserRole();
  const { toast } = useToast();
  const { submissions, progressHistory, codeProposals, loading } = useAgentAdminData(!!isAdmin);
  const [submissionsState, setSubmissionsState] = useState<any[]>([]);
  const [codeProposalsState, setCodeProposalsState] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("monitoring");

  // When data is loaded from the hook, update our state
  useEffect(() => {
    if (!loading) {
      setSubmissionsState(submissions);
      setCodeProposalsState(codeProposals);
    }
  }, [submissions, codeProposals, loading]);
  
  // Notificare automată la încărcare
  useEffect(() => {
    const timer = setTimeout(() => {
      toast({
        title: "Comandă centrală inițializată",
        description: "Control complet asupra tuturor sistemelor de agenți AI autonomi activat.",
        duration: 5000,
      });
    }, 500);
    
    return () => clearTimeout(timer);
  }, [toast]);

  if (!user) {
    return (
      <Layout>
        <Section>
          <AccessRestrictionAlert role="vizitator" />
        </Section>
      </Layout>
    );
  }
  
  if (!isAdmin) {
    return (
      <Layout>
        <Section>
          <AccessRestrictionAlert role="admin" />
        </Section>
      </Layout>
    );
  }

  const totalProposals = submissionsState.length + codeProposalsState.length;

  return (
    <Layout>
      <Section>
        <div className="flex items-center justify-between mb-4">
          <PageHeader
            icon={Command}
            title="Centru de Comandă Agenți"
            description="Administrare centralizată, monitorizare și control al tuturor sistemelor de agenți autonomi"
            gradient={true}
          />
          
          {totalProposals > 0 && (
            <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4" />
              <span className="font-medium">{totalProposals} propuneri în așteptare</span>
            </div>
          )}
        </div>
        
        <Card className="p-3 mb-4 bg-gradient-to-br from-slate-50 to-white">
          <div className="flex flex-wrap gap-3">
            <AgentApiKeyDialog />
            <OpenRouterApiKeyDialog />
            <AnthropicApiKeyDialog />
          </div>
        </Card>
        
        <Tabs defaultValue="monitoring" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="monitoring" className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              <span>Monitorizare & Control</span>
            </TabsTrigger>
            <TabsTrigger value="admin" className="flex items-center gap-2">
              <Bot className="h-4 w-4" />
              <span>Administrare & Propuneri</span>
            </TabsTrigger>
            <TabsTrigger value="unified" className="flex items-center gap-2">
              <Command className="h-4 w-4" />
              <span>Control Unificat</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="monitoring">
            <AutonomousEngineProvider>
              <BaseMonitoringPage tabs="default" title="Monitorizare & Control" />
              <AutonomyEngine />
            </AutonomousEngineProvider>
          </TabsContent>
          
          <TabsContent value="admin">
            <AgentAdminTabs 
              submissions={submissionsState}
              codeProposals={codeProposalsState}
              progressHistory={progressHistory}
              userId={user?.id}
              setSubmissions={setSubmissionsState}
              setCodeProposals={setCodeProposalsState}
              loading={loading}
            />
          </TabsContent>
          
          <TabsContent value="unified">
            <AutonomousEngineProvider>
              <BaseMonitoringPage tabs="unified" title="Control Unificat" />
              <AutonomyEngine />
            </AutonomousEngineProvider>
          </TabsContent>
        </Tabs>
      </Section>
    </Layout>
  );
};

export default AgentCentralCommand;
