import { useState } from "react";
import { TransactionsBarChart, TransactionsPieChart } from "@/components/transactions";
import { StyledCard } from "@/components/ui/cards";

interface ReportChartsProps {
  dateRange: {
    startDate: Date | null;
    endDate: Date | null;
  };
}

export const ReportCharts: React.FC<ReportChartsProps> = ({ dateRange }) => {
  const [chartType, setChartType] = useState<'bar' | 'pie'>('bar');

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
          <TransactionsBarChart dateRange={dateRange} />
        ) : (
          <TransactionsPieChart dateRange={dateRange} />
        )}
      </StyledCard>
    </div>
  );
};
