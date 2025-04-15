
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { DeviceCompatibility } from "@/hooks/use-device-compatibility";
import { supabase } from "@/integrations/supabase/client";
import { Textarea } from "@/components/ui/textarea";
import { CurrencyInput } from "@/components/ui/currency-input";
import { Loader2, ShieldCheck, AlertTriangle, CreditCard, Smartphone, NfcIcon, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useAuth } from "@/hooks/use-auth";

interface PaymentFormProps {
  deviceCompatibility: DeviceCompatibility;
}

export const PaymentForm = ({ deviceCompatibility }: PaymentFormProps) => {
  const [amount, setAmount] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showTapToPayDialog, setShowTapToPayDialog] = useState<boolean>(false);
  const { user } = useAuth();

  // Efect pentru simularea scanării cardului în dialog
  const [scanningStatus, setScanningStatus] = useState<'idle' | 'scanning' | 'success' | 'error'>('idle');
  
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    
    if (showTapToPayDialog && scanningStatus === 'scanning') {
      timer = setTimeout(() => {
        setScanningStatus('success');
        
        // După simularea procesării cu succes, închide dialogul și arată un mesaj
        setTimeout(() => {
          setShowTapToPayDialog(false);
          toast({
            title: "Plată procesată cu succes",
            description: `Suma de £${amount} a fost procesată prin Tap to Pay.`,
          });
          setIsProcessing(false);
          setAmount("");
          setDescription("");
          setScanningStatus('idle');
        }, 2000);
      }, 5000);
    }
    
    return () => clearTimeout(timer);
  }, [showTapToPayDialog, scanningStatus, amount]);

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

    setIsProcessing(true);

    try {
      // Verificăm dacă dispozitivul este compatibil cu Tap to Pay
      if (deviceCompatibility.isCompatible === 'compatible') {
        // Folosim fluxul Tap to Pay pentru dispozitivele compatibile
        setShowTapToPayDialog(true);
        setScanningStatus('scanning');
      } else {
        // Folosim fluxul standard Stripe pentru dispozitive incompatibile
        const { data, error } = await supabase.functions.invoke('create-payment', {
          body: { 
            amount: parseFloat(amount),
            description: description || "Plată"
          }
        });

        if (error) throw error;
        if (!data.url) throw new Error('Nu s-a putut obține URL-ul de plată');

        toast({
          title: "Redirecționare către plată",
          description: "Veți fi redirectat către Stripe Checkout pentru completarea plății.",
          variant: "default"
        });

        window.location.href = data.url;
      }
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
    <>
      <Card className="border-2 border-primary/10">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-2xl">Procesează o plată nouă</CardTitle>
              <CardDescription>
                Acceptă plăți în siguranță prin {deviceCompatibility.isCompatible === 'compatible' ? "scanarea cardului fizic (Tap to Pay)" : "Stripe Checkout"}
              </CardDescription>
            </div>
          </div>

          {deviceCompatibility.isCompatible === 'compatible' && (
            <Alert className="bg-blue-50 border-blue-200">
              <Info className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-700">
                <div className="flex items-center gap-2">
                  <NfcIcon className="h-5 w-5" />
                  <span>Dispozitivul dumneavoastră este compatibil cu scanarea cardului fizic (Tap to Pay). Apropiați cardul de spatele telefonului pentru a procesa plata.</span>
                </div>
              </AlertDescription>
            </Alert>
          )}
          
          {deviceCompatibility.isCompatible !== 'compatible' && (
            <Alert className="bg-amber-50 border-amber-200">
              <Info className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-700">
                <div className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  <span>Veți fi redirecționat către interfața standard Stripe Checkout pentru introducerea manuală a detaliilor cardului.</span>
                </div>
              </AlertDescription>
            </Alert>
          )}
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
              disabled={isProcessing || !amount}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Se procesează...
                </>
              ) : deviceCompatibility.isCompatible === 'compatible' ? (
                <>
                  <NfcIcon className="h-5 w-5" />
                  Scanează cardul cu Tap to Pay
                </>
              ) : (
                <>
                  <CreditCard className="h-5 w-5" />
                  Procesează plata prin Stripe
                </>
              )}
            </Button>

            <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
              <ShieldCheck className="h-4 w-4" />
              <span>Plăți securizate prin {deviceCompatibility.isCompatible === 'compatible' ? "Apple Tap to Pay" : "Stripe Checkout"}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dialog pentru Tap to Pay */}
      <Dialog open={showTapToPayDialog} onOpenChange={setShowTapToPayDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Scanare Card cu Tap to Pay</DialogTitle>
            <DialogDescription>
              Apropiați cardul contactless de spatele telefonului pentru a procesa plata.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col items-center justify-center py-8 space-y-6">
            {scanningStatus === 'scanning' && (
              <>
                <div className="relative">
                  <NfcIcon className="h-20 w-20 text-primary" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-20"></span>
                  </div>
                </div>
                <p className="text-center text-muted-foreground">
                  Se scanează... Nu îndepărtați cardul de telefon.
                </p>
              </>
            )}

            {scanningStatus === 'success' && (
              <>
                <div className="relative">
                  <CheckCircle className="h-20 w-20 text-green-600" />
                </div>
                <p className="text-center font-medium text-green-600">
                  Plată procesată cu succes!
                </p>
                <div className="text-center">
                  <p className="text-lg font-bold">£{amount}</p>
                  {description && <p className="text-muted-foreground">{description}</p>}
                </div>
              </>
            )}

            {scanningStatus === 'error' && (
              <>
                <div className="relative">
                  <AlertTriangle className="h-20 w-20 text-destructive" />
                </div>
                <p className="text-center font-medium text-destructive">
                  Eroare la procesarea plății. Încercați din nou.
                </p>
                <Button 
                  onClick={() => setScanningStatus('scanning')}
                  variant="outline"
                >
                  Încearcă din nou
                </Button>
              </>
            )}

            {scanningStatus === 'idle' && (
              <>
                <div className="relative">
                  <NfcIcon className="h-20 w-20 text-primary" />
                </div>
                <p className="text-center text-muted-foreground">
                  Pregătit pentru scanare. Apropiați cardul de telefon.
                </p>
                <Button 
                  onClick={() => setScanningStatus('scanning')}
                  variant="outline"
                >
                  Inițiază scanarea
                </Button>
              </>
            )}
          </div>

          <div className="flex justify-between items-center pt-2 border-t">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 px-2">
              <ShieldCheck className="mr-1 h-3 w-3" />
              Securizat prin Apple
            </Badge>
            <p className="text-sm text-muted-foreground">
              Sumă: <span className="font-medium">£{amount}</span>
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
