
import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { toast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const [amount, setAmount] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [searchParams] = useSearchParams();

  // Check payment status from URL parameters
  useEffect(() => {
    const success = searchParams.get("success");
    const canceled = searchParams.get("canceled");

    if (success === "true") {
      toast({
        title: "Plată reușită",
        description: "Plata a fost procesată cu succes.",
      });
    } else if (canceled === "true") {
      toast({
        title: "Plată anulată",
        description: "Plata a fost anulată.",
        variant: "destructive",
      });
    }
  }, [searchParams]);

  const handlePayment = async () => {
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
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: { amount: parseFloat(amount) }
      });

      if (error) throw error;
      if (!data.url) throw new Error('Nu s-a putut obține URL-ul de plată');

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
    <Layout>
      <div className="container py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
            <p className="text-muted-foreground">Acceptă plăți contactless direct pe telefonul tău</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 px-3 py-1">
              Conectat la Stripe
            </Badge>
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Procesează o plată nouă</CardTitle>
            <CardDescription>
              Introdu suma și procesează plata în siguranță prin Stripe
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
                disabled={isProcessing || !amount}
              >
                {isProcessing ? "Se procesează..." : "Procesează plata prin Stripe"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Tranzacții recente</CardTitle>
              <CardDescription>Ultimele plăți procesate</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-muted-foreground text-center py-6">
                Nu există tranzacții recente.
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button variant="outline" className="w-full" disabled>Vezi toate tranzacțiile</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Informații cont</CardTitle>
              <CardDescription>Detaliile contului tău</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Cont Stripe</p>
                  <p className="text-sm text-muted-foreground">Conectat</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Plan curent</p>
                  <p className="text-sm text-muted-foreground">Pay-as-you-go</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Dispozitiv</p>
                  <p className="text-sm text-muted-foreground">iPhone (Compatibil cu Tap to Pay)</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full">Gestionează contul</Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Setări cont</SheetTitle>
                    <SheetDescription>
                      Gestionează setările contului tău TapPayGo
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-6 space-y-4">
                    <Button variant="outline" className="w-full">Deconectare de la Stripe</Button>
                    <Button variant="outline" className="w-full">Schimbă planul tarifar</Button>
                    <Button variant="outline" className="w-full">Preferințe notificări</Button>
                  </div>
                  <SheetFooter>
                    <Button variant="outline" className="w-full">Închide</Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
