
import { Card, CardHeader, CardDescription, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BadgeDollarSign, Wallet, CreditCard, TrendingUp } from "lucide-react";

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
  const statCards = [
    {
      title: "Total tranzacții",
      value: stats.totalTransactions,
      icon: CreditCard,
      description: "Număr total tranzacții procesate",
      color: "text-blue-500"
    },
    {
      title: "Valoare totală",
      value: `£${stats.totalAmount.toFixed(2)}`,
      icon: Wallet,
      description: "Suma totală procesată",
      color: "text-green-500"
    },
    {
      title: "Comision total",
      value: `£${stats.totalCommission.toFixed(2)}`,
      icon: BadgeDollarSign,
      description: "Comisioane cumulate",
      color: "text-purple-500"
    },
    {
      title: "Comision efectiv",
      value: `£${stats.successfulCommission.toFixed(2)}`,
      icon: TrendingUp,
      description: "Din tranzacții reușite",
      color: "text-amber-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat) => (
        <Card key={stat.title} className="relative overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>{stat.title}</CardDescription>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <CardTitle className="text-2xl">
              {isLoading ? (
                <Skeleton className="h-8 w-20" />
              ) : (
                stat.value
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              {stat.description}
            </p>
          </CardContent>
          <div 
            className={`absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r ${
              stat.color.replace('text', 'from')
            } to-transparent`}
          />
        </Card>
      ))}
    </div>
  );
};
