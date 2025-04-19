
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Brain, AlertTriangle } from "lucide-react";
import { AutoExecutionButton } from '@/components/agents/monitoring/autonomy/AutoExecutionButton';
import { AgentAutonomyStatus } from './AgentAutonomyStatus';
import { AdvancedAutonomyControls } from './AdvancedAutonomyControls';
import { useAutonomousEngine } from '@/components/agents/autonomous-engine/AutonomousEngineProvider';

export const AutonomyDashboard = () => {
  const { autonomyLevel } = useAutonomousEngine();
  
  return (
    <div className="space-y-6 pb-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2 mb-1">
          <Brain className="h-6 w-6 text-purple-700" />
          Dashboard Autonomie Agenți
        </h1>
        <p className="text-muted-foreground">
          Control și monitorizare pentru ecosistemul autonom de agenți AI
        </p>
      </div>

      {autonomyLevel >= 95 && (
        <Alert className="border-amber-300 bg-amber-50">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertTitle className="text-amber-800">Autonomie maximă activată</AlertTitle>
          <AlertDescription className="text-amber-700">
            Agenții operează cu autonomie aproape completă. Sistemul evoluează și învață independent,
            cu intervenție umană minimă. Monitorizați atent performanța.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AgentAutonomyStatus />
        </div>
        <div className="space-y-6">
          <AutoExecutionButton />
          <AdvancedAutonomyControls />
        </div>
      </div>
    </div>
  );
};
