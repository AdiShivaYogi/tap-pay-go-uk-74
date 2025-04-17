
import React from "react";
import { PageHeader } from "@/components/ui/layout/page-header";
import { Activity } from "lucide-react";
import { AutoExecutionButton } from "./autonomy/AutoExecutionButton";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

interface MonitoringHeaderProps {
  agentsRunning: boolean;
}

export const MonitoringHeader: React.FC<MonitoringHeaderProps> = ({ agentsRunning }) => {
  return (
    <div className="flex items-center justify-between">
      <PageHeader
        icon={Activity}
        title="Monitorizare Agenți"
        description="Urmărește activitatea agenților AI și progresul proiectelor de dezvoltare"
      />
      <div className="flex gap-3 items-center">
        <AutoExecutionButton variant="headerButton" />
        <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white text-sm py-1.5 px-3 flex items-center gap-1.5">
          <Sparkles className="h-4 w-4" />
          {agentsRunning ? "Toți Agenții Activi" : "Agenți în Standby"}
        </Badge>
      </div>
    </div>
  );
};
