import { Layout } from "@/components/layout/layout";
import { AdminStats } from "@/components/admin/AdminStats";
import { AdminCharts } from "@/components/admin/AdminCharts";
import { MonitoringStats } from "@/components/admin/MonitoringStats";
import { AdminTransactionsTable } from "@/components/admin/AdminTransactionsTable";
import { PageHeader } from "@/components/ui/layout/page-header";
import { IPWhitelist } from "@/components/admin/IPWhitelist";
import { StyledCard, StyledCardHeader, StyledCardTitle, StyledCardContent } from "@/components/ui/cards";
import { ShieldCheck } from "lucide-react";

const Admin = () => {
  return (
    <Layout>
      <PageHeader
        icon={ShieldCheck}
        title="Panou de Administrare"
        description="Monitorizare și control avansat al platformei"
      />

      <Section>
        <Grid2Cols>
          <AdminStats />
          <MonitoringStats />
        </Grid2Cols>
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
