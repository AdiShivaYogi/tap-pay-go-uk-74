import { Skeleton } from "@/components/ui/skeleton";
import { Transaction } from "@/types/transactions";
import { ArrowDownCircle, ArrowUpCircle, CircleDollarSign, PercentCircle } from "lucide-react";
import { StyledCard, StyledCardContent } from "@/components/ui/styled-card";

interface ReportStatsProps {
  transactions: Transaction[];
  isLoading: boolean;
}

export const ReportStats = ({ transactions, isLoading }: ReportStatsProps) => {
  const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);
  const successfulTransactions = transactions.filter(t => t.status === 'completed');
  const totalSuccessful = successfulTransactions.reduce((sum, t) => sum + t.amount, 0);
  const successRate = transactions.length ? (successfulTransactions.length / transactions.length) * 100 : 0;

  const stats = [
    {
      label: "Total tranzacții",
      value: transactions.length,
      icon: CircleDollarSign,
      color: "text-blue-500"
    },
    {
      label: "Valoare totală",
      value: `£${totalAmount.toFixed(2)}`,
      icon: ArrowUpCircle,
      color: "text-green-500"
    },
    {
      label: "Tranzacții reușite",
      value: `£${totalSuccessful.toFixed(2)}`,
      icon: ArrowDownCircle,
      color: "text-purple-500"
    },
    {
      label: "Rata de succes",
      value: `${successRate.toFixed(1)}%`,
      icon: PercentCircle,
      color: "text-amber-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <StyledCard key={stat.label}>
            <StyledCardContent className="pt-6">
              <div className="absolute right-4 top-4 opacity-20">
                <Icon className="h-8 w-8" />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold">
                  {isLoading ? (
                    <Skeleton className="h-8 w-20" />
                  ) : (
                    stat.value
                  )}
                </p>
              </div>
            </StyledCardContent>
          </StyledCard>
        );
      })}
    </div>
  );
};
