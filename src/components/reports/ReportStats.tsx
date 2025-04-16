import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StyledCard } from "@/components/ui/cards";
import { ArrowUpRight, ArrowDownRight, Activity } from "lucide-react";

interface ReportStatsProps {
  totalRevenue: number;
  newCustomers: number;
  averageOrderValue: number;
  transactionSuccessRate: number;
  dateRange: {
    startDate: Date | null;
    endDate: Date | null;
  };
}

export const ReportStats = ({
  totalRevenue,
  newCustomers,
  averageOrderValue,
  transactionSuccessRate,
  dateRange,
}: ReportStatsProps) => {
  const [revenueChange, setRevenueChange] = useState<number>(0);
  const [customerChange, setCustomerChange] = useState<number>(0);

  useEffect(() => {
    // Simulate calculating the change from the previous period
    // In a real application, you would fetch this data from your backend
    setRevenueChange(Math.random() * 20 - 10); // Random change between -10% and +10%
    setCustomerChange(Math.random() * 15 - 7.5); // Random change between -7.5% and +7.5%
  }, [dateRange]);

  const getChangeBadge = (change: number) => {
    const isPositive = change > 0;
    const changeText = `${isPositive ? "+" : ""}${change.toFixed(1)}%`;
    const badgeVariant = isPositive ? "default" : "destructive";
    const Icon = isPositive ? ArrowUpRight : ArrowDownRight;

    return (
      <Badge variant={badgeVariant}>
        <Icon className="mr-1 h-3 w-3" />
        <span>{changeText}</span>
      </Badge>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StyledCard>
        <div className="flex items-center justify-between space-x-2">
          <div className="space-y-1">
            <h3 className="text-sm font-medium">Total Revenue</h3>
            <p className="text-2xl font-semibold">£{totalRevenue.toFixed(2)}</p>
          </div>
          {getChangeBadge(revenueChange)}
          <Activity className="h-4 w-4 text-muted-foreground" />
        </div>
      </StyledCard>

      <StyledCard>
        <div className="flex items-center justify-between space-x-2">
          <div className="space-y-1">
            <h3 className="text-sm font-medium">New Customers</h3>
            <p className="text-2xl font-semibold">{newCustomers}</p>
          </div>
          {getChangeBadge(customerChange)}
          <Activity className="h-4 w-4 text-muted-foreground" />
        </div>
      </StyledCard>

      <StyledCard>
        <div className="flex items-center justify-between space-x-2">
          <div className="space-y-1">
            <h3 className="text-sm font-medium">Avg. Order Value</h3>
            <p className="text-2xl font-semibold">£{averageOrderValue.toFixed(2)}</p>
          </div>
          <Badge variant="outline">
            <ArrowUpRight className="mr-1 h-3 w-3" />
            <span>+12%</span>
          </Badge>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </div>
      </StyledCard>

      <StyledCard>
        <div className="flex items-center justify-between space-x-2">
          <div className="space-y-1">
            <h3 className="text-sm font-medium">Transaction Success Rate</h3>
            <p className="text-2xl font-semibold">{transactionSuccessRate.toFixed(1)}%</p>
          </div>
          <Badge variant="outline">
            <ArrowDownRight className="mr-1 h-3 w-3" />
            <span>-4%</span>
          </Badge>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </div>
      </StyledCard>
    </div>
  );
};
