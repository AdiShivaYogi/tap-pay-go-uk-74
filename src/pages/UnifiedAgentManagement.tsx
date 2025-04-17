
import React from 'react';
import { BaseMonitoringPage } from '@/components/agents/monitoring/BaseMonitoringPage';
import { AutonomousEngineProvider } from '@/components/agents/autonomous-engine/AutonomousEngineProvider';

const UnifiedAgentManagement = () => {
  return (
    <AutonomousEngineProvider>
      <BaseMonitoringPage tabs="unified" />
    </AutonomousEngineProvider>
  );
};

export default UnifiedAgentManagement;
