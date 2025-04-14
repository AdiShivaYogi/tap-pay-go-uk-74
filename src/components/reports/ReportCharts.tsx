
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TransactionsBarChart } from "@/components/transactions/TransactionsBarChart";
import { TransactionsPieChart } from "@/components/transactions/TransactionsPieChart";
import { prepareChartData, preparePieData } from "@/utils/chart-utils";
import { Transaction } from "@/types/transactions";

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
        <CardHeader>
          <CardTitle>Evoluția tranzacțiilor</CardTitle>
          <CardDescription>
            {period === "week" ? "Ultimele 7 zile" : 
             period === "month" ? "Luna curentă" : 
             "Toate tranzacțiile"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="h-[300px] flex items-center justify-center">
              <Skeleton className="h-full w-full" />
            </div>
          ) : (
            <TransactionsBarChart data={chartData} />
          )}
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Distribuția statusurilor</CardTitle>
          <CardDescription>
            Vizualizarea tranzacțiilor după status
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="h-[300px] flex items-center justify-center">
              <Skeleton className="h-full w-full" />
            </div>
          ) : (
            <TransactionsPieChart data={pieData} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};
