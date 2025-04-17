
import React from 'react';
import { BaseMonitoringPage } from '@/components/agents/monitoring/BaseMonitoringPage';
import { AutonomousEngineProvider } from '@/components/agents/autonomous-engine/AutonomousEngineProvider';
import { AutonomyEngine } from '@/components/agents/monitoring/autonomy/AutonomyEngine';

const UnifiedAgentManagement = () => {
  return (
    <AutonomousEngineProvider>
      <BaseMonitoringPage tabs="unified" />
      <AutonomyEngine />
    </AutonomousEngineProvider>
  );
};

export default UnifiedAgentManagement;
