
import React from "react";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "../StatusBadge";
import { PriorityBadge } from "../PriorityBadge";
import { TimeframeBadge } from "../TimeframeBadge";
import { IntegrationStatusBadge } from "../IntegrationStatusBadge";

interface ProjectBadgesProps {
  status: string;
  priority: string;
  timeframe: string;
  integrationProgress?: number;
  isAutonomyProject: boolean;
}

export const ProjectBadges: React.FC<ProjectBadgesProps> = ({
  status,
  priority,
  timeframe,
  integrationProgress,
  isAutonomyProject,
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <StatusBadge status={isAutonomyProject ? "completed" : status} />
      <PriorityBadge priority={priority} />
      <TimeframeBadge timeframe={timeframe} />
      
      {integrationProgress !== undefined && (
        <IntegrationStatusBadge 
          type="autonomy" 
          progress={isAutonomyProject ? 100 : integrationProgress} 
        />
      )}
      
      {isAutonomyProject && (
        <Badge className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
          Autonom
        </Badge>
      )}
    </div>
  );
};
