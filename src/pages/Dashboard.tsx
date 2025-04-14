
import { Layout } from "@/components/layout/layout";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { DeviceCompatibilityAlert } from "@/components/device-compatibility-alert";
import { useDeviceCompatibility } from "@/hooks/use-device-compatibility";
import { SecurityAlert } from "@/components/security/SecurityAlert";
import { PaymentForm } from "@/components/dashboard/PaymentForm";
import { TransactionsList } from "@/components/dashboard/TransactionsList";
import { AccountInfo } from "@/components/dashboard/AccountInfo";
import { PaymentTransparencyInfo } from "@/components/dashboard/PaymentTransparencyInfo";
import { toast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const deviceCompatibility = useDeviceCompatibility();

  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      return data;
    }
  });

  useEffect(() => {
    const success = searchParams.get("success");
    const canceled = searchParams.get("canceled");

    if (success === "true") {
      toast({
        title: "Plată reușită",
        description: "Plata a fost procesată cu succes.",
      });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    } else if (canceled === "true") {
      toast({
        title: "Plată anulată",
        description: "Plata a fost anulată.",
        variant: "destructive",
      });
    }
  }, [searchParams, queryClient]);

  return (
    <Layout>
      <div className="container py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
            <p className="text-muted-foreground">Acceptă plăți contactless direct pe telefonul tău</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 px-3 py-1">
              Conectat la Stripe
            </Badge>
          </div>
        </div>

        <SecurityAlert />
        <PaymentTransparencyInfo />

        <div className="mb-6">
          <DeviceCompatibilityAlert compatibility={deviceCompatibility} />
        </div>

        <PaymentForm deviceCompatibility={deviceCompatibility} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TransactionsList 
            transactions={transactions}
            isLoading={isLoading}
            onRefresh={() => queryClient.invalidateQueries({ queryKey: ['transactions'] })}
          />
          <AccountInfo deviceCompatibility={deviceCompatibility} />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
