
import { Layout } from "@/components/layout/layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { useUserRole } from "@/hooks/use-user-role";
import { Navigate } from "react-router-dom";
import { AdminStats } from "@/components/admin/AdminStats";
import { AdminCharts } from "@/components/admin/AdminCharts";
import { AdminTransactionsTable } from "@/components/admin/AdminTransactionsTable";
import { prepareMonthlyData } from "@/utils/admin";
import { useState } from "react";

const Admin = () => {
  const { user } = useAuth();
  const { isAdmin, isLoading: isLoadingRole } = useUserRole();
  const [period, setPeriod] = useState<"week" | "month" | "year">("month");
  const commissionRate = 0.025; // 2.5%
  
  if (isLoadingRole) {
    return null; // or a loading spinner
  }

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

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

  const totalTransactions = transactions.reduce((sum, t) => sum + t.amount, 0);
  const totalCommission = totalTransactions * commissionRate;
  const successfulTransactions = transactions.filter(t => t.status === 'completed');
  const successfulAmount = successfulTransactions.reduce((sum, t) => sum + t.amount, 0);
  const successfulCommission = successfulAmount * commissionRate;

  const monthlyData = prepareMonthlyData(transactions, commissionRate);
  
  const pieChartData = [
    { name: "Plăți reușite", value: successfulAmount, count: successfulTransactions.length },
    { 
      name: "Plăți eșuate", 
      value: transactions.filter(t => t.status === 'failed').reduce((sum, t) => sum + t.amount, 0),
      count: transactions.filter(t => t.status === 'failed').length
    },
    { 
      name: "În așteptare", 
      value: transactions.filter(t => t.status === 'pending').reduce((sum, t) => sum + t.amount, 0),
      count: transactions.filter(t => t.status === 'pending').length
    }
  ];

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

        <AdminStats 
          isLoading={isLoading}
          stats={{
            totalTransactions: transactions.length,
            totalAmount: totalTransactions,
            totalCommission,
            successfulCommission,
          }}
        />

        <AdminCharts 
          isLoading={isLoading}
          monthlyData={monthlyData}
          pieChartData={pieChartData}
        />

        <AdminTransactionsTable 
          isLoading={isLoading}
          transactions={transactions}
          commissionRate={commissionRate}
        />
      </div>
    </Layout>
  );
};

export default Admin;
