
import React from "react";
import { Layout } from "@/components/layout/layout";
import { Section } from "@/components/ui/layout/section";
import { PageHeader } from "@/components/ui/layout/page-header";
import { Activity } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useUserRole } from "@/hooks/use-user-role";
import { AccessRestrictionAlert } from "@/features/roadmap/components/AccessRestrictionAlert";
import { AgentActivityMonitor } from "@/components/agents/monitoring/AgentActivityMonitor";

const AgentMonitoring = () => {
  const { user } = useAuth();
  const { isAdmin } = useUserRole();
  
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
          title="Monitorizare Agenți"
          description="Urmărește activitatea agenților în timp real și analizează performanța lor"
          gradient={true}
        />
        
        <div className="mt-6">
          <AgentActivityMonitor />
        </div>
      </Section>
    </Layout>
  );
};

export default AgentMonitoring;
