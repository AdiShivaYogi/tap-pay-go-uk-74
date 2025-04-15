
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
import { PageHeader } from "@/components/ui/page-header";
import { SectionContainer } from "@/components/ui/section-container";
import { StyledCard, StyledCardContent, StyledCardHeader, StyledCardTitle } from "@/components/ui/card-variants";

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
      <SectionContainer>
        <PageHeader
          icon={LineChart}
          title="Rapoarte Tranzacții"
          description="Analiza detaliată și raportare avansată a tranzacțiilor"
        >
          <div className="flex items-center gap-2 text-muted-foreground">
            {isLoading ? (
              <RefreshCcw className="h-4 w-4 animate-spin" />
            ) : (
              <FileSpreadsheet className="h-4 w-4" />
            )}
            <span className="text-sm">
              {transactions.length} tranzacții
            </span>
          </div>
        </PageHeader>

        <div className="space-y-8">
          <DateRangeSelector period={period} onPeriodChange={setPeriod} />
          
          <ReportStats transactions={transactions} isLoading={isLoading} />
          
          <ReportCharts transactions={transactions} isLoading={isLoading} period={period} />

          <StyledCard>
            <StyledCardHeader>
              <StyledCardTitle>Detalii Tranzacții</StyledCardTitle>
              <p className="text-sm text-muted-foreground">
                Lista completă a tranzacțiilor pentru perioada selectată
              </p>
            </StyledCardHeader>
            <StyledCardContent>
              <TransactionsTable transactions={transactions} />
            </StyledCardContent>
          </StyledCard>
        </div>
      </SectionContainer>
    </Layout>
  );
};

export default Reports;
