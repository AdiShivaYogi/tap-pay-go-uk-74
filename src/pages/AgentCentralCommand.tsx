
import React, { useState } from "react";
import { Layout } from "@/components/layout/layout";
import { Section } from "@/components/ui/layout/section";
import { AgentCentralCommandSidebar } from "@/components/agents/AgentCentralCommandSidebar";
import { AgentConversationController } from "@/components/agents/AgentConversationController";
import { BaseMonitoringPage } from "@/components/agents/monitoring/BaseMonitoringPage";
import { AgentAdminTabs } from "@/components/agent-admin/AgentAdminTabs";
import { useAgentAdminData } from "@/hooks/use-agent-admin-data";
import { useAuth } from "@/hooks/use-auth";
import { useUserRole } from "@/hooks/use-user-role";
import { AccessRestrictionAlert } from "@/features/roadmap/components/AccessRestrictionAlert";
import { AutonomousEngineProvider } from '@/components/agents/autonomous-engine/AutonomousEngineProvider';
import { AutonomyEngine } from '@/components/agents/monitoring/autonomy/AutonomyEngine';
import { Agent } from "@/components/agents/agents-data";

const AgentCentralCommand = () => {
  const { user } = useAuth();
  const { isAdmin } = useUserRole();
  const [activeTab, setActiveTab] = useState("monitoring");
  const [activeAgent, setActiveAgent] = useState<Agent | null>(null);
  const [isListening, setIsListening] = useState(false);
  
  const { submissions, progressHistory, codeProposals, loading } = useAgentAdminData(!!isAdmin);

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

  const renderContent = () => {
    switch (activeTab) {
      case "monitoring":
        return <BaseMonitoringPage tabs="unified" />;
      case "admin":
        return (
          <AgentAdminTabs 
            submissions={submissions}
            codeProposals={codeProposals}
            progressHistory={progressHistory}
            userId={user.id}
            setSubmissions={() => {}}
            setCodeProposals={() => {}}
            loading={loading}
          />
        );
      case "unified":
        return <BaseMonitoringPage tabs="unified" />;
      default:
        return null;
    }
  };

  return (
    <AutonomousEngineProvider>
      <div className="flex h-screen">
        <AgentCentralCommandSidebar 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 flex">
            <div className="flex-1 overflow-auto">
              <Layout>
                <Section>{renderContent()}</Section>
              </Layout>
            </div>
            
            {/* Chat Panel */}
            <div className="w-[400px] border-l border-slate-200 bg-white flex flex-col h-full">
              <AgentConversationController
                activeAgentData={activeAgent}
                isListening={isListening}
                toggleListening={() => setIsListening(!isListening)}
              />
            </div>
          </div>
        </div>
      </div>
      <AutonomyEngine />
    </AutonomousEngineProvider>
  );
};

export default AgentCentralCommand;
