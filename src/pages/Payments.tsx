
import { Layout } from "@/components/layout/layout";
import { BarChart2, CreditCard, Download, Filter, Info, RefreshCcw } from "lucide-react";
import { PaymentForm } from "@/components/dashboard/PaymentForm";
import { TransactionsList } from "@/components/dashboard/TransactionsList";
import { useDeviceCompatibility } from "@/hooks/use-device-compatibility";
import { PageHeader } from "@/components/ui/page-header";
import { SectionContainer } from "@/components/ui/section-container";
import { StyledCard } from "@/components/ui/card-variants";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Payments = () => {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const deviceCompatibility = useDeviceCompatibility();
  
  const { data: recentTransactions = [], isLoading } = useQuery({
    queryKey: ['recent-transactions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      return data;
    }
  });

  useEffect(() => {
    const success = searchParams.get("success");
    const canceled = searchParams.get("canceled");

    if (success === "true") {
      toast({
        title: "Plată inițiată",
        description: "Plata ta este în curs de procesare.",
      });
      queryClient.invalidateQueries({ queryKey: ['recent-transactions'] });
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
      <SectionContainer>
        <PageHeader
          icon={CreditCard}
          title="Plăți"
          description="Procesează și gestionează plățile tale"
        />
        
        <div className="space-y-6">
          <StyledCard className="border-primary/10">
            <div className="p-6">
              <Alert className="mb-6 bg-blue-50 border-blue-200">
                <Info className="h-4 w-4 text-blue-500" />
                <AlertDescription className="text-blue-700">
                  Procesează plăți rapid prin Stripe și urmărește toate tranzacțiile într-un singur loc.
                </AlertDescription>
              </Alert>
              
              <Tabs defaultValue="payment">
                <TabsList className="grid w-full grid-cols-2 lg:w-[400px] mb-6">
                  <TabsTrigger value="payment">Plată Nouă</TabsTrigger>
                  <TabsTrigger value="recent">Tranzacții Recente</TabsTrigger>
                </TabsList>
                
                <TabsContent value="payment" className="space-y-4">
                  <PaymentForm deviceCompatibility={deviceCompatibility} />
                </TabsContent>
                
                <TabsContent value="recent" className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Ultime 5 Tranzacții</h2>
                    <div className="flex gap-2">
                      <RefreshCcw 
                        className="h-4 w-4 cursor-pointer text-muted-foreground hover:text-primary"
                        onClick={() => queryClient.invalidateQueries({ queryKey: ['recent-transactions'] })}
                      />
                    </div>
                  </div>
                  <TransactionsList 
                    transactions={recentTransactions}
                    isLoading={isLoading}
                    onRefresh={() => queryClient.invalidateQueries({ queryKey: ['recent-transactions'] })}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </StyledCard>
        </div>
      </SectionContainer>
    </Layout>
  );
};

export default Payments;
