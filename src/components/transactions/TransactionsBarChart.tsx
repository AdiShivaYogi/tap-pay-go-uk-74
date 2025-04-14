
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Legend, Tooltip } from "recharts";

interface TransactionsBarChartProps {
  data: Array<{
    date: string;
    total: number;
    completed: number;
    failed: number;
    pending: number;
  }>;
}

export const TransactionsBarChart = ({ data }: TransactionsBarChartProps) => {
  const config = {
    completed: {
      label: "Finalizate",
      color: "#10B981", // green-500
    },
    pending: {
      label: "În așteptare",
      color: "#F59E0B", // amber-500
    },
    failed: {
      label: "Eșuate",
      color: "#EF4444", // red-500
    },
  };

  return (
    <ChartContainer config={config} className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" />
          <YAxis 
            tickFormatter={(value) => `£${value}`} 
            width={60}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="completed" fill={config.completed.color} name="Finalizate" />
          <Bar dataKey="pending" fill={config.pending.color} name="În așteptare" />
          <Bar dataKey="failed" fill={config.failed.color} name="Eșuate" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) {
    return null;
  }

  return (
    <ChartTooltipContent>
      <div className="text-sm font-medium mb-2">{label}</div>
      {payload.map((entry: any, index: number) => (
        <div key={`item-${index}`} className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            <div 
              className="w-2 h-2 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-muted-foreground">{entry.name}</span>
          </div>
          <span className="font-mono tabular-nums font-medium">£{entry.value.toFixed(2)}</span>
        </div>
      ))}
    </ChartTooltipContent>
  );
};
