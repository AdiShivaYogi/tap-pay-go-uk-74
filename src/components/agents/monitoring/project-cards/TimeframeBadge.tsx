
import React from "react";
import { Badge } from "@/components/ui/badge";

interface TimeframeBadgeProps {
  timeframe: string;
}

export const TimeframeBadge: React.FC<TimeframeBadgeProps> = ({ timeframe }) => {
  return (
    <Badge variant="outline" className="rounded-full px-3 py-0.5 bg-zinc-100 text-zinc-800 border-zinc-200">
      {timeframe}
    </Badge>
  );
};
