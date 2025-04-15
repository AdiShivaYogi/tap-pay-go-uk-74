
import { useState } from "react";
import { Layout } from "@/components/layout/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { DateRangeSelector } from "@/components/reports/DateRangeSelector";
import { ReportStats } from "@/components/reports/ReportStats";
import { ReportCharts } from "@/components/reports/ReportCharts";
import { TransactionsTable } from "@/components/transactions/TransactionsTable";
import { Skeleton } from "@/components/ui/skeleton";
import { useDateRange } from "@/hooks/use-date-range";
import { FileSpreadsheet } from "lucide-react";

const Reports = () => {
  const [period, setPeriod] = useState<"week" | "month" | "all">("week");
  const dateRange = useDateRange(period);

  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ['transactions', period],
    queryFn: async () => {
      let query = supabase
        .from('transactions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (dateRange) {
        query = query.gte('created_at', dateRange.from.toISOString())
                    .lte('created_at', dateRange.to.toISOString());
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data;
    }
  });

  return (
    <Layout>
      <div className="container py-8 px-4 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Transaction Reports</h1>
          <p className="text-muted-foreground text-lg">
            View and analyse your transaction history
          </p>
        </div>

        <div className="mb-8">
          <DateRangeSelector period={period} onPeriodChange={setPeriod} />
        </div>

        <ReportStats transactions={transactions} isLoading={isLoading} />
        <ReportCharts transactions={transactions} isLoading={isLoading} period={period} />

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle>Detailed Transactions</CardTitle>
              <CardDescription>
                Complete list of transactions for the selected period
              </CardDescription>
            </div>
            <FileSpreadsheet className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : (
              <TransactionsTable transactions={transactions} />
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Reports;
