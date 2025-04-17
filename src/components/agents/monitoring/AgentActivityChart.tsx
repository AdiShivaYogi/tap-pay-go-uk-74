
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { ActivityData } from "./hooks";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChart3 } from "lucide-react";

interface AgentActivityChartProps {
  data: ActivityData[];
  isLoading: boolean;
  filter: string | null;
}

const chartConfig = {
  task: { color: "#8884d8" },
  proposal: { color: "#82ca9d" },
  conversation: { color: "#ffc658" },
  monitoring: { color: "#4da3ff" },
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

  if (filteredData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-4 border-2 border-dashed border-muted rounded-lg">
        <BarChart3 className="h-12 w-12 text-muted-foreground mb-4 opacity-30" />
        <h3 className="font-medium mb-2">Nu există date pentru grafic</h3>
        <p className="text-sm text-muted-foreground max-w-md">
          {filter 
            ? `Nu există date pentru categoria "${filter}". Încearcă să selectezi altă categorie sau generează activități de test.`
            : `Agenții nu au înregistrat activități încă. Folosește modul de testare pentru a genera activități demonstrative.`
          }
        </p>
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
