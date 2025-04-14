
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { DeviceCompatibility } from "@/hooks/use-device-compatibility";
import { supabase } from "@/integrations/supabase/client";
import { Textarea } from "@/components/ui/textarea";
import { CurrencyInput } from "@/components/ui/currency-input";
import { Loader2, ShieldCheck, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PaymentFormProps {
  deviceCompatibility: DeviceCompatibility;
}

export const PaymentForm = ({ deviceCompatibility }: PaymentFormProps) => {
  const [amount, setAmount] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handlePayment = async () => {
    // Validate amount
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      toast({
        title: "Sumă invalidă",
        description: "Te rugăm să introduci o sumă validă mai mare decât zero.",
        variant: "destructive"
      });
      return;
    }

    // Check device compatibility
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
      // Call the create-payment edge function
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: { 
          amount: parseFloat(amount),
          description: description || "Plată"
        }
      });

      if (error) throw error;
      if (!data.url) throw new Error('Nu s-a putut obține URL-ul de plată');

      // Save session ID for reference
      if (data.sessionId) {
        localStorage.setItem('last_payment_session', data.sessionId);
      }

      // Redirect to Stripe Checkout
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
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Procesează o plată nouă</CardTitle>
            <CardDescription>
              Introdu suma și procesează plata în siguranță prin Stripe
              {deviceCompatibility.isCompatible === 'compatible' && 
                " folosind Tap to Pay pentru plăți contactless"}
            </CardDescription>
          </div>
          <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
            <ShieldCheck className="h-3.5 w-3.5 mr-1" />
            Securizat
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-6">
          <div>
            <label htmlFor="amount" className="block text-sm font-medium mb-2">
              Suma (£)
            </label>
            <CurrencyInput
              id="amount"
              placeholder="0.00"
              value={amount}
              onValueChange={(value) => setAmount(value)}
              prefix="£"
              decimalScale={2}
              className="h-14 text-xl"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-2">
              Descriere (opțional)
            </label>
            <Textarea
              id="description"
              placeholder="Descriere pentru această plată"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="resize-none"
              rows={2}
            />
          </div>

          <Button 
            onClick={handlePayment} 
            size="lg" 
            className="w-full h-16 text-lg"
            disabled={isProcessing || !amount || deviceCompatibility.isCompatible !== 'compatible'}
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Se procesează...
              </>
            ) : deviceCompatibility.isCompatible === 'compatible' ? (
              "Procesează plata contactless"
            ) : (
              "Procesează plata prin Stripe"
            )}
          </Button>
          
          {deviceCompatibility.isCompatible !== 'compatible' && (
            <div className="flex items-center gap-2 text-amber-600 text-sm mt-2 bg-amber-50 p-3 rounded-md">
              <AlertTriangle className="h-4 w-4 flex-shrink-0" />
              <p>
                Plățile contactless sunt disponibile doar pe iPhone-uri compatibile cu Tap to Pay.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
