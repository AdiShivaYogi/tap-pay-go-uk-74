
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <Card>
        <CardHeader>
          <CardTitle>Distribuția tranzacțiilor</CardTitle>
          <CardDescription>Status tranzacții după valoare totală</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-[300px] w-full" />
          ) : (
            <TransactionsPieChart data={pieChartData} />
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Evoluția comisioanelor</CardTitle>
          <CardDescription>Vizualizarea comisioanelor lunare</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-[300px] w-full" />
          ) : (
            <TransactionsBarChart data={monthlyData} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};
