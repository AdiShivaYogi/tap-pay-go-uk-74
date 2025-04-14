
import { Layout } from "@/components/layout/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { ro } from "date-fns/locale";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsivePie } from "@nivo/pie";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Navigate } from "react-router-dom";

const Admin = () => {
  const { user } = useAuth();
  const [period, setPeriod] = useState<"week" | "month" | "year">("month");
  
  // Verificăm dacă utilizatorul este admin
  const isAdmin = user?.email?.includes('admin');
  
  // Redirecționăm utilizatorii non-admin
  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  // Interogare pentru a obține toate tranzacțiile
  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ['admin-transactions', period],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  // Calculăm totalul comisioanelor (presupunem un comision de 2.5%)
  const commissionRate = 0.025; // 2.5%
  const totalTransactions = transactions.reduce((sum, t) => sum + t.amount, 0);
  const totalCommission = totalTransactions * commissionRate;
  const successfulTransactions = transactions.filter(t => t.status === 'completed');
  const successfulAmount = successfulTransactions.reduce((sum, t) => sum + t.amount, 0);
  const successfulCommission = successfulAmount * commissionRate;

  // Pregătim date pentru grafice
  const monthlyData = prepareMonthlyData(transactions, commissionRate);

  return (
    <Layout>
      <div className="container py-8 px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-1">Admin Dashboard</h1>
          <p className="text-muted-foreground">Monitorizează comisioanele și performanța platformei</p>
        </div>

        <div className="mb-6">
          <Tabs defaultValue="month" value={period} onValueChange={(v) => setPeriod(v as "week" | "month" | "year")}>
            <TabsList className="mb-4">
              <TabsTrigger value="week">Ultima săptămână</TabsTrigger>
              <TabsTrigger value="month">Ultima lună</TabsTrigger>
              <TabsTrigger value="year">Ultimul an</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Carduri de statistici */}
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
                {isLoading ? <Skeleton className="h-8 w-20" /> : `£${totalTransactions.toFixed(2)}`}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Comision total</CardDescription>
              <CardTitle className="text-2xl">
                {isLoading ? <Skeleton className="h-8 w-20" /> : `£${totalCommission.toFixed(2)}`}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Comision din tranzacții reușite</CardDescription>
              <CardTitle className="text-2xl">
                {isLoading ? <Skeleton className="h-8 w-20" /> : `£${successfulCommission.toFixed(2)}`}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Tabel detaliat de comisioane */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Comisioane pe tranzacții</CardTitle>
            <CardDescription>Detalii despre comisioanele generate din fiecare tranzacție</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>ID Tranzacție</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Suma</TableHead>
                    <TableHead>Comision (2.5%)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        {format(new Date(transaction.created_at), 'dd/MM/yyyy HH:mm')}
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {transaction.id.substring(0, 8)}...
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          transaction.status === 'completed' 
                            ? 'bg-green-100 text-green-800' 
                            : transaction.status === 'failed' 
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {transaction.status}
                        </span>
                      </TableCell>
                      <TableCell>£{transaction.amount.toFixed(2)}</TableCell>
                      <TableCell>£{(transaction.amount * commissionRate).toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Grafic de comisioane lunare */}
        <Card>
          <CardHeader>
            <CardTitle>Evoluția comisioanelor</CardTitle>
            <CardDescription>
              Vizualizarea comisioanelor lunare
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              {isLoading ? (
                <Skeleton className="h-full w-full" />
              ) : (
                <div className="h-full">
                  {/* Aici ar trebui să fie un grafic, dar folosim Recharts în aplicație */}
                  <div className="flex h-full items-center justify-center">
                    <p className="text-muted-foreground">Grafic disponibil cu datele lunare pentru comisioane</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

// Funcție pentru pregătirea datelor lunare
const prepareMonthlyData = (transactions: any[], commissionRate: number) => {
  const monthMap = new Map();
  
  transactions.forEach(t => {
    const date = new Date(t.created_at);
    const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
    const monthName = format(date, 'MMM yyyy', { locale: ro });
    
    if (!monthMap.has(monthKey)) {
      monthMap.set(monthKey, { 
        month: monthName, 
        transactions: 0, 
        amount: 0, 
        commission: 0 
      });
    }
    
    const entry = monthMap.get(monthKey);
    entry.transactions += 1;
    entry.amount += t.amount;
    entry.commission += t.amount * commissionRate;
  });
  
  return Array.from(monthMap.values());
};

export default Admin;
