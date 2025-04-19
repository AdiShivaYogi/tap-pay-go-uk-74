
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Brain, AlertTriangle } from "lucide-react";
import { AutoExecutionButton } from '@/components/agents/monitoring/autonomy/AutoExecutionButton';
import { AgentAutonomyStatus } from './AgentAutonomyStatus';
import { AdvancedAutonomyControls } from './AdvancedAutonomyControls';
import { useAutonomousEngine } from '@/components/agents/autonomous-engine/AutonomousEngineProvider';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export const AutonomyDashboard = () => {
  const { autonomyLevel } = useAutonomousEngine();
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2 mb-1">
          <Brain className="h-6 w-6 text-purple-700" />
          Dashboard Autonomie
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
          
          <Card className="mt-6">
            <CardHeader className="border-b border-slate-100 bg-slate-50 py-3">
              <CardTitle className="flex items-center gap-2 text-slate-800 text-base">
                <Brain className="h-5 w-5 text-purple-600" />
                Sistem Autonomie
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3">
              <div className="mb-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Nivel Autonomie</span>
                  <span className="text-sm font-medium">{autonomyLevel}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full">
                  <div 
                    className={`h-full rounded-full ${
                      autonomyLevel > 90 
                        ? 'bg-amber-500' 
                        : autonomyLevel > 70 
                          ? 'bg-green-500' 
                          : 'bg-blue-500'
                    }`}
                    style={{ width: `${autonomyLevel}%` }}
                  />
                </div>
              </div>
              <p className="text-sm text-slate-500 mt-2">
                Sistemul operează cu o autonomie de {autonomyLevel}%, permițând agenților să funcționeze 
                {autonomyLevel > 90 
                  ? " aproape complet independent." 
                  : autonomyLevel > 70 
                    ? " cu un grad ridicat de independență." 
                    : " cu supraveghere umană."}
              </p>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader className="border-b border-slate-100 bg-slate-50 py-3">
              <CardTitle className="flex items-center gap-2 text-slate-800 text-base">
                <Brain className="h-5 w-5 text-purple-600" />
                Raport activitate recentă
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="max-h-[250px]">
                <div className="p-3 space-y-2">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="p-2 border rounded-md bg-slate-50">
                      <div className="flex justify-between items-start">
                        <span className="text-sm font-medium">Activitate autonomă #{i}</span>
                        <span className="text-xs text-slate-500">Acum {i * 2} minute</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">
                        Agentul a {i % 2 === 0 ? "optimizat algoritmul de detectare anomalii" : "completat o sarcină de analiză"} 
                        cu un scor de performanță de {85 + i}%.
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <AutoExecutionButton />
          <AdvancedAutonomyControls />
        </div>
      </div>
    </div>
  );
};
