
import { useState } from "react";
import { Layout } from "@/components/layout/layout";
import { DateRangeSelector } from "@/components/reports/DateRangeSelector";
import { ReportStats } from "@/components/reports/ReportStats";
import { ReportCharts } from "@/components/reports/ReportCharts";
import { TransactionsTable } from "@/components/transactions/TransactionsTable";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useDateRange } from "@/hooks/use-date-range";
import { Badge } from "@/components/ui/badge";
import { FileSpreadsheet, RefreshCcw, LineChart } from "lucide-react";

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
      <div className="container py-8 px-4 max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <LineChart className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold">Rapoarte Tranzacții</h1>
              <Badge variant="outline" className="ml-2">
                v2.0
              </Badge>
            </div>
            <p className="text-muted-foreground">
              Analiza detaliată și raportare avansată a tranzacțiilor
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            {isLoading ? (
              <RefreshCcw className="h-4 w-4 animate-spin" />
            ) : (
              <FileSpreadsheet className="h-4 w-4 text-muted-foreground" />
            )}
            <span className="text-sm text-muted-foreground">
              {transactions.length} tranzacții
            </span>
          </div>
        </div>

        <DateRangeSelector period={period} onPeriodChange={setPeriod} />
        <ReportStats transactions={transactions} isLoading={isLoading} />
        <ReportCharts transactions={transactions} isLoading={isLoading} period={period} />

        <div className="bg-card rounded-lg border shadow-sm">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold">Detalii Tranzacții</h2>
            <p className="text-sm text-muted-foreground">
              Lista completă a tranzacțiilor pentru perioada selectată
            </p>
          </div>
          <div className="p-6">
            <TransactionsTable transactions={transactions} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Reports;
