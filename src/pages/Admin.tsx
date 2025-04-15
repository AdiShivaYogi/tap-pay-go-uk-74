import { Layout } from "@/components/layout/layout";
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
import { Loader2, Layers, ShieldCheck, LineChart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StyledCard, StyledCardContent, StyledCardHeader, StyledCardTitle } from "@/components/ui/card-variants";
import { AccessRestrictionAlert } from "@/features/roadmap/components/AccessRestrictionAlert";
import { PageHeader } from "@/components/ui/page-header";
import { SectionContainer } from "@/components/ui/section-container";

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
      <SectionContainer>
        <PageHeader
          icon={Layers}
          title="Admin Dashboard"
          description="Platformă administrativă cu monitorizare în timp real și analiză avansată"
        >
          <Badge variant="secondary" className="flex items-center gap-1">
            <ShieldCheck className="h-4 w-4" />
            Admin
          </Badge>
        </PageHeader>

        <div className="space-y-6">
          <StyledCard variant="gradient" className="border-l-4 border-l-orange-500">
            <StyledCardContent>
              <IPWhitelist />
            </StyledCardContent>
          </StyledCard>
          
          <MonitoringStats 
            isLoading={isLoading}
            stats={monitoringStats}
          />

          <AdminStats 
            isLoading={isLoading}
            stats={financialStats}
          />

          <AdminCharts 
            isLoading={isLoading}
            monthlyData={monthlyData}
            pieChartData={pieChartData}
          />

          <StyledCard variant="gradient">
            <StyledCardContent>
              <AdminTransactionsTable 
                isLoading={isLoading}
                transactions={transactions}
                commissionRate={commissionRate}
              />
            </StyledCardContent>
          </StyledCard>
        </div>
      </SectionContainer>
    </Layout>
  );
};

export default Admin;
