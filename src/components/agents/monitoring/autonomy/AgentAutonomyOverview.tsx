
import React from "react";
import { StatsCard } from "@/components/ui/cards/stats-card";
import { Brain, Zap, Activity, Users, Shield, Gauge } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { agents } from "@/components/agents/agents-data";
import { useSafetyPanel } from "@/components/agents/monitoring/safety/hooks/useSafetyPanel";

interface AgentAutonomyOverviewProps {
  autonomyLevel: number;
  agentsRunning: boolean;
}

export const AgentAutonomyOverview: React.FC<AgentAutonomyOverviewProps> = ({
  autonomyLevel,
  agentsRunning,
}) => {
  const { toast } = useToast();
  const { startAutonomousExecution } = useSafetyPanel();

  const handleMaximizeAutonomy = () => {
    startAutonomousExecution();
    toast({
      title: "Autonomie maximizată",
      description: "Toți agenții au fost configurați pentru autonomie completă",
      duration: 3000,
    });
  };

  const getAutonomyStatus = () => {
    if (autonomyLevel >= 90) return "Completă";
    if (autonomyLevel >= 70) return "Ridicată";
    if (autonomyLevel >= 40) return "Moderată";
    if (autonomyLevel >= 20) return "Limitată";
    return "Minimă";
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Brain className="h-5 w-5 text-amber-500" /> Statusul Autonomiei Agenților
        </h2>
        <button
          onClick={handleMaximizeAutonomy}
          className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-4 py-1.5 rounded-md flex items-center gap-1.5 text-sm"
        >
          <Zap className="h-4 w-4" />
          Maximizează Autonomia
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-4">
        <StatsCard
          title="Nivel Autonomie"
          value={`${autonomyLevel}%`}
          description={getAutonomyStatus()}
          icon={Brain}
          colorClass="text-amber-500"
        />
        
        <StatsCard
          title="Agenți Activi"
          value={agentsRunning ? agents.length : 0}
          description={agentsRunning ? "Toți agenții rulează" : "Agenți în standby"}
          icon={Users}
          colorClass="text-blue-500"
        />

        <StatsCard
          title="Performanță"
          value="92.4%"
          description="Procesare eficientă"
          icon={Gauge}
          colorClass="text-green-500"
        />

        <StatsCard
          title="Procese Active"
          value="18"
          description="Operațiuni curente"
          icon={Activity}
          colorClass="text-purple-500"
        />

        <StatsCard
          title="Limite Siguranță"
          value={autonomyLevel > 80 ? "Reduse" : "Active"}
          description="Monitorizare continuă"
          icon={Shield}
          colorClass={autonomyLevel > 80 ? "text-amber-500" : "text-green-500"}
        />

        <StatsCard
          title="Viteză Execuție"
          value="Ridicată"
          description="Optimizare completă"
          icon={Zap}
          colorClass="text-orange-500"
        />
      </div>

      <div className="bg-white dark:bg-slate-900 border rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium flex items-center gap-1">
            <Gauge className="h-4 w-4 text-amber-500" /> Nivel global de autonomie
          </h3>
          <span className="text-sm font-medium">{autonomyLevel}%</span>
        </div>

        <Progress 
          value={autonomyLevel} 
          className="h-3 bg-gray-100 dark:bg-gray-800" 
        />
        
        <div className="flex justify-between mt-1 text-xs text-muted-foreground">
          <span>Supervizat</span>
          <span>Semi-autonom</span>
          <span>Complet autonom</span>
        </div>
      </div>
    </div>
  );
};
