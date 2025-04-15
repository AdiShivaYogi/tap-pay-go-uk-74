
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts";

interface TransactionsPieChartProps {
  data: Array<{
    name: string;
    value: number;
    count: number;
  }>;
}

export const TransactionsPieChart = ({ data }: TransactionsPieChartProps) => {
  const COLORS = ["#10B981", "#F59E0B", "#EF4444", "#6B7280"];
  
  return (
    <ChartContainer config={{}} className="h-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="bottom"
            height={36}
            formatter={(value, entry, index) => (
              <span className="text-sm">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload || !payload.length) {
    return null;
  }

  const data = payload[0].payload;
  
  return (
    <ChartTooltipContent>
      <div className="text-sm font-medium mb-2">{data.name}</div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between gap-2">
          <span className="text-muted-foreground">Valoare totală</span>
          <span className="font-mono tabular-nums font-medium">£{data.value.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-muted-foreground">Număr tranzacții</span>
          <span className="font-mono tabular-nums font-medium">{data.count}</span>
        </div>
      </div>
    </ChartTooltipContent>
  );
};
