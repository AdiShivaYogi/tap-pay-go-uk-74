
import React from 'react';
import { ArrowUpRight, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface UpcomingFocusItem {
  title: string;
  timeframe: string;
  priority: "high" | "medium" | "low";
}

interface UpcomingPrioritiesProps {
  items: UpcomingFocusItem[];
}

export const UpcomingPriorities = ({ items }: UpcomingPrioritiesProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Calendar className="h-4 w-4 text-primary" />
        <span>Următoarele priorități</span>
      </h3>
      
      <div className="grid gap-3">
        {items.map((item, index) => (
          <div 
            key={index} 
            className={cn(
              "flex justify-between items-center p-3 rounded-md",
              item.priority === "high" 
                ? "bg-red-50 border border-red-100" 
                : "bg-blue-50 border border-blue-100"
            )}
          >
            <div className="flex items-center gap-2">
              <ArrowUpRight className={cn(
                "h-4 w-4",
                item.priority === "high" ? "text-red-500" : "text-blue-500"
              )} />
              <span className="font-medium text-sm">{item.title}</span>
            </div>
            <Badge variant="outline" className="text-xs">
              {item.timeframe}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
};
