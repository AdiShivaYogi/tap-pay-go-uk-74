
import React from 'react';
import { AdvancedAutonomyControls } from './AdvancedAutonomyControls';
import { AgentAutonomyStatus } from './AgentAutonomyStatus';
import { AutoExecutionButton } from '@/components/agents/monitoring/autonomy/AutoExecutionButton';
import { useAutonomousEngine } from '@/components/agents/autonomous-engine/AutonomousEngineProvider';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Brain, Info, Zap, AlertTriangle } from "lucide-react";

export const AutonomyDashboard = () => {
  const { isRunning, autonomyLevel } = useAutonomousEngine();
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Brain className="h-6 w-6 text-purple-700" />
          Dashboard Autonomie Agenți
        </h1>
        <p className="text-muted-foreground mt-1">
          Control și monitorizare pentru ecosistemul autonom de agenți AI
        </p>
      </div>
      
      {autonomyLevel < 50 && (
        <Alert className="mb-4">
          <Info className="h-4 w-4" />
          <AlertTitle>Autonomie limitată</AlertTitle>
          <AlertDescription>
            Nivelul curent de autonomie este sub 50%. Agenții necesită aprobare manuală pentru majoritatea acțiunilor.
            Folosiți controalele de mai jos pentru a crește gradul de autonomie.
          </AlertDescription>
        </Alert>
      )}
      
      {autonomyLevel >= 95 && (
        <Alert className="mb-4 border-amber-300 bg-amber-50">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertTitle className="text-amber-800">Autonomie maximă activată</AlertTitle>
          <AlertDescription className="text-amber-700">
            Agenții operează cu autonomie aproape completă. Sistemul evoluează și învață independent,
            cu intervenție umană minimă. Monitorizați atent performanța.
          </AlertDescription>
        </Alert>
      )}
      
      {!isRunning && (
        <Alert className="mb-4 border-blue-300 bg-blue-50">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertTitle className="text-blue-800">Sistem în așteptare</AlertTitle>
          <AlertDescription className="text-blue-700">
            Sistemul de agenți este în prezent inactiv. Utilizați butonul "Lansare totală autonomie"
            pentru a activa ecosistemul complet de agenți autonomi.
          </AlertDescription>
        </Alert>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="md:col-span-2">
          <AgentAutonomyStatus />
        </div>
        <div>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-4">
            <h3 className="text-sm font-medium mb-3 flex items-center gap-1.5">
              <Zap className="h-4 w-4 text-amber-600" />
              Acțiuni rapide
            </h3>
            <AutoExecutionButton />
          </div>
          <AdvancedAutonomyControls />
        </div>
      </div>
    </div>
  );
};
