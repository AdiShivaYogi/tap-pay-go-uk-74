
import React from 'react';
import { Badge } from "@/components/ui/badge";

interface AutonomyHeaderProps {
  autonomyLevel: number;
  isRunning: boolean;
}

export const AutonomyHeader = ({ autonomyLevel, isRunning }: AutonomyHeaderProps) => {
  const getAutonomyIndicator = () => {
    if (autonomyLevel >= 95) return "Extremă";
    if (autonomyLevel >= 85) return "Foarte Ridicată";
    if (autonomyLevel >= 70) return "Ridicată";
    if (autonomyLevel >= 50) return "Moderată";
    return "Limitată";
  };

  const getAutonomyBadgeClass = () => {
    if (autonomyLevel >= 95) return "bg-red-500";
    if (autonomyLevel >= 85) return "bg-amber-500";
    if (autonomyLevel >= 70) return "bg-yellow-500";
    if (autonomyLevel >= 50) return "bg-emerald-500";
    return "bg-blue-500";
  };

  return (
    <div className="flex justify-between items-center">
      <div>
        <p className="text-sm font-medium">Nivel autonomie:</p>
        <div className="flex items-center mt-1 gap-2">
          <span className="text-2xl font-bold">{autonomyLevel}%</span>
          <Badge className={getAutonomyBadgeClass()}>
            {getAutonomyIndicator()}
          </Badge>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium">Status:</p>
        <div className="flex items-center gap-2 justify-end mt-1">
          <span className={`h-3 w-3 rounded-full ${isRunning ? 'bg-green-500' : 'bg-red-500'}`}></span>
          <span className="font-medium">{isRunning ? 'Activ' : 'Inactiv'}</span>
        </div>
      </div>
    </div>
  );
};
