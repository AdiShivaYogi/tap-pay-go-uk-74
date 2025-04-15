
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Zap } from "lucide-react";

export const PaymentTestingPanel = () => {
  const [amount, setAmount] = useState<string>('10.00');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePaymentTest = async () => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: { amount: parseFloat(amount) }
      });

      if (error || !data?.url) throw error;
      window.location.href = data.url;
      
    } catch (error) {
      toast({
        title: "Eroare Test",
        description: "Nu s-a putut procesa plata de test.",
        variant: "destructive"
      });
      setIsProcessing(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Test Plată
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Sumă test (£)"
          />
        </div>
        
        <Button 
          onClick={handlePaymentTest}
          disabled={isProcessing}
          className="w-full"
        >
          {isProcessing ? "Se procesează..." : "Testează plata"}
        </Button>
      </CardContent>
    </Card>
  );
};
