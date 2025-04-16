
import React, { useState } from "react";
import { Layout } from "@/components/layout/layout";
import { Section } from "@/components/ui/layout/section";
import { PageHeader } from "@/components/ui/layout/page-header";
import { Bot } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useUserRole } from "@/hooks/use-user-role";
import { AccessRestrictionAlert } from "@/features/roadmap/components/AccessRestrictionAlert";
import { AgentAdminTabs } from "@/components/agent-admin/AgentAdminTabs";
import { useAgentAdminData } from "@/hooks/use-agent-admin-data";

const AgentAdmin = () => {
  const { user } = useAuth();
  const { isAdmin } = useUserRole();
  const { submissions, progressHistory, codeProposals, loading } = useAgentAdminData(!!isAdmin);
  const [submissionsState, setSubmissionsState] = useState<any[]>([]);
  const [codeProposalsState, setCodeProposalsState] = useState<any[]>([]);
  
  // When data is loaded from the hook, update our state
  React.useEffect(() => {
    if (!loading) {
      setSubmissionsState(submissions);
      setCodeProposalsState(codeProposals);
    }
  }, [submissions, codeProposals, loading]);
  
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
          icon={Bot}
          title="Administrare Agenți"
          description="Gestionează activitatea și contribuțiile agenților la dezvoltarea platformei"
        />
        
        <AgentAdminTabs 
          submissions={submissionsState}
          codeProposals={codeProposalsState}
          progressHistory={progressHistory}
          userId={user?.id}
          setSubmissions={setSubmissionsState}
          setCodeProposals={setCodeProposalsState}
          loading={loading}
        />
      </Section>
    </Layout>
  );
};

export default AgentAdmin;
