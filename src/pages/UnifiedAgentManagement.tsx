
import React from 'react';
import { BaseMonitoringPage } from '@/components/agents/monitoring/BaseMonitoringPage';
import { AutonomousEngineProvider } from '@/components/agents/autonomous-engine/AutonomousEngineProvider';
import { AutonomyEngine } from '@/components/agents/monitoring/autonomy/AutonomyEngine';
import { AutonomyDashboard } from '@/features/agent-autonomy/AutonomyDashboard';
import { AgentTasksPanel } from '@/features/agent-tasks/AgentTasksPanel';
import { Section } from "@/components/ui/layout/section";
import { Layout } from "@/components/layout/layout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Activity, Brain, ListTodo } from "lucide-react";

const UnifiedAgentManagement = () => {
  return (
    <AutonomousEngineProvider>
      <Layout>
        <Section className="h-[calc(100vh-4rem)] overflow-hidden flex flex-col">
          <Tabs defaultValue="dashboard" className="flex-1 flex flex-col">
            <TabsList className="mb-4 w-full justify-start space-x-2 bg-transparent p-0">
              <TabsTrigger 
                value="dashboard" 
                className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700"
              >
                <Brain className="h-4 w-4 mr-2" />
                Dashboard Autonomie
              </TabsTrigger>
              <TabsTrigger 
                value="monitoring" 
                className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700"
              >
                <Activity className="h-4 w-4 mr-2" />
                Monitorizare
              </TabsTrigger>
              <TabsTrigger 
                value="tasks" 
                className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700"
              >
                <ListTodo className="h-4 w-4 mr-2" />
                Sarcini
              </TabsTrigger>
            </TabsList>
            
            <div className="flex-1 overflow-hidden">
              <TabsContent value="dashboard" className="h-full overflow-auto px-1">
                <AutonomyDashboard />
              </TabsContent>
              
              <TabsContent value="monitoring" className="h-full overflow-auto px-1">
                <BaseMonitoringPage tabs="unified" />
              </TabsContent>

              <TabsContent value="tasks" className="h-full overflow-auto px-1">
                <AgentTasksPanel />
              </TabsContent>
            </div>
          </Tabs>
        </Section>
      </Layout>
      <AutonomyEngine />
    </AutonomousEngineProvider>
  );
};

export default UnifiedAgentManagement;
