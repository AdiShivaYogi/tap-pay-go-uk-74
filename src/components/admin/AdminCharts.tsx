
import { StyledCard, StyledCardContent, StyledCardHeader, StyledCardTitle, StyledCardDescription } from "@/components/ui/card-variants";
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
      <StyledCard variant="gradient" className="w-full h-[400px]">
        <StyledCardHeader className="space-y-1">
          <StyledCardTitle>Distribuția tranzacțiilor</StyledCardTitle>
          <StyledCardDescription>Status tranzacții după valoare totală</StyledCardDescription>
        </StyledCardHeader>
        <StyledCardContent>
          {isLoading ? (
            <Skeleton className="h-[300px] w-full" />
          ) : (
            <div className="h-[300px] w-full">
              <TransactionsPieChart data={pieChartData} />
            </div>
          )}
        </StyledCardContent>
      </StyledCard>
      
      <StyledCard variant="gradient" className="w-full h-[400px]">
        <StyledCardHeader className="space-y-1">
          <StyledCardTitle>Evoluția comisioanelor</StyledCardTitle>
          <StyledCardDescription>Vizualizarea comisioanelor lunare</StyledCardDescription>
        </StyledCardHeader>
        <StyledCardContent>
          {isLoading ? (
            <Skeleton className="h-[300px] w-full" />
          ) : (
            <div className="h-[300px] w-full">
              <TransactionsBarChart data={monthlyData} />
            </div>
          )}
        </StyledCardContent>
      </StyledCard>
    </div>
  );
};
