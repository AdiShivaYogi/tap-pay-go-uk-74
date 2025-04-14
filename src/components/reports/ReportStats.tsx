
import { Card, CardHeader, CardDescription, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Transaction } from "@/types/transactions";

interface ReportStatsProps {
  transactions: Transaction[];
  isLoading: boolean;
}

export const ReportStats = ({ transactions, isLoading }: ReportStatsProps) => {
  const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);
  const successfulTransactions = transactions.filter(t => t.status === 'completed');
  const totalSuccessful = successfulTransactions.reduce((sum, t) => sum + t.amount, 0);
  const successRate = transactions.length ? (successfulTransactions.length / transactions.length) * 100 : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Total tranzacții</CardDescription>
          <CardTitle className="text-2xl">
            {isLoading ? <Skeleton className="h-8 w-20" /> : transactions.length}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Valoare totală</CardDescription>
          <CardTitle className="text-2xl">
            {isLoading ? <Skeleton className="h-8 w-20" /> : `£${totalAmount.toFixed(2)}`}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Tranzacții reușite</CardDescription>
          <CardTitle className="text-2xl">
            {isLoading ? <Skeleton className="h-8 w-20" /> : `£${totalSuccessful.toFixed(2)}`}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Rata de succes</CardDescription>
          <CardTitle className="text-2xl">
            {isLoading ? <Skeleton className="h-8 w-20" /> : `${successRate.toFixed(1)}%`}
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
};
