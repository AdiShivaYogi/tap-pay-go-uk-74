
import React from "react";
import { useRouter } from "@/hooks/use-router";
import { Bot, ChevronRight, PlusCircle, Settings, LineChart, AlertTriangle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/layout/page-header";
import { useAgentMonitoring } from "./hooks";
import { AutoExecutionButton } from "./autonomy/AutoExecutionButton";

interface MonitoringHeaderProps {
  agentsRunning: boolean;
}

export const MonitoringHeader: React.FC<MonitoringHeaderProps> = ({ agentsRunning }) => {
  const router = useRouter();
  const { autoExecutionStatus } = useAgentMonitoring();
  
  // Verificăm dacă toate privilegiile sunt activate
  const allPrivilegesGranted = autoExecutionStatus && 
    Object.values(autoExecutionStatus).every(status => status === true);
  
  return (
    <div className="flex flex-col gap-2 mb-6">
      <div className="flex justify-between items-center">
        <PageHeader
          icon={Bot}
          title="Control & Monitorizare Agenți"
          description="Supraveghere și control al agenților autonomi din platformă"
        />
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => router.push('/admin/agents/settings')}
            className="flex items-center gap-1.5"
          >
            <Settings size={14} />
            Setări
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => router.push('/admin/agents/analytics')}
            className="hidden md:flex items-center gap-1.5"
          >
            <LineChart size={14} />
            Analitice
          </Button>
          
          <AutoExecutionButton 
            variant="header"
            completed={allPrivilegesGranted}
          />
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Badge 
            variant={agentsRunning ? "success" : "default"}
            className="flex items-center gap-1"
          >
            <Sparkles size={14} />
            {agentsRunning ? 'Agenți activi' : 'Agenți inactivi'}
          </Badge>
          
          {allPrivilegesGranted && (
            <Badge 
              variant="warning"
              className="flex items-center gap-1"
            >
              <AlertTriangle size={14} />
              Privilegii complete
            </Badge>
          )}
        </div>
        
        <Button
          size="sm"
          variant="ghost"
          className="flex items-center gap-1 text-xs font-normal"
          onClick={() => router.push('/admin/agents/add')}
        >
          <PlusCircle size={14} />
          Adaugă agent
          <ChevronRight size={14} />
        </Button>
      </div>
    </div>
  );
};
