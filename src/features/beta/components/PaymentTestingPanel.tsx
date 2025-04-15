
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Zap, ShieldCheck, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const PaymentTestingPanel = () => {
  const [testAmount, setTestAmount] = useState<string>('10.00');
  const [isProcessing, setIsProcessing] = useState(false);

  const runTestTransaction = async () => {
    setIsProcessing(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: { 
          amount: parseFloat(testAmount),
          description: 'Beta Testing Transaction'
        }
      });

      if (error) throw error;
      if (!data.url) throw new Error('Nu s-a putut obține URL-ul de plată');

      toast({
        title: "Test Tranzacție Inițiată",
        description: "Redirecționare către Stripe Checkout pentru plata de test",
        variant: "default"
      });

      window.location.href = data.url;
    } catch (error) {
      console.error('Eroare la procesarea plații de test:', error);
      toast({
        title: "Eroare la Test",
        description: "A apărut o eroare la inițierea tranzacției de test.",
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
              Test Plăți Contactless
            </CardTitle>
            <CardDescription>
              Platformă pentru testarea fluxului de plată Stripe
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <ShieldCheck className="mr-1 h-4 w-4" />
              Mod Testare
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="testAmount" className="block text-sm font-medium mb-2">
              Sumă Test (£)
            </label>
            <Input
              id="testAmount"
              type="number"
              step="0.01"
              value={testAmount}
              onChange={(e) => setTestAmount(e.target.value)}
              placeholder="Introduceți suma pentru test"
              className="h-12 text-lg"
            />
          </div>
          
          <Button 
            onClick={runTestTransaction} 
            disabled={isProcessing}
            className="w-full h-14 text-lg"
          >
            {isProcessing ? "Se procesează testul..." : "Inițiere Test Plată"}
          </Button>
        </div>

        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg flex items-center gap-3">
          <AlertTriangle className="h-6 w-6 text-blue-600" />
          <p className="text-sm text-blue-800">
            Utilizați această secțiune doar pentru teste. Toate tranzacțiile sunt procesate în modul Stripe Test.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
