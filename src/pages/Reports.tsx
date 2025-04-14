
import { useState } from "react";
import { Layout } from "@/components/layout/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format, subDays, startOfMonth, endOfMonth, parseISO } from "date-fns";
import { ro } from "date-fns/locale";
import { TransactionsBarChart } from "@/components/transactions/TransactionsBarChart";
import { TransactionsPieChart } from "@/components/transactions/TransactionsPieChart";
import { TransactionsTable } from "@/components/transactions/TransactionsTable";
import { Skeleton } from "@/components/ui/skeleton";

const Reports = () => {
  const [period, setPeriod] = useState<"week" | "month" | "all">("week");

  // Calculăm intervalul de date bazat pe perioada selectată
  const getDateRange = () => {
    const now = new Date();
    if (period === "week") {
      return {
        from: subDays(now, 7),
        to: now
      };
    } else if (period === "month") {
      return {
        from: startOfMonth(now),
        to: endOfMonth(now)
      };
    }
    // Pentru "all", nu aplicăm filtru de dată
    return null;
  };

  const dateRange = getDateRange();

  // Interogare pentru a obține toate tranzacțiile
  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ['transactions', period],
    queryFn: async () => {
      let query = supabase
        .from('transactions')
        .select('*')
        .order('created_at', { ascending: false });
      
      // Aplicăm filtrul de dată doar dacă avem un interval
      if (dateRange) {
        query = query.gte('created_at', dateRange.from.toISOString())
                    .lte('created_at', dateRange.to.toISOString());
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data;
    }
  });

  // Calculăm totaluri și statistici pentru perioada selectată
  const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);
  const successfulTransactions = transactions.filter(t => t.status === 'completed');
  const totalSuccessful = successfulTransactions.reduce((sum, t) => sum + t.amount, 0);
  const successRate = transactions.length ? (successfulTransactions.length / transactions.length) * 100 : 0;

  // Preparăm datele pentru grafice
  const chartData = prepareChartData(transactions);
  const pieData = preparePieData(transactions);

  return (
    <Layout>
      <div className="container py-8 px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-1">Rapoarte tranzacții</h1>
          <p className="text-muted-foreground">Vizualizează și analizează istoricul tranzacțiilor</p>
        </div>

        <div className="mb-6">
          <Tabs defaultValue="week" value={period} onValueChange={(v) => setPeriod(v as "week" | "month" | "all")}>
            <TabsList className="mb-4">
              <TabsTrigger value="week">Ultima săptămână</TabsTrigger>
              <TabsTrigger value="month">Luna curentă</TabsTrigger>
              <TabsTrigger value="all">Toate tranzacțiile</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Carduri sumar */}
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

        {/* Grafice */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Evoluția tranzacțiilor</CardTitle>
              <CardDescription>
                {period === "week" ? "Ultimele 7 zile" : 
                 period === "month" ? "Luna curentă" : 
                 "Toate tranzacțiile"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="h-[300px] flex items-center justify-center">
                  <Skeleton className="h-full w-full" />
                </div>
              ) : (
                <TransactionsBarChart data={chartData} />
              )}
            </CardContent>
          </Card>

          <Card className="w-full">
            <CardHeader>
              <CardTitle>Distribuția statusurilor</CardTitle>
              <CardDescription>
                Vizualizarea tranzacțiilor după status
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="h-[300px] flex items-center justify-center">
                  <Skeleton className="h-full w-full" />
                </div>
              ) : (
                <TransactionsPieChart data={pieData} />
              )}
            </CardContent>
          </Card>
        </div>

        {/* Tabel detaliat */}
        <Card>
          <CardHeader>
            <CardTitle>Tranzacții detaliate</CardTitle>
            <CardDescription>
              Lista completă a tranzacțiilor pentru perioada selectată
            </CardDescription>
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

const prepareChartData = (transactions: any[]) => {
  const dateMap = new Map();
  
  transactions.forEach(t => {
    const date = format(parseISO(t.created_at), 'dd MMM', { locale: ro });
    if (!dateMap.has(date)) {
      dateMap.set(date, { date, total: 0, completed: 0, failed: 0, pending: 0 });
    }
    
    const entry = dateMap.get(date);
    entry.total += t.amount;
    
    if (t.status === 'completed') {
      entry.completed += t.amount;
    } else if (t.status === 'failed') {
      entry.failed += t.amount;
    } else {
      entry.pending += t.amount;
    }
  });
  
  return Array.from(dateMap.values());
};

const preparePieData = (transactions: any[]) => {
  const statusCounts = new Map();
  
  transactions.forEach(t => {
    const status = t.status || 'pending';
    const label = status === 'completed' ? 'Finalizate' : 
                  status === 'failed' ? 'Eșuate' : 
                  status === 'expired' ? 'Expirate' : 'În așteptare';
    
    if (!statusCounts.has(status)) {
      statusCounts.set(status, { name: label, value: 0, count: 0 });
    }
    
    const entry = statusCounts.get(status);
    entry.value += t.amount;
    entry.count += 1;
  });
  
  return Array.from(statusCounts.values());
};

export default Reports;
