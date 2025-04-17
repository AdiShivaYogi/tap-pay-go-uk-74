
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
          </AutonomousEngineProvider>
        );
      case "api-config":
        return (
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Configurare API</h2>
            <p className="text-muted-foreground">Aici puteți configura setările API pentru agenți.</p>
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
