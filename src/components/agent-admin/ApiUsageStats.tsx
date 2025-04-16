
import React, { useState } from "react";
import { StatsCard } from "@/components/ui/cards/stats-card";
import { Brain, DollarSign, MessageSquare, Clock, BarChart3 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/types-extension";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";

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

  if (isLoading) {
    return <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-24 bg-muted animate-pulse rounded-lg" />
      ))}
    </div>;
  }

  if (error) {
    return <Card className="bg-destructive/10 border-destructive">
      <CardContent className="pt-6">
        <p className="text-destructive">Eroare la încărcarea statisticilor: {String(error)}</p>
      </CardContent>
    </Card>;
  }

  // Prepare data for charts
  const periodData = stats?.periodBreakdown ? 
    Object.entries(stats.periodBreakdown).map(([period, data]: [string, any]) => ({
      name: period === 'standard' ? 'Standard' : 'Ore reduse',
      tokens: data.totalTokens,
      cost: parseFloat(data.totalCost.toFixed(2)),
      count: data.promptCount
    })) : [];

  const promptTypeData = stats?.promptTypeDistribution ?
    Object.entries(stats.promptTypeDistribution).map(([type, data]: [string, any]) => ({
      name: type === 'standard' ? 'Standard' : 
            type === 'conversation_starter' ? 'Inițiere conversație' :
            type === 'task_proposal' ? 'Propunere task' : 
            type === 'code_proposal' ? 'Propunere cod' : type,
      value: data.count,
      cost: parseFloat(data.totalCost.toFixed(2))
    })) : [];

  // Colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

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
          value={`$${stats?.totalCost.toFixed(2) || '0.00'}`}
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
          value={`${stats?.avgResponseTime.toFixed(1) || '0.0'}s`}
          icon={Clock}
          colorClass="text-purple-500"
          description="Timp mediu de procesare"
        />
      </div>

      {stats && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
          {/* Cost by Period Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium">Cost după perioada de utilizare</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={periodData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
                  >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="cost" name="Cost ($)" fill="#8884d8" />
                    <Bar dataKey="count" name="Nr. prompt-uri" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Prompt Type Distribution Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium">Distribuție după tipul de prompt</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={promptTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {promptTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value, name, props) => [value, props.payload.name]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
