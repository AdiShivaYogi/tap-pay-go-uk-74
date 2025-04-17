
import React from "react";
import { Layout } from "@/components/layout/layout";
import { Section } from "@/components/ui/layout/section";
import { PageHeader } from "@/components/ui/layout/page-header";
import { Activity, Bot } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useUserRole } from "@/hooks/use-user-role";
import { AccessRestrictionAlert } from "@/features/roadmap/components/AccessRestrictionAlert";
import { BaseMonitoringPage } from "@/components/agents/monitoring/BaseMonitoringPage";
import { AgentAdminTabs } from "@/components/agent-admin/AgentAdminTabs";
import { useAgentAdminData } from "@/hooks/use-agent-admin-data";

const AgentCentralCommand = () => {
  const { user } = useAuth();
  const { isAdmin } = useUserRole();
  const { submissions, codeProposals, progressHistory, loading } = useAgentAdminData(!!isAdmin);

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

  return (
    <Layout>
      <Section>
        <PageHeader
          icon={Activity}
          title="Centru de Comandă Unificat"
          description="Gestionează și supervizează toți agenții din ecosistem"
          gradient={true}
        />
        
        <div className="grid grid-cols-1 gap-6">
          <AgentAdminTabs 
            submissions={submissions}
            codeProposals={codeProposals}
            progressHistory={progressHistory}
            userId={user.id}
            setSubmissions={() => {}}
            setCodeProposals={() => {}}
            loading={loading}
          />
        </div>
      </Section>
    </Layout>
  );
};

export default AgentCentralCommand;
