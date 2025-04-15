
import { StyledCard, StyledCardHeader, StyledCardTitle, StyledCardContent } from "@/components/ui/styled-card";
import { Skeleton } from "@/components/ui/skeleton";
import { TransactionsBarChart } from "@/components/transactions/TransactionsBarChart";
import { TransactionsPieChart } from "@/components/transactions/TransactionsPieChart";
import { prepareChartData, preparePieData } from "@/utils/chart-utils";
import { Transaction } from "@/types/transactions";
import { ChartBar, PieChart } from "lucide-react";

interface ReportChartsProps {
  transactions: Transaction[];
  isLoading: boolean;
  period: "week" | "month" | "all";
}

export const ReportCharts = ({ transactions, isLoading, period }: ReportChartsProps) => {
  const chartData = prepareChartData(transactions);
  const pieData = preparePieData(transactions);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <StyledCard className="bg-gradient-to-br from-card to-blue-500/5 backdrop-blur-sm">
        <StyledCardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="space-y-1">
            <StyledCardTitle>Evoluția tranzacțiilor</StyledCardTitle>
            <p className="text-sm text-muted-foreground">
              {period === "week" ? "Ultimele 7 zile" : 
               period === "month" ? "Luna curentă" : 
               "Toate tranzacțiile"}
            </p>
          </div>
          <ChartBar className="h-5 w-5 text-muted-foreground" />
        </StyledCardHeader>
        <StyledCardContent>
          {isLoading ? (
            <div className="h-[300px] flex items-center justify-center">
              <Skeleton className="h-full w-full" />
            </div>
          ) : (
            <div className="h-[300px]">
              <TransactionsBarChart data={chartData} />
            </div>
          )}
        </StyledCardContent>
      </StyledCard>

      <StyledCard className="bg-gradient-to-br from-card to-purple-500/5 backdrop-blur-sm">
        <StyledCardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="space-y-1">
            <StyledCardTitle>Distribuția statusurilor</StyledCardTitle>
            <p className="text-sm text-muted-foreground">
              Vizualizarea tranzacțiilor după status
            </p>
          </div>
          <PieChart className="h-5 w-5 text-muted-foreground" />
        </StyledCardHeader>
        <StyledCardContent>
          {isLoading ? (
            <div className="h-[300px] flex items-center justify-center">
              <Skeleton className="h-full w-full" />
            </div>
          ) : (
            <div className="h-[300px]">
              <TransactionsPieChart data={pieData} />
            </div>
          )}
        </StyledCardContent>
      </StyledCard>
    </div>
  );
};
