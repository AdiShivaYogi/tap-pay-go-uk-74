
import { Layout } from "@/components/layout/layout";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";
import { useUserRole } from "@/hooks/use-user-role";
import { Navigate } from "react-router-dom";
import { AdminStats } from "@/components/admin/AdminStats";
import { AdminCharts } from "@/components/admin/AdminCharts";
import { AdminTransactionsTable } from "@/components/admin/AdminTransactionsTable";
import { MonitoringStats } from "@/components/admin/MonitoringStats";
import { prepareMonthlyData } from "@/utils/admin";
import { useState } from "react";
import { useAdminData } from "@/hooks/use-admin-data";
import { calculateMonitoringStats, calculateFinancialStats, calculatePieChartData } from "@/utils/admin-calculations";

const Admin = () => {
  const { user } = useAuth();
  const { isAdmin, isLoading: isLoadingRole } = useUserRole();
  const [period, setPeriod] = useState<"week" | "month" | "year">("month");
  const commissionRate = 0.025; // 2.5%
  
  // Always call hooks at the top level, before any conditional returns
  const { data: transactions = [], isLoading } = useAdminData(period);
  
  // Rendering logic based on permissions
  if (isLoadingRole) {
    return null;
  }

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }
  
  const monitoringStats = calculateMonitoringStats(transactions);
  const financialStats = calculateFinancialStats(transactions, commissionRate);
  const monthlyData = prepareMonthlyData(transactions, commissionRate);
  const pieChartData = calculatePieChartData(transactions);

  return (
    <Layout>
      <div className="container py-8 px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-1">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Monitorizează performanța platformei și comisioanele, fără acces la date sensibile
          </p>
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

        <div className="mb-8">
          <MonitoringStats 
            isLoading={isLoading}
            stats={monitoringStats}
          />
        </div>

        <AdminStats 
          isLoading={isLoading}
          stats={financialStats}
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
