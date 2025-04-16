
import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/layout/layout";
import { PageHeader } from "@/components/ui/layout/page-header";
import { Section } from "@/components/ui/layout/section";
import { Grid2Cols } from "@/components/ui/layout/grid";
import { PaymentForm } from "@/components/dashboard/PaymentForm";
import { TransactionsList } from "@/components/dashboard/TransactionsList";
import { useDeviceCompatibility } from "@/hooks/use-device-compatibility";
import { CreditCard } from "lucide-react";

const Dashboard = () => {
  const deviceCompatibility = useDeviceCompatibility();
  const [isDemo] = useState(true);
  
  // Placeholder for fetching user data with proper query options
  const { data: user, isLoading, isError } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      // Simulate fetching user data
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
        name: "John Doe",
        email: "john.doe@example.com",
        subscription: "Premium",
        lastLogin: new Date()
      };
    }
  });

  // Mock transaction data
  const mockTransactions = [
    {
      id: "tx_1",
      user_id: "user_123",
      amount: 50,
      status: "completed",
      created_at: "2023-05-15T10:30:00Z",
      currency: "GBP"
    },
    {
      id: "tx_2",
      user_id: "user_123",
      amount: 25.50,
      status: "completed",
      created_at: "2023-05-12T14:22:00Z",
      currency: "GBP"
    },
    {
      id: "tx_3",
      user_id: "user_123",
      amount: 75,
      status: "pending",
      created_at: "2023-05-10T09:15:00Z",
      currency: "GBP"
    }
  ];

  const handleRefreshTransactions = useCallback(() => {
    // This would typically trigger a refetch of the transactions
    console.log("Refreshing transactions");
  }, []);

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
            <TransactionsList 
              transactions={mockTransactions}
              isLoading={false}
              onRefresh={handleRefreshTransactions}
            />
          </div>
        </Grid2Cols>
      </Section>
    </Layout>
  );
};

export default Dashboard;
