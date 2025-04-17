
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { ActivityData } from "./hooks/useAgentMonitoring";
import { Skeleton } from "@/components/ui/skeleton";

interface AgentActivityChartProps {
  data: ActivityData[];
  isLoading: boolean;
  filter: string | null;
}

const chartConfig = {
  task: { color: "#8884d8" },
  proposal: { color: "#82ca9d" },
  conversation: { color: "#ffc658" },
  other: { color: "#ff8042" },
};

export const AgentActivityChart: React.FC<AgentActivityChartProps> = ({ 
  data, 
  isLoading,
  filter
}) => {
  // Filtrare date în funcție de categorie dacă există un filtru activ
  const filteredData = filter 
    ? data.filter(item => item.category === filter)
    : data;

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-full space-y-3">
          <Skeleton className="h-[250px] w-full rounded-lg" />
          <div className="flex justify-center gap-3">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <ChartContainer className="w-full h-full" config={chartConfig}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={filteredData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 30,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="agentName" />
          <YAxis />
          <Tooltip content={<ChartTooltipContent />} />
          <Legend />
          <Bar dataKey="taskCount" name="Taskuri" fill="#8884d8" />
          <Bar dataKey="proposalCount" name="Propuneri" fill="#82ca9d" />
          <Bar dataKey="conversationCount" name="Conversații" fill="#ffc658" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
