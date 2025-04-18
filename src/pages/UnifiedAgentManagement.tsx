
import React from 'react';
import { BaseMonitoringPage } from '@/components/agents/monitoring/BaseMonitoringPage';
import { AutonomousEngineProvider } from '@/components/agents/autonomous-engine/AutonomousEngineProvider';
import { AutonomyEngine } from '@/components/agents/monitoring/autonomy/AutonomyEngine';
import { AutonomyDashboard } from '@/features/agent-autonomy/AutonomyDashboard';
import { AgentTasksPanel } from '@/features/agent-tasks/AgentTasksPanel';
import { Section } from "@/components/ui/layout/section";
import { Layout } from "@/components/layout/layout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Activity, Compass, ListTodo } from "lucide-react";

const UnifiedAgentManagement = () => {
  return (
    <AutonomousEngineProvider>
      <Layout>
        <Section>
          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="dashboard" className="flex items-center gap-1">
                <Activity className="h-4 w-4" />
                Dashboard Autonomie
              </TabsTrigger>
              <TabsTrigger value="monitoring" className="flex items-center gap-1">
                <Compass className="h-4 w-4" />
                Monitorizare Agenți
              </TabsTrigger>
              <TabsTrigger value="tasks" className="flex items-center gap-1">
                <ListTodo className="h-4 w-4" />
                Gestionare Sarcini
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
          </Tabs>
        </Section>
      </Layout>
      <AutonomyEngine />
    </AutonomousEngineProvider>
  );
};

export default UnifiedAgentManagement;
