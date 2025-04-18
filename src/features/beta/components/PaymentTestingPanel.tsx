
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Zap, ShieldCheck, AlertTriangle, CreditCard } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";

export const PaymentTestingPanel = () => {
  const [testAmount, setTestAmount] = useState<string>('10.00');
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useAuth();

  const runTestTransaction = async () => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    try {
      // Verifică dacă utilizatorul este autentificat
      if (!user) {
        toast({
          title: "Autentificare necesară",
          description: "Trebuie să fiți autentificat pentru a procesa plăți",
          variant: "destructive"
        });
        setIsProcessing(false);
        return;
      }

      // Verifică dacă contul Stripe este conectat
      if (!user.stripeConnected) {
        toast({
          title: "Cont Stripe neconectat",
          description: "Conectați-vă contul Stripe din secțiunea de setări înainte de a procesa plăți",
          variant: "destructive"
        });
        setIsProcessing(false);
        return;
      }

      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: { 
          amount: parseFloat(testAmount),
          description: 'Tranzacție de test în regim real',
          mode: 'live' // Specificăm explicit că dorim procesarea în regim real
        }
      });

      if (error) throw error;
      if (!data?.url) throw new Error('Nu s-a putut obține URL-ul de plată');

      toast({
        title: "Tranzacție Inițiată",
        description: "Redirecționare către Stripe Checkout pentru plată",
        variant: "default"
      });

      window.location.href = data.url;
    } catch (error) {
      console.error('Eroare la procesarea plații:', error);
      toast({
        title: "Eroare la Procesare",
        description: "A apărut o eroare la inițierea tranzacției. Verificați conexiunea Stripe.",
        variant: "destructive"
      });
      setIsProcessing(false);
    }
  };

  return (
    <Card className="border-2 border-primary/10">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Zap className="h-6 w-6 text-primary" />
              Procesare Plăți Contactless
            </CardTitle>
            <CardDescription>
              Sistem pentru procesarea plăților contactless prin Stripe
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <CreditCard className="mr-1 h-4 w-4" />
              Mod Real
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="testAmount" className="block text-sm font-medium mb-2">
              Sumă (£)
            </label>
            <Input
              id="testAmount"
              type="number"
              step="0.01"
              value={testAmount}
              onChange={(e) => setTestAmount(e.target.value)}
              placeholder="Introduceți suma pentru tranzacție"
              className="h-12 text-lg"
            />
          </div>
          
          <Button 
            onClick={runTestTransaction} 
            disabled={isProcessing || !user?.stripeConnected}
            className="w-full h-14 text-lg"
          >
            {isProcessing ? "Se procesează..." : "Procesează plată"}
          </Button>
        </div>

        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg flex items-center gap-3">
          <ShieldCheck className="h-6 w-6 text-blue-600" />
          <p className="text-sm text-blue-800">
            Plățile sunt procesate în mod real prin intermediul Stripe. Fondurile vor fi transferate în contul dvs. Stripe.
          </p>
        </div>

        {!user?.stripeConnected && (
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg flex items-center gap-3">
            <AlertTriangle className="h-6 w-6 text-amber-600" />
            <p className="text-sm text-amber-800">
              Conectați-vă contul Stripe din secțiunea de setări pentru a activa procesarea plăților.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
