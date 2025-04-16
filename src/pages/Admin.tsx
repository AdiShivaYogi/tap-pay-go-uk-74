
import { Layout } from "@/components/layout/layout";
import { AdminStats } from "@/components/admin/AdminStats";
import { AdminCharts } from "@/components/admin/AdminCharts";
import { MonitoringStats } from "@/components/admin/MonitoringStats";
import { AdminTransactionsTable } from "@/components/admin/AdminTransactionsTable";
import { PageHeader } from "@/components/ui/layout/page-header";
import { IPWhitelist } from "@/components/admin/IPWhitelist";
import { StyledCard, StyledCardHeader, StyledCardTitle, StyledCardContent } from "@/components/ui/cards";
import { ShieldCheck } from "lucide-react";
import { Section } from "@/components/ui/layout/section";

const Admin = () => {
  const mockStats = {
    totalTransactions: 1289,
    totalAmount: 15750.50,
    totalCommission: 945.03,
    successfulCommission: 892.48
  };

  const mockMonitoringStats = {
    serverUptime: 99.98,
    averageResponseTime: 235,
    errorRate: 0.03,
    activeSessions: 128
  };

  const mockChartData = {
    monthlyData: [
      { name: "Jan", value: 1500, count: 50 },
      { name: "Feb", value: 2300, count: 75 },
      { name: "Mar", value: 3200, count: 90 },
      { name: "Apr", value: 2800, count: 85 },
      { name: "May", value: 3600, count: 110 }
    ],
    pieChartData: [
      { name: "Successful", value: 85, count: 85 },
      { name: "Failed", value: 15, count: 15 }
    ]
  };

  const mockTransactions = [];

  return (
    <Layout>
      <PageHeader
        icon={ShieldCheck}
        title="Panou de Administrare"
        description="Monitorizare și control avansat al platformei"
      />

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AdminStats isLoading={false} stats={mockStats} />
          </div>
          <div>
            <MonitoringStats 
              isLoading={false} 
              stats={{
                totalTransactions: 1289,
                suspiciousTransactions: 12,
                successRate: 98.5,
                averageAmount: 125.75,
                recentAlerts: [
                  {
                    id: "alert-1",
                    type: "warning",
                    message: "Multiple failed login attempts",
                    timestamp: "2023-05-15T10:30:00Z"
                  }
                ]
              }} 
            />
          </div>
        </div>
      </Section>

      <Section>
        <AdminCharts 
          isLoading={false} 
          monthlyData={mockChartData.monthlyData} 
          pieChartData={mockChartData.pieChartData} 
        />
      </Section>

      <Section>
        <AdminTransactionsTable 
          isLoading={false} 
          transactions={mockTransactions} 
          commissionRate={0.06} 
        />
      </Section>
      
      <Section>
        <IPWhitelist />
      </Section>
    </Layout>
  );
};

export default Admin;
