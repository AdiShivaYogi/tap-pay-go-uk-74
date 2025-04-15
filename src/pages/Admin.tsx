import { Layout } from "@/components/layout/layout";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";
import { useUserRole } from "@/hooks/use-user-role";
import { AdminStats } from "@/components/admin/AdminStats";
import { AdminCharts } from "@/components/admin/AdminCharts";
import { AdminTransactionsTable } from "@/components/admin/AdminTransactionsTable";
import { MonitoringStats } from "@/components/admin/MonitoringStats";
import { IPWhitelist } from "@/components/admin/IPWhitelist";
import { prepareMonthlyData } from "@/utils/admin";
import { useState } from "react";
import { useAdminData } from "@/hooks/use-admin-data";
import { calculateMonitoringStats, calculateFinancialStats, calculatePieChartData } from "@/utils/admin-calculations";
import { Loader2, Layers } from "lucide-react";
import { Card } from "@/components/ui/card";
import { AccessRestrictionAlert } from "@/features/roadmap/components/AccessRestrictionAlert";

const Admin = () => {
  const { user } = useAuth();
  const { isAdmin, isLoading: isLoadingRole, role } = useUserRole();
  const [period, setPeriod] = useState<"week" | "month" | "year">("month");
  const commissionRate = 0.025; // 2.5%
  
  const { data: transactions = [], isLoading } = useAdminData(period);
  
  if (isLoadingRole) {
    return (
      <Layout>
        <div className="container py-8 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </Layout>
    );
  }

  if (!isAdmin) {
    return (
      <Layout>
        <AccessRestrictionAlert role={role} />
      </Layout>
    );
  }
  
  const monitoringStats = calculateMonitoringStats(transactions);
  const financialStats = calculateFinancialStats(transactions, commissionRate);
  const monthlyData = prepareMonthlyData(transactions, commissionRate);
  const pieChartData = calculatePieChartData(transactions);

  return (
    <Layout>
      <div className="container py-6 px-4 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Layers className="h-8 w-8 text-primary" />
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Monitor platform performance and commissions, without access to sensitive data
            </p>
          </div>
          
          <Tabs defaultValue="month" value={period} 
                onValueChange={(v) => setPeriod(v as "week" | "month" | "year")}
                className="hidden md:block">
            <TabsList>
              <TabsTrigger value="week">Last Week</TabsTrigger>
              <TabsTrigger value="month">Last Month</TabsTrigger>
              <TabsTrigger value="year">Last Year</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid gap-6">
          <IPWhitelist />
          
          <Card className="p-6">
            <MonitoringStats 
              isLoading={isLoading}
              stats={monitoringStats}
            />
          </Card>

          <AdminStats 
            isLoading={isLoading}
            stats={financialStats}
          />

          <div className="grid md:grid-cols-2 gap-6">
            <AdminCharts 
              isLoading={isLoading}
              monthlyData={monthlyData}
              pieChartData={pieChartData}
            />
          </div>

          <AdminTransactionsTable 
            isLoading={isLoading}
            transactions={transactions}
            commissionRate={commissionRate}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Admin;
