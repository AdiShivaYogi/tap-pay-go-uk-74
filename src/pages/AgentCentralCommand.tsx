
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
import { SidebarProvider } from "@/components/ui/sidebar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AutonomyDashboard } from "@/features/agent-autonomy/AutonomyDashboard";
import { AgentTasksPanel } from "@/features/agent-tasks/AgentTasksPanel";
import { Activity, Brain, ListTodo, BarChart, Settings } from "lucide-react";

const AgentCentralCommand = () => {
  const { user } = useAuth();
  const { isAdmin } = useUserRole();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [activeSidebarItem, setActiveSidebarItem] = useState("monitoring");
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

  const renderSidebarContent = () => {
    switch (activeSidebarItem) {
      case "monitoring":
        return (
          <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-4 grid grid-cols-4">
              <TabsTrigger value="dashboard" className="flex items-center gap-1">
                <Brain className="h-4 w-4" />
                Autonomie
              </TabsTrigger>
              <TabsTrigger value="monitoring" className="flex items-center gap-1">
                <Activity className="h-4 w-4" />
                Monitorizare
              </TabsTrigger>
              <TabsTrigger value="tasks" className="flex items-center gap-1">
                <ListTodo className="h-4 w-4" />
                Sarcini
              </TabsTrigger>
              <TabsTrigger value="reports" className="flex items-center gap-1">
                <BarChart className="h-4 w-4" />
                Rapoarte
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard">
              <AutonomyDashboard />
            </TabsContent>
            
            <TabsContent value="monitoring">
              <BaseMonitoringPage tabs="unified" />
            </TabsContent>

            <TabsContent value="tasks">
              <AgentTasksPanel />
            </TabsContent>
            
            <TabsContent value="reports">
              <h2 className="text-2xl font-bold mb-4">Rapoarte și Analize</h2>
              <div className="bg-slate-50 p-6 rounded-lg border text-center">
                <BarChart className="h-12 w-12 mx-auto text-slate-400 mb-3" />
                <h3 className="text-lg font-medium mb-2">Secțiune în dezvoltare</h3>
                <p className="text-slate-500">
                  Platforma va genera rapoarte bazate pe activitatea agenților în curând.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        );
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
      <SidebarProvider>
        <div className="flex h-screen w-full">
          <AgentCentralCommandSidebar 
            activeTab={activeSidebarItem} 
            onTabChange={setActiveSidebarItem} 
          />
          
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 flex">
              <div className="flex-1 overflow-auto">
                <Layout>
                  <Section>{renderSidebarContent()}</Section>
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
      </SidebarProvider>
      <AutonomyEngine />
    </AutonomousEngineProvider>
  );
};

export default AgentCentralCommand;
