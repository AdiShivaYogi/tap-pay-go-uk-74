
import React from "react";
import { StatsCard } from "@/components/ui/cards/stats-card";
import { Brain, DollarSign, MessageSquare, Clock } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/types-extension";

export const ApiUsageStats = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['api-usage-stats'],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('get-deepseek-stats', {
        body: { }
      });
      
      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-24 bg-muted animate-pulse rounded-lg" />
      ))}
    </div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <StatsCard
        title="Total tokens utilizați"
        value={stats?.totalTokens.toLocaleString() || '0'}
        icon={Brain}
        description="Tokeni procesați în total"
      />
      
      <StatsCard
        title="Cost total"
        value={`$${stats?.totalCost.toFixed(2)}`}
        icon={DollarSign}
        colorClass="text-green-500"
        description="Cost total API"
      />
      
      <StatsCard
        title="Prompt-uri procesate"
        value={stats?.totalPrompts.toLocaleString() || '0'}
        icon={MessageSquare}
        colorClass="text-blue-500"
        description="Număr total de prompt-uri"
      />
      
      <StatsCard
        title="Timp mediu răspuns"
        value={`${stats?.avgResponseTime.toFixed(1)}s`}
        icon={Clock}
        colorClass="text-purple-500"
        description="Timp mediu de procesare"
      />
    </div>
  );
};
