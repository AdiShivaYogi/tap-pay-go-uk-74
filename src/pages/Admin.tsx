
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
import { Loader2, Layers, ShieldCheck, LineChart, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AccessRestrictionAlert } from "@/features/roadmap/components/AccessRestrictionAlert";
import { Badge } from "@/components/ui/badge";

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
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Layers className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <Badge variant="outline" className="ml-2">
                v2.0
              </Badge>
            </div>
            <p className="text-muted-foreground">
              Platformă administrativă cu monitorizare în timp real și analiză avansată
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="hidden md:flex items-center gap-1">
              <ShieldCheck className="h-4 w-4" />
              Admin
            </Badge>
            
            <Tabs defaultValue="month" value={period} 
                  onValueChange={(v) => setPeriod(v as "week" | "month" | "year")}
                  className="hidden md:block">
              <TabsList>
                <TabsTrigger value="week">Săptămâna</TabsTrigger>
                <TabsTrigger value="month">Luna</TabsTrigger>
                <TabsTrigger value="year">Anul</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="grid gap-6">
          <Card className="border-l-4 border-l-orange-500">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                <CardTitle className="text-lg">Securitate Platformă</CardTitle>
              </div>
              <CardDescription>
                Configurare IP Whitelist și monitorizare acces
              </CardDescription>
            </CardHeader>
            <CardContent>
              <IPWhitelist />
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <LineChart className="h-5 w-5 text-blue-500" />
                <CardTitle className="text-lg">Monitorizare Sistem</CardTitle>
              </div>
              <CardDescription>
                Statistici și metrici în timp real
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MonitoringStats 
                isLoading={isLoading}
                stats={monitoringStats}
              />
            </CardContent>
          </Card>

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
      </div>
    </Layout>
  );
};

export default Admin;
