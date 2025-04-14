import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { DeviceCompatibility } from "@/hooks/use-device-compatibility";
import { supabase } from "@/integrations/supabase/client";
import { Textarea } from "@/components/ui/textarea";
import { CurrencyInput } from "@/components/ui/currency-input";
import { Loader2, ShieldCheck, AlertTriangle, CreditCard, Smartphone, NfcIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

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
    <Card className="border-2 border-primary/10">
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-2xl">Procesează o plată nouă</CardTitle>
            <CardDescription>
              Acceptă plăți contactless rapid și în siguranță
            </CardDescription>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <NfcIcon className="h-8 w-8 text-primary" />
            <CreditCard className="h-8 w-8 text-primary" />
          </div>
        </div>

        <Alert className="bg-blue-50 border-blue-200">
          <Smartphone className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-700">
            {deviceCompatibility.isCompatible === 'compatible' 
              ? "Dispozitivul tău este pregătit pentru plăți contactless"
              : "Pentru plăți contactless, folosește un iPhone cu iOS 16+"}
          </AlertDescription>
        </Alert>
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium mb-2 text-foreground/90">
            Sumă de încasat (£)
          </label>
          <CurrencyInput
            id="amount"
            placeholder="0.00"
            value={amount}
            onValueChange={(value) => setAmount(value)}
            prefix="£"
            decimalScale={2}
            className="h-14 text-xl font-medium"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-2 text-foreground/90">
            Descriere plată (opțional)
          </label>
          <Textarea
            id="description"
            placeholder="Ex: Plată servicii"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="resize-none min-h-[80px]"
          />
        </div>

        <div className="pt-4">
          <Button 
            onClick={handlePayment} 
            size="lg" 
            className="w-full h-16 text-lg gap-3"
            disabled={isProcessing || !amount || deviceCompatibility.isCompatible !== 'compatible'}
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Se procesează...
              </>
            ) : (
              <>
                <NfcIcon className="h-5 w-5" />
                Procesează plata contactless
              </>
            )}
          </Button>

          {deviceCompatibility.isCompatible !== 'compatible' && (
            <div className="flex items-center gap-2 text-amber-600 text-sm mt-4 bg-amber-50 p-3 rounded-md">
              <AlertTriangle className="h-4 w-4 flex-shrink-0" />
              <p>
                Plățile contactless sunt disponibile doar pe iPhone-uri cu suport pentru Tap to Pay.
              </p>
            </div>
          )}

          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
            <ShieldCheck className="h-4 w-4" />
            <span>Plăți securizate prin Stripe</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
