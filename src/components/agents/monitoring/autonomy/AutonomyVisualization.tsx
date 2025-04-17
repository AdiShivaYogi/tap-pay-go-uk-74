
import React from 'react';
import { AgentNetworkGraph } from '@/components/3d-visualizations/AgentNetworkGraph';

export const AutonomyVisualization: React.FC = () => {
  return (
    <div className="w-full h-[400px]">
      <AgentNetworkGraph />
    </div>
  );
};
