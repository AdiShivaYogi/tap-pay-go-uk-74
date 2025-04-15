
import { Layout } from "@/components/layout/layout";
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
import { toast } from "@/hooks/use-toast";
import { StyledCard } from "@/components/ui/card-variants";
import { BarChart2, ChevronRight } from "lucide-react";

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

  const checkLastTransaction = async () => {
    const lastSessionId = localStorage.getItem('last_payment_session');
    
    if (lastSessionId) {
      try {
        const { data, error } = await supabase
          .from('transactions')
          .select('status')
          .eq('stripe_session_id', lastSessionId)
          .single();
          
        if (!error && data) {
          if (data.status === 'completed') {
            toast({
              title: "Tranzacție finalizată",
              description: "Plata a fost procesată cu succes.",
              variant: "default"
            });
            localStorage.removeItem('last_payment_session');
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
          } else if (data.status === 'failed') {
            toast({
              title: "Plată eșuată",
              description: "Procesarea plății a eșuat.",
              variant: "destructive"
            });
            localStorage.removeItem('last_payment_session');
          }
        }
      } catch (err) {
        console.error("Eroare la verificarea tranzacției:", err);
      }
    }
  };

  useEffect(() => {
    const success = searchParams.get("success");
    const canceled = searchParams.get("canceled");

    if (success === "true") {
      toast({
        title: "Plată inițiată",
        description: "Plata ta este în curs de procesare.",
      });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      
      setTimeout(() => {
        checkLastTransaction();
      }, 3000);
    } else if (canceled === "true") {
      toast({
        title: "Plată anulată",
        description: "Plata a fost anulată.",
        variant: "destructive",
      });
      localStorage.removeItem('last_payment_session');
    } else {
      checkLastTransaction();
    }
  }, [searchParams, queryClient]);

  return (
    <Layout>
      <div className="container max-w-5xl py-8 px-4">
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-6 mb-8">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <BarChart2 className="h-4 w-4" />
            <span>Dashboard</span>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Tranzacții</span>
          </div>
          <h1 className="text-3xl font-bold">Panou de Control</h1>
          <p className="text-muted-foreground mt-1">
            Gestionează tranzacțiile și monitorizează activitatea
          </p>
        </div>

        <div className="space-y-6">
          <DeviceCompatibilityAlert compatibility={deviceCompatibility} />
          
          <StyledCard className="border-primary/10">
            <div className="p-6">
              <PaymentForm deviceCompatibility={deviceCompatibility} />
            </div>
          </StyledCard>

          <div className="grid gap-6">
            <StyledCard className="border-primary/10">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Tranzacții Recente</h2>
                <TransactionsList 
                  transactions={transactions}
                  isLoading={isLoading}
                  onRefresh={() => queryClient.invalidateQueries({ queryKey: ['transactions'] })}
                />
              </div>
            </StyledCard>

            <StyledCard className="border-primary/10">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Informații Cont</h2>
                <AccountInfo deviceCompatibility={deviceCompatibility} />
              </div>
            </StyledCard>
          </div>

          <SecurityAlert />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
