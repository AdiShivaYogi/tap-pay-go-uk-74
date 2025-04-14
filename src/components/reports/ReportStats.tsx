
import { Card, CardHeader, CardDescription, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Transaction } from "@/types/transactions";
import { ArrowUpCircle, BadgeDollarSign, CircleDollarSign, PercentCircle } from "lucide-react";

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
      <Card className="relative overflow-hidden">
        <CardHeader className="pb-2">
          <div className="absolute right-4 top-4 opacity-20">
            <CircleDollarSign className="h-8 w-8" />
          </div>
          <CardDescription>Total tranzacții</CardDescription>
          <CardTitle className="text-2xl">
            {isLoading ? <Skeleton className="h-8 w-20" /> : transactions.length}
          </CardTitle>
        </CardHeader>
      </Card>
      
      <Card className="relative overflow-hidden">
        <CardHeader className="pb-2">
          <div className="absolute right-4 top-4 opacity-20">
            <BadgeDollarSign className="h-8 w-8" />
          </div>
          <CardDescription>Valoare totală</CardDescription>
          <CardTitle className="text-2xl">
            {isLoading ? <Skeleton className="h-8 w-20" /> : `£${totalAmount.toFixed(2)}`}
          </CardTitle>
        </CardHeader>
      </Card>
      
      <Card className="relative overflow-hidden">
        <CardHeader className="pb-2">
          <div className="absolute right-4 top-4 opacity-20">
            <ArrowUpCircle className="h-8 w-8" />
          </div>
          <CardDescription>Tranzacții reușite</CardDescription>
          <CardTitle className="text-2xl">
            {isLoading ? <Skeleton className="h-8 w-20" /> : `£${totalSuccessful.toFixed(2)}`}
          </CardTitle>
        </CardHeader>
      </Card>
      
      <Card className="relative overflow-hidden">
        <CardHeader className="pb-2">
          <div className="absolute right-4 top-4 opacity-20">
            <PercentCircle className="h-8 w-8" />
          </div>
          <CardDescription>Rata de succes</CardDescription>
          <CardTitle className="text-2xl">
            {isLoading ? <Skeleton className="h-8 w-20" /> : `${successRate.toFixed(1)}%`}
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
};
