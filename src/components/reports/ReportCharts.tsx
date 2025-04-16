
import { useState } from "react";
import { StyledCard } from "@/components/ui/cards";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Legend, Tooltip, Cell, Pie, PieChart } from "recharts";

interface ReportChartsProps {
  dateRange: {
    startDate: Date | null;
    endDate: Date | null;
  };
}

export const ReportCharts: React.FC<ReportChartsProps> = ({ dateRange }) => {
  const [chartType, setChartType] = useState<'bar' | 'pie'>('bar');

  // Sample data for demonstration
  const barData = [
    { date: "Lun", completed: 400, pending: 200, failed: 100, total: 700 },
    { date: "Mar", completed: 500, pending: 150, failed: 50, total: 700 },
    { date: "Mie", completed: 600, pending: 100, failed: 75, total: 775 },
    { date: "Joi", completed: 550, pending: 125, failed: 80, total: 755 },
    { date: "Vin", completed: 700, pending: 90, failed: 40, total: 830 },
  ];

  const pieData = [
    { name: "Completate", value: 2750, count: 55 },
    { name: "În așteptare", value: 665, count: 13 },
    { name: "Eșuate", value: 345, count: 7 },
    { name: "Anulate", value: 180, count: 3 }
  ];

  // Colors for the charts
  const COLORS = ["#10B981", "#F59E0B", "#EF4444", "#6B7280"];

  return (
    <div className="space-y-6">
      <StyledCard className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Volumul tranzacțiilor</h3>
          <div className="space-x-2">
            <button
              className={`px-3 py-1 rounded-md text-sm ${chartType === 'bar' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'}`}
              onClick={() => setChartType('bar')}
            >
              Bar chart
            </button>
            <button
              className={`px-3 py-1 rounded-md text-sm ${chartType === 'pie' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'}`}
              onClick={() => setChartType('pie')}
            >
              Pie chart
            </button>
          </div>
        </div>
        
        {chartType === 'bar' ? (
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" />
                <YAxis 
                  tickFormatter={(value) => `£${value}`} 
                  width={60}
                />
                <Tooltip 
                  formatter={(value) => [`£${value}`, undefined]}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Legend 
                  verticalAlign="bottom"
                  height={36}
                />
                <Bar dataKey="completed" fill={COLORS[0]} name="Finalizate" />
                <Bar dataKey="pending" fill={COLORS[1]} name="În așteptare" />
                <Bar dataKey="failed" fill={COLORS[2]} name="Eșuate" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`£${value}`, undefined]}
                />
                <Legend 
                  verticalAlign="bottom"
                  height={36}
                  formatter={(value, entry, index) => (
                    <span className="text-sm">{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </StyledCard>
    </div>
  );
};
