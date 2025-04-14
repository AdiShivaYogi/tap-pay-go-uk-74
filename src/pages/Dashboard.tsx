
import { useState } from "react";
import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CurrencyInput } from "@/components/ui/currency-input";
import { useToast } from "@/components/ui/use-toast";

// Mock function to create a payment
const createPayment = async (amount: number): Promise<{ id: string, status: string }> => {
  return new Promise((resolve) => {
    // In a real app, this would call Stripe API
    setTimeout(() => {
      resolve({
        id: `pi_${Math.random().toString(36).substring(2, 10)}`,
        status: Math.random() > 0.2 ? 'succeeded' : 'failed'
      });
    }, 1500);
  });
};

const DashboardPage = () => {
  const { toast } = useToast();
  const [amount, setAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'failure'>('idle');
  const [transactionId, setTransactionId] = useState<string | null>(null);
  const stripeAccountId = localStorage.getItem("stripe_account_id") || "No account connected";

  const handleAmountChange = (value: string) => {
    if (!isNaN(Number(value))) {
      setAmount(value);
    }
  };

  const handlePaymentRequest = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount greater than 0.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setPaymentStatus('processing');
    
    try {
      const paymentResponse = await createPayment(parseFloat(amount));
      setTransactionId(paymentResponse.id);
      
      if (paymentResponse.status === 'succeeded') {
        setPaymentStatus('success');
        toast({
          title: "Payment successful!",
          description: `Successfully processed payment of £${parseFloat(amount).toFixed(2)}`,
          variant: "default",
        });
      } else {
        setPaymentStatus('failure');
        toast({
          title: "Payment failed",
          description: "The payment could not be processed. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      setPaymentStatus('failure');
      toast({
        title: "Error",
        description: "An error occurred while processing the payment.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
      // Reset after 5 seconds
      setTimeout(() => {
        if (paymentStatus !== 'idle') {
          setPaymentStatus('idle');
          setTransactionId(null);
        }
      }, 5000);
    }
  };

  return (
    <Layout>
      <div className="container py-8 px-4">
        <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Accept payments directly on your device</p>
          </div>
          <div className="bg-secondary/50 py-2 px-4 rounded-md flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-accent"></div>
            <span className="text-sm">Connected to Stripe: <span className="font-mono text-xs">{stripeAccountId}</span></span>
          </div>
        </div>

        <Tabs defaultValue="payment" className="w-full">
          <TabsList className="grid grid-cols-2 mb-8">
            <TabsTrigger value="payment">Accept Payment</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="payment" className="space-y-8">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Payment Amount</CardTitle>
                <CardDescription>Enter the amount you want to charge</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="amount" className="block text-sm font-medium mb-2">
                      Amount (GBP)
                    </label>
                    <CurrencyInput
                      id="amount"
                      placeholder="0.00"
                      value={amount}
                      onValueChange={handleAmountChange}
                      prefix="£"
                      disabled={isProcessing || paymentStatus === 'success'}
                    />
                  </div>

                  <Button
                    className="w-full h-16 text-lg font-medium"
                    onClick={handlePaymentRequest}
                    disabled={isProcessing || !amount || paymentStatus === 'success'}
                  >
                    {isProcessing ? "Processing..." : "Tap to Pay"}
                  </Button>

                  {paymentStatus === 'processing' && (
                    <div className="bg-secondary/50 p-6 rounded-lg text-center animate-pulse">
                      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4">
                        <path d="M22 12H2"></path>
                        <path d="M5 12v7"></path>
                        <path d="M19 12v7"></path>
                        <path d="M5 19h14"></path>
                        <path d="M8 5v7"></path>
                        <path d="M16 5v7"></path>
                        <path d="M8 5h8"></path>
                      </svg>
                      <h3 className="text-xl font-medium mb-2">Tap Card to Phone</h3>
                      <p className="text-sm text-muted-foreground">
                        Hold the contactless card close to the back of your phone
                      </p>
                    </div>
                  )}

                  {paymentStatus === 'success' && (
                    <div className="bg-accent/20 p-6 rounded-lg text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 text-accent-foreground">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                      <h3 className="text-xl font-medium mb-2">Payment Successful</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Transaction ID: {transactionId}
                      </p>
                      <p className="text-2xl font-bold">£{parseFloat(amount).toFixed(2)}</p>
                      <Button 
                        variant="outline" 
                        className="mt-4"
                        onClick={() => {
                          setAmount("");
                          setPaymentStatus('idle');
                          setTransactionId(null);
                        }}
                      >
                        New Payment
                      </Button>
                    </div>
                  )}

                  {paymentStatus === 'failure' && (
                    <div className="bg-destructive/10 p-6 rounded-lg text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 text-destructive">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="15" y1="9" x2="9" y2="15"></line>
                        <line x1="9" y1="9" x2="15" y2="15"></line>
                      </svg>
                      <h3 className="text-xl font-medium mb-2">Payment Failed</h3>
                      <p className="text-sm text-muted-foreground">
                        Please try again or use a different payment method
                      </p>
                      <Button 
                        variant="outline" 
                        className="mt-4"
                        onClick={() => {
                          setPaymentStatus('idle');
                          setTransactionId(null);
                        }}
                      >
                        Try Again
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="text-center text-sm text-muted-foreground">
              <p>
                Payments are processed securely through Stripe.<br />
                TapPayGo does not store any payment information.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>Recent payment transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 text-muted-foreground">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                  </svg>
                  <h3 className="text-lg font-medium mb-2">No Transactions Yet</h3>
                  <p className="text-sm text-muted-foreground">
                    Once you process payments, they will appear here.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default DashboardPage;
