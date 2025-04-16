
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/types-extension";
import { Card, CardContent } from "@/components/ui/card";
import { ApiStatsCards } from "./components/ApiStatsCards";
import { TimeframeSelector } from "./components/TimeframeSelector";
import { PeriodBreakdownChart } from "./components/PeriodBreakdownChart";
import { PromptTypeChart } from "./components/PromptTypeChart";
import { preparePeriodData, preparePromptTypeData } from "./utils/chart-data-utils";

export const ApiUsageStats = () => {
  const [timeframe, setTimeframe] = useState('30d');
  
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['api-usage-stats', timeframe],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('get-deepseek-stats', {
        body: { timeframe }
      });
      
      if (error) throw error;
      return data;
    }
  });

  if (error) {
    return (
      <Card className="bg-destructive/10 border-destructive">
        <CardContent className="pt-6">
          <p className="text-destructive">Eroare la încărcarea statisticilor: {String(error)}</p>
        </CardContent>
      </Card>
    );
  }

  // Transform data for charts
  const periodData = preparePeriodData(stats?.periodBreakdown);
  const promptTypeData = preparePromptTypeData(stats?.promptTypeDistribution);

  return (
    <div className="space-y-4 mb-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Statistici API Deepseek</h2>
        <TimeframeSelector timeframe={timeframe} setTimeframe={setTimeframe} />
      </div>
      
      <ApiStatsCards stats={stats} isLoading={isLoading} />

      {stats && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
          <PeriodBreakdownChart data={periodData} />
          <PromptTypeChart data={promptTypeData} />
        </div>
      )}
    </div>
  );
};
