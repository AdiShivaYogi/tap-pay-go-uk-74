
import React, { useState } from "react";
import { Layout } from "@/components/layout/layout";
import { Section } from "@/components/ui/layout/section";
import { PageHeader } from "@/components/ui/layout/page-header";
import { Bot, Crown } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useUserRole } from "@/hooks/use-user-role";
import { AccessRestrictionAlert } from "@/features/roadmap/components/AccessRestrictionAlert";
import { AgentAdminTabs } from "@/components/agent-admin/AgentAdminTabs";
import { useAgentAdminData } from "@/hooks/use-agent-admin-data";
import { AgentApiKeyDialog } from "@/components/agents/AgentApiKeyDialog";
import { OpenRouterApiKeyDialog } from "@/components/agents/OpenRouterApiKeyDialog";
import { AnthropicApiKeyDialog } from "@/components/agents/AnthropicApiKeyDialog";
import { Card } from "@/components/ui/card";

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

  const totalProposals = submissionsState.length + codeProposalsState.length;
  
  return (
    <Layout>
      <Section>
        <div className="flex items-center justify-between mb-4">
          <PageHeader
            icon={Bot}
            title="Administrare Agenți"
            description="Gestionează activitatea și contribuțiile agenților la dezvoltarea platformei"
          />
          
          {totalProposals > 0 && (
            <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <Crown className="h-4 w-4" />
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
