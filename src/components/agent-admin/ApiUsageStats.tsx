
import React from "react";
import { StatsCard } from "@/components/ui/cards/stats-card";
import { Brain, DollarSign, MessageSquare, Clock, BarChart3 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/types-extension";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const ApiUsageStats = () => {
  const [timeframe, setTimeframe] = React.useState('30d');
  
  const { data: stats, isLoading } = useQuery({
    queryKey: ['api-usage-stats', timeframe],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('get-deepseek-stats', {
        body: { timeframe }
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
    <div className="space-y-4 mb-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Statistici API Deepseek</h2>
        <Tabs value={timeframe} onValueChange={setTimeframe} className="w-auto">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="1d">Zi</TabsTrigger>
            <TabsTrigger value="7d">7 zile</TabsTrigger>
            <TabsTrigger value="30d">30 zile</TabsTrigger>
            <TabsTrigger value="all">Toate</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard
          title="Total tokeni utilizați"
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
    </div>
  );
};
