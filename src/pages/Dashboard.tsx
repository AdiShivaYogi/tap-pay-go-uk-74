import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/layout/layout";
import { PageHeader } from "@/components/ui/layout/page-header";
import { Section } from "@/components/ui/layout/section";
import { Grid2Cols, Grid3Cols } from "@/components/ui/layout/grid";
import { PaymentForm } from "@/components/dashboard/PaymentForm";
import { TransactionsList } from "@/components/dashboard/TransactionsList";
import { StyledCard } from "@/components/ui/cards";
import { useDeviceCompatibility } from "@/hooks/use-device-compatibility";
import { CreditCard, Activity } from "lucide-react";

const Dashboard = () => {
  const deviceCompatibility = useDeviceCompatibility();
  const [isDemo, setIsDemo] = useState(true);

  // Placeholder for fetching user data
  const { data: user, isLoading, isError } = useQuery('user', async () => {
    // Simulate fetching user data
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      name: "John Doe",
      email: "john.doe@example.com",
      subscription: "Premium",
      lastLogin: new Date()
    };
  });

  return (
    <Layout>
      <Section>
        <PageHeader
          icon={CreditCard}
          title="Dashboard"
          description="Monitorizarea activității și a plăților"
        />

        <Grid2Cols>
          <div>
            <PaymentForm deviceCompatibility={deviceCompatibility} />
          </div>

          <div>
            <TransactionsList />
          </div>
        </Grid2Cols>
      </Section>
    </Layout>
  );
};

export default Dashboard;
