
import { Layout } from "@/components/layout/layout";
import { BarChart2, RefreshCcw, Download, Filter } from "lucide-react";
import { DeviceCompatibilityAlert } from "@/components/device-compatibility-alert";
import { SecurityAlert } from "@/components/security/SecurityAlert";
import { PaymentForm } from "@/components/dashboard/PaymentForm";
import { TransactionsList } from "@/components/dashboard/TransactionsList";
import { AccountInfo } from "@/components/dashboard/AccountInfo";
import { useDeviceCompatibility } from "@/hooks/use-device-compatibility";
import { PageHeader } from "@/components/ui/page-header";
import { SectionContainer } from "@/components/ui/section-container";
import { StyledCard } from "@/components/ui/card-variants";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

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
      <SectionContainer>
        <PageHeader
          icon={BarChart2}
          title="Panou de Control"
          description="Gestionează tranzacțiile și monitorizează activitatea"
        />

        <div className="space-y-6">
          <DeviceCompatibilityAlert compatibility={deviceCompatibility} />
          
          <Tabs defaultValue="payment" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
              <TabsTrigger value="payment">Plată Nouă</TabsTrigger>
              <TabsTrigger value="transactions">Tranzacții</TabsTrigger>
            </TabsList>

            <TabsContent value="payment" className="space-y-4">
              <StyledCard className="border-primary/10">
                <div className="p-6">
                  <PaymentForm deviceCompatibility={deviceCompatibility} />
                </div>
              </StyledCard>
            </TabsContent>

            <TabsContent value="transactions" className="space-y-4">
              <StyledCard className="border-primary/10">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Tranzacții Recente</h2>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => queryClient.invalidateQueries({ queryKey: ['transactions'] })}
                      >
                        <RefreshCcw className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <ScrollArea className="h-[400px] w-full">
                    <TransactionsList 
                      transactions={transactions}
                      isLoading={isLoading}
                      onRefresh={() => queryClient.invalidateQueries({ queryKey: ['transactions'] })}
                    />
                  </ScrollArea>
                </div>
              </StyledCard>
            </TabsContent>
          </Tabs>

          <StyledCard className="border-primary/10">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Informații Cont</h2>
              <AccountInfo deviceCompatibility={deviceCompatibility} />
            </div>
          </StyledCard>

          <SecurityAlert />
        </div>
      </SectionContainer>
    </Layout>
  );
};

export default Dashboard;
