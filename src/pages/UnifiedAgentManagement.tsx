
import React from 'react';
import { BaseMonitoringPage } from '@/components/agents/monitoring/BaseMonitoringPage';
import { AutonomousEngineProvider } from '@/components/agents/autonomous-engine/AutonomousEngineProvider';
import { AutonomyEngine } from '@/components/agents/monitoring/autonomy/AutonomyEngine';
import { AutonomyDashboard } from '@/features/agent-autonomy/AutonomyDashboard';
import { Section } from "@/components/ui/layout/section";
import { Layout } from "@/components/layout/layout";

const UnifiedAgentManagement = () => {
  return (
    <AutonomousEngineProvider>
      <Layout>
        <Section>
          <AutonomyDashboard />
          <div className="mt-6">
            <BaseMonitoringPage tabs="unified" />
          </div>
        </Section>
      </Layout>
      <AutonomyEngine />
    </AutonomousEngineProvider>
  );
};

export default UnifiedAgentManagement;
