
import React from "react";
import { PageHeader } from "@/components/ui/layout/page-header";
import { Brain } from "lucide-react";
import { AutoExecutionButton } from "./autonomy/AutoExecutionButton";

interface MonitoringHeaderProps {
  agentsRunning: boolean;
}

export const MonitoringHeader: React.FC<MonitoringHeaderProps> = ({ 
  agentsRunning 
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <PageHeader
        icon={Brain}
        title="Control & Monitorizare Agenți"
        description={agentsRunning ? 
          "Agenții autonomi sunt activi și evoluează independent cu privilegii complete" : 
          "Monitorizarea agenților și statusul activităților autonome"}
        gradient={true}
      />
      
      <div className="flex items-center space-x-2">
        <AutoExecutionButton variant="header" />
      </div>
    </div>
  );
};
