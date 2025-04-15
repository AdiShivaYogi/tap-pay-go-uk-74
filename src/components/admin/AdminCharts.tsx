
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TransactionsBarChart } from "@/components/transactions/TransactionsBarChart";
import { TransactionsPieChart } from "@/components/transactions/TransactionsPieChart";

interface AdminChartsProps {
  isLoading: boolean;
  monthlyData: any[];
  pieChartData: Array<{
    name: string;
    value: number;
    count: number;
  }>;
}

export const AdminCharts = ({ isLoading, monthlyData, pieChartData }: AdminChartsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="w-full h-[400px]">
        <CardHeader className="space-y-1">
          <CardTitle>Distribuția tranzacțiilor</CardTitle>
          <CardDescription>Status tranzacții după valoare totală</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-[300px] w-full" />
          ) : (
            <div className="h-[300px] w-full">
              <TransactionsPieChart data={pieChartData} />
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card className="w-full h-[400px]">
        <CardHeader className="space-y-1">
          <CardTitle>Evoluția comisioanelor</CardTitle>
          <CardDescription>Vizualizarea comisioanelor lunare</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-[300px] w-full" />
          ) : (
            <div className="h-[300px] w-full">
              <TransactionsBarChart data={monthlyData} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
