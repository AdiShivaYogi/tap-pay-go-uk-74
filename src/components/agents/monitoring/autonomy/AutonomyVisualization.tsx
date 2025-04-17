
import React from 'react';
import { AgentNetworkGraph } from '@/components/3d-visualizations/AgentNetworkGraph';
import { StyledCard, StyledCardContent, StyledCardHeader, StyledCardTitle } from "@/components/ui/cards";
import { Network } from 'lucide-react';

export const AutonomyVisualization: React.FC = () => {
  return (
    <StyledCard className="mb-6">
      <StyledCardHeader className="pb-2">
        <StyledCardTitle className="text-lg flex items-center gap-2">
          <Network className="h-5 w-5 text-amber-500" />
          Vizualizare Rețea Agenți Autonomi
        </StyledCardTitle>
        <p className="text-sm text-muted-foreground">
          Vizualizare interactivă 3D a conexiunilor între agenții autonomi. Dimensiunea și culoarea nodurilor indică nivelul de autonomie.
        </p>
      </StyledCardHeader>
      <StyledCardContent>
        <div className="w-full h-[400px] rounded-md overflow-hidden border border-muted">
          <AgentNetworkGraph />
        </div>
        <div className="flex justify-center mt-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>Autonomie ridicată (&gt;70%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span>Autonomie medie (40-70%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span>Autonomie redusă (&lt;40%)</span>
            </div>
          </div>
        </div>
      </StyledCardContent>
    </StyledCard>
  );
};
