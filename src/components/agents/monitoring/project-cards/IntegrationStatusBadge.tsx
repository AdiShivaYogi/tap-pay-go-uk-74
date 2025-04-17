
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Database, Cpu, Activity, Server, Shield } from "lucide-react";

export type IntegrationType = "dataSources" | "riskEvaluation" | "monitoring" | "logging" | "adaptiveSafety";

interface IntegrationTypeConfig {
  label: string;
  icon: React.ElementType;
  activeColor: string;
  inactiveColor: string;
}

const integrationTypeConfig: Record<IntegrationType, IntegrationTypeConfig> = {
  dataSources: {
    label: "Date",
    icon: Database,
    activeColor: "bg-blue-500 hover:bg-blue-600",
    inactiveColor: "bg-slate-400 hover:bg-slate-500"
  },
  riskEvaluation: {
    label: "Risc",
    icon: Shield,
    activeColor: "bg-amber-500 hover:bg-amber-600",
    inactiveColor: "bg-slate-400 hover:bg-slate-500"
  },
  monitoring: {
    label: "Monitor",
    icon: Activity,
    activeColor: "bg-green-500 hover:bg-green-600",
    inactiveColor: "bg-slate-400 hover:bg-slate-500" 
  },
  logging: {
    label: "Jurnal",
    icon: Server,
    activeColor: "bg-purple-500 hover:bg-purple-600",
    inactiveColor: "bg-slate-400 hover:bg-slate-500"
  },
  adaptiveSafety: {
    label: "Adapt",
    icon: Cpu,
    activeColor: "bg-rose-500 hover:bg-rose-600",
    inactiveColor: "bg-slate-400 hover:bg-slate-500"
  }
};

interface IntegrationStatusBadgeProps {
  type: IntegrationType;
  progress: number;
  className?: string;
}

export const IntegrationStatusBadge: React.FC<IntegrationStatusBadgeProps> = ({ 
  type, 
  progress,
  className 
}) => {
  const config = integrationTypeConfig[type];
  const isActive = progress >= 50;
  const Icon = config.icon;
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge 
            className={cn(
              "text-white text-xs py-0.5 px-1.5 gap-1",
              isActive ? config.activeColor : config.inactiveColor,
              className
            )}
          >
            <Icon className="h-3 w-3" />
            {config.label}
          </Badge>
        </TooltipTrigger>
        <TooltipContent side="top" className="text-xs">
          <p>{isActive ? "Integrat" : "Neintegrat"}: {config.label}</p>
          <p className="font-semibold">Progres: {progress}%</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
