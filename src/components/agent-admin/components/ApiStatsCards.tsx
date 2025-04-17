
import React from "react";
import { StatsCard } from "@/components/ui/cards/stats-card";
import { Brain, DollarSign, MessageSquare, Clock } from "lucide-react";

interface ApiStatsCardsProps {
  stats: {
    totalTokens: number;
    totalCost: number;
    totalPrompts: number;
    avgResponseTime: number;
  } | undefined;
  isLoading: boolean;
}

export const ApiStatsCards: React.FC<ApiStatsCardsProps> = ({ stats, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-24 rounded-lg bg-slate-100 animate-pulse" />
        ))}
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <StatsCard
        title="Total tokeni utilizați"
        value={stats?.totalTokens.toLocaleString() || '0'}
        icon={Brain}
        description="Tokeni procesați în total"
        colorClass="text-purple-600"
      />
      
      <StatsCard
        title="Cost total"
        value={`$${stats?.totalCost.toFixed(2) || '0.00'}`}
        icon={DollarSign}
        colorClass="text-green-600"
        description="Cost total API"
      />
      
      <StatsCard
        title="Prompt-uri procesate"
        value={stats?.totalPrompts.toLocaleString() || '0'}
        icon={MessageSquare}
        colorClass="text-blue-600"
        description="Număr total de prompt-uri"
      />
      
      <StatsCard
        title="Timp mediu răspuns"
        value={`${stats?.avgResponseTime.toFixed(1) || '0.0'}s`}
        icon={Clock}
        colorClass="text-amber-600"
        description="Timp mediu de procesare"
      />
    </div>
  );
};
