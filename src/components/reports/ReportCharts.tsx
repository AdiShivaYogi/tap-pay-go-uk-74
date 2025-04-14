
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
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
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="space-y-1">
            <CardTitle>Evoluția tranzacțiilor</CardTitle>
            <CardDescription>
              {period === "week" ? "Ultimele 7 zile" : 
               period === "month" ? "Luna curentă" : 
               "Toate tranzacțiile"}
            </CardDescription>
          </div>
          <ChartBar className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="h-[300px] flex items-center justify-center">
              <Skeleton className="h-full w-full" />
            </div>
          ) : (
            <div className="h-[300px]">
              <TransactionsBarChart data={chartData} />
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="space-y-1">
            <CardTitle>Distribuția statusurilor</CardTitle>
            <CardDescription>
              Vizualizarea tranzacțiilor după status
            </CardDescription>
          </div>
          <PieChart className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="h-[300px] flex items-center justify-center">
              <Skeleton className="h-full w-full" />
            </div>
          ) : (
            <div className="h-[300px]">
              <TransactionsPieChart data={pieData} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
