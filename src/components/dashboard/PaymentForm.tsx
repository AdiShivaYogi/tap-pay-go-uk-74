import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { DeviceCompatibility } from "@/hooks/use-device-compatibility";
import { supabase } from "@/integrations/supabase/client";

interface PaymentFormProps {
  deviceCompatibility: DeviceCompatibility;
}

export const PaymentForm = ({ deviceCompatibility }: PaymentFormProps) => {
  const [amount, setAmount] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handlePayment = async () => {
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      toast({
        title: "Sumă invalidă",
        description: "Te rugăm să introduci o sumă validă mai mare decât zero.",
        variant: "destructive"
      });
      return;
    }

    if (deviceCompatibility.isCompatible !== 'compatible') {
      toast({
        title: "Dispozitiv incompatibil",
        description: "Dispozitivul dumneavoastră nu suportă Tap to Pay. Folosiți un iPhone cu iOS 16+ pentru a procesa plăți contactless.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    try {
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: { amount: parseFloat(amount) }
      });

      if (error) throw error;
      if (!data.url) throw new Error('Nu s-a putut obține URL-ul de plată');

      window.location.href = data.url;
    } catch (error) {
      console.error('Eroare la procesarea plății:', error);
      toast({
        title: "Eroare la procesare",
        description: "A apărut o eroare la procesarea plății. Te rugăm să încerci din nou.",
        variant: "destructive"
      });
      setIsProcessing(false);
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Procesează o plată nouă</CardTitle>
        <CardDescription>
          Introdu suma și procesează plata în siguranță prin Stripe
          {deviceCompatibility.isCompatible === 'compatible' && 
            " folosind Tap to Pay pentru plăți contactless"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-6">
          <div>
            <label htmlFor="amount" className="block text-sm font-medium mb-2">
              Suma (£)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2">£</span>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                className="pl-8"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                step="0.01"
                min="0.01"
              />
            </div>
          </div>

          <Button 
            onClick={handlePayment} 
            size="lg" 
            className="w-full h-16 text-lg"
            disabled={isProcessing || !amount || deviceCompatibility.isCompatible !== 'compatible'}
          >
            {isProcessing ? "Se procesează..." : deviceCompatibility.isCompatible === 'compatible' ? 
              "Procesează plata contactless" : "Procesează plata prin Stripe"}
          </Button>
          
          {deviceCompatibility.isCompatible !== 'compatible' && (
            <p className="text-sm text-amber-600 text-center">
              Plățile contactless sunt disponibile doar pe iPhone-uri compatibile cu Tap to Pay.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
