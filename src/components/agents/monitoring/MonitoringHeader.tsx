
import React from 'react';
import { Button } from "@/components/ui/button";
import { Play, Pause, Settings } from "lucide-react";
import { useAutonomousEngine } from "@/components/agents/autonomous-engine/AutonomousEngineProvider";
import { Badge } from "@/components/ui/badge";

interface MonitoringHeaderProps {
  agentsRunning?: number;
}

export const MonitoringHeader = ({ agentsRunning }: MonitoringHeaderProps) => {
  const { isRunning, agentsCount, startAgents, stopAgents } = useAutonomousEngine();
  
  const displayedAgentsCount = agentsRunning ?? agentsCount;
  
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          Monitorizare Agenți
          {isRunning && (
            <Badge variant="default" className="bg-green-500 hover:bg-green-600">
              Activ
            </Badge>
          )}
          {!isRunning && (
            <Badge variant="outline" className="bg-slate-100">
              Inactiv
            </Badge>
          )}
        </h1>
        <p className="text-muted-foreground mt-1">
          {isRunning
            ? `Sistem autonom activ cu ${displayedAgentsCount} agenți monitorizați în timp real`
            : "Sistemul autonom este oprit. Apăsați start pentru a activa agenții"}
        </p>
      </div>
      
      <div className="flex items-center gap-2 self-end sm:self-auto">
        {!isRunning ? (
          <Button onClick={startAgents} size="sm" className="gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
            <Play className="h-4 w-4" />
            <span>Start Agenți</span>
          </Button>
        ) : (
          <Button onClick={stopAgents} variant="outline" size="sm" className="gap-2 border-purple-200 text-purple-700 hover:bg-purple-50">
            <Pause className="h-4 w-4" />
            <span>Oprire Agenți</span>
          </Button>
        )}
        
        <Button variant="outline" size="sm" className="gap-2 border-slate-200 hover:bg-slate-50">
          <Settings className="h-4 w-4" />
          <span>Configurare</span>
        </Button>
      </div>
    </div>
  );
};
