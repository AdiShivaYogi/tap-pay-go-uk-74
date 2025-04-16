
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
    activeUsers: 256,
    totalTransactions: 1289,
    monthlyRevenue: 15750.50,
    failedPayments: 12,
    conversionRate: 4.2,
  };

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
            <MonitoringStats />
          </div>
        </div>
      </Section>

      <Section>
        <AdminCharts />
      </Section>

      <Section>
        <AdminTransactionsTable />
      </Section>
      
      <Section>
        <IPWhitelist />
      </Section>
    </Layout>
  );
};

export default Admin;
