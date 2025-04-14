
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { NfcIcon, AlertCircle, ShieldCheck } from "lucide-react";

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

  // Verifică starea ultimei tranzacții
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
            // Curăță ID-ul sesiunii după verificare
            localStorage.removeItem('last_payment_session');
            // Reîmprospătează lista de tranzacții
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
      
      // Verifică starea tranzacției după câteva secunde
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
      // Verifică la încărcarea paginii dacă există o tranzacție în așteptare
      checkLastTransaction();
    }
  }, [searchParams, queryClient]);

  return (
    <Layout>
      <div className="container max-w-7xl py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <NfcIcon className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold">Plăți Contactless</h1>
            </div>
            <p className="text-muted-foreground">
              Transformă-ți telefonul într-un terminal de plată sigur și eficient
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 px-3 py-1">
              <ShieldCheck className="mr-1 h-4 w-4" />
              Conectat la Stripe
            </Badge>
            {deviceCompatibility.isCompatible === 'compatible' && (
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 px-3 py-1">
                <NfcIcon className="mr-1 h-4 w-4" />
                NFC Activ
              </Badge>
            )}
          </div>
        </div>

        <div className="grid gap-6">
          <DeviceCompatibilityAlert compatibility={deviceCompatibility} />
          
          <SecurityAlert />
          
          <PaymentTransparencyInfo />

          <Tabs defaultValue="payment" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="payment">Procesare Plată</TabsTrigger>
              <TabsTrigger value="transactions">Tranzacții & Cont</TabsTrigger>
            </TabsList>
            
            <TabsContent value="payment" className="space-y-6">
              <PaymentForm deviceCompatibility={deviceCompatibility} />
            </TabsContent>
            
            <TabsContent value="transactions" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TransactionsList 
                  transactions={transactions}
                  isLoading={isLoading}
                  onRefresh={() => queryClient.invalidateQueries({ queryKey: ['transactions'] })}
                />
                <AccountInfo deviceCompatibility={deviceCompatibility} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
