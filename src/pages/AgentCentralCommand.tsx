
import React, { useState } from "react";
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

const AgentCentralCommand = () => {
  const { user } = useAuth();
  const { isAdmin } = useUserRole();
  const [activeTab, setActiveTab] = useState("monitoring");
  const { submissions, progressHistory, codeProposals, loading } = useAgentAdminData(!!isAdmin);

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
            submissions={submissions}
            codeProposals={codeProposals}
            progressHistory={progressHistory}
            userId={user?.id}
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
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="flex">
        <AgentCentralCommandSidebar 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />
        <Section className="flex-1">
          {renderActiveTab()}
        </Section>
      </div>
    </Layout>
  );
};

export default AgentCentralCommand;
