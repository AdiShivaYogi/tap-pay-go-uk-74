
import React, { useState, useEffect } from "react";
import { Layout } from "@/components/layout/layout";
import { Section } from "@/components/ui/layout/section";
import { useAuth } from "@/hooks/use-auth";
import { useUserRole } from "@/hooks/use-user-role";
import { useRouter } from "@/hooks/use-router";
import { AccessRestrictionAlert } from "@/features/roadmap/components/AccessRestrictionAlert";
import { Bot, Command, ShieldCheck, Bell, ArrowRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/ui/layout/page-header";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
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
  const router = useRouter();
  const { submissions, progressHistory, codeProposals, loading } = useAgentAdminData(!!isAdmin);
  const [submissionsState, setSubmissionsState] = useState<any[]>([]);
  const [codeProposalsState, setCodeProposalsState] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("monitoring");
  const [unifiedSystemActive, setUnifiedSystemActive] = useState(true);
  
  // Determină tabul activ în funcție de ruta din care a venit utilizatorul
  useEffect(() => {
    const path = window.location.pathname;
    if (path.includes('agent-monitoring')) {
      setActiveTab("monitoring");
    } else if (path.includes('agent-admin')) {
      setActiveTab("admin");
    } else if (path.includes('agent-management')) {
      setActiveTab("unified");
    }
  }, []);

  // When data is loaded from the hook, update our state
  useEffect(() => {
    if (!loading) {
      setSubmissionsState(submissions);
      setCodeProposalsState(codeProposals);
    }
  }, [submissions, codeProposals, loading]);
  
  // Notificare automată la încărcare despre unificarea sistemelor
  useEffect(() => {
    const timer = setTimeout(() => {
      toast({
        title: "Comandă centrală unificată activată",
        description: "Toate sistemele de administrare, monitorizare și management al agenților au fost unificate în această interfață centralizată.",
        duration: 8000,
      });
    }, 800);
    
    return () => clearTimeout(timer);
  }, [toast]);
  
  // Activare periodică de notificări despre unificare pentru a insista asupra ideii
  useEffect(() => {
    const reminders = [
      {
        title: "Sistem unificat activ",
        description: "Toți agenții operează acum din centrul de comandă unificat. Nu mai este nevoie de pagini separate."
      },
      {
        title: "Control centralizat complet", 
        description: "Administrare, monitorizare și management - toate într-o singură interfață pentru eficiență maximă."
      },
      {
        title: "Ecosistem autonom integrat",
        description: "Agenții operează acum într-un ecosistem unificat cu control central din această pagină."
      }
    ];
    
    const interval = setInterval(() => {
      const reminder = reminders[Math.floor(Math.random() * reminders.length)];
      toast(reminder);
    }, 3 * 60 * 1000); // La fiecare 3 minute
    
    return () => clearInterval(interval);
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
            description="Administrare, monitorizare și control centralizat al ecosistemului autonom de agenți"
            gradient={true}
          />
          
          {totalProposals > 0 && (
            <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4" />
              <span className="font-medium">{totalProposals} propuneri în așteptare</span>
            </div>
          )}
        </div>
        
        <Alert className="mb-6 border-green-600/30 bg-green-50/30">
          <div className="flex items-start">
            <Bell className="h-5 w-5 text-green-600 mt-0.5 mr-2" />
            <div>
              <AlertTitle className="text-green-700 mb-1">Sistem unificat activ</AlertTitle>
              <AlertDescription className="text-sm text-green-700/90">
                Administrarea, monitorizarea și managementul agenților au fost consolidate permanent în acest centru de comandă unificat. 
                Toate funcționalitățile anterioare sunt acum disponibile în taburile de mai jos.
              </AlertDescription>
            </div>
          </div>
        </Alert>
        
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
