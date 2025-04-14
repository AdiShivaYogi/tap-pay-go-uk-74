
import { Card, CardHeader, CardDescription, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface AdminStatsProps {
  isLoading: boolean;
  stats: {
    totalTransactions: number;
    totalAmount: number;
    totalCommission: number;
    successfulCommission: number;
  };
}

export const AdminStats = ({ isLoading, stats }: AdminStatsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Total tranzacții</CardDescription>
          <CardTitle className="text-2xl">
            {isLoading ? <Skeleton className="h-8 w-20" /> : stats.totalTransactions}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Valoare totală</CardDescription>
          <CardTitle className="text-2xl">
            {isLoading ? <Skeleton className="h-8 w-20" /> : `£${stats.totalAmount.toFixed(2)}`}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Comision total</CardDescription>
          <CardTitle className="text-2xl">
            {isLoading ? <Skeleton className="h-8 w-20" /> : `£${stats.totalCommission.toFixed(2)}`}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Comision din tranzacții reușite</CardDescription>
          <CardTitle className="text-2xl">
            {isLoading ? <Skeleton className="h-8 w-20" /> : `£${stats.successfulCommission.toFixed(2)}`}
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
};
