
import { useState } from "react";
import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

// Mock function for Stripe OAuth redirect
const redirectToStripeOAuth = () => {
  // In a real app, this would redirect to Stripe's OAuth flow
  // Using a client_id registered with Stripe
  // window.location.href = `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=YOUR_CLIENT_ID&scope=read_write`;
  
  // For demo purposes, we'll simulate this by storing a mock account ID
  localStorage.setItem("stripe_account_id", "acct_mock123456");
  return true;
};

const ConnectStripePage = () => {
  const navigate = useNavigate();
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConnectStripe = async () => {
    setIsConnecting(true);
    setError(null);
    
    try {
      // In a real app, this would redirect to Stripe OAuth
      const success = redirectToStripeOAuth();
      
      if (success) {
        // In this mock implementation, we'll simulate a successful connection
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } else {
        setError("Failed to connect to Stripe. Please try again.");
        setIsConnecting(false);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again later.");
      setIsConnecting(false);
    }
  };

  return (
    <Layout>
      <div className="container max-w-md mx-auto py-12 px-4">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Connect with Stripe</CardTitle>
            <CardDescription>
              Link your Stripe account to start accepting payments.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-muted/50 p-6 rounded-lg text-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 text-primary">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <h3 className="font-medium mb-2">Secure Connection</h3>
              <p className="text-sm text-muted-foreground mb-6">
                We use Stripe's secure OAuth flow to connect your account. We never see or store your Stripe credentials.
              </p>
              
              <Button 
                onClick={handleConnectStripe}
                disabled={isConnecting}
                className="w-full"
              >
                <svg viewBox="0 0 60 25" xmlns="http://www.w3.org/2000/svg" width="60" height="25" className="mr-2">
                  <path fill="#635BFF" d="M59.64 14.28h-8.06v1.2h5.92v2.2h-5.92v1.2h8.03v2.32H48.16v-9.24h11.48v2.32zm-13.68 5.72L42.2 14.28h-2.77v-2.13h4.02c1.08 0 1.94.88 1.94 1.96 0 .77-.45 1.43-1.1 1.75l3.27 4.23-1.6-.09zm-14.33-3.52h-3.8v3.43h-3.43V10.76h11.07v2.37h-3.84v7.06h-3.42v-7.01l3.42.3zm-12.35 3.52L15.7 14.28h-2.66v-2.21h3.92c1.07 0 1.94.88 1.94 1.96 0 .77-.45 1.43-1.1 1.75l3.27 4.23-2.87-.09zm-3.25-3.52h-3.46v3.43H9.14V10.76h3.43v6.72h3.46v-6.72h3.42v9.24h-3.42v-3.52zm44.15-3.52c1 0 1.81.8 1.81 1.79a1.8 1.8 0 0 1-1.8 1.8c-1 0-1.8-.81-1.8-1.8 0-1 .8-1.8 1.8-1.8z"/>
                </svg>
                {isConnecting ? "Connecting..." : "Connect with Stripe"}
              </Button>
              
              {error && (
                <div className="mt-4 text-destructive text-sm">
                  {error}
                </div>
              )}
            </div>
            
            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                Don't have a Stripe account?{" "}
                <a 
                  href="https://dashboard.stripe.com/register"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Create one now
                </a>
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => navigate("/onboarding")}
            >
              Back
            </Button>
            <Button 
              variant="ghost"
              onClick={() => navigate("/dashboard")}
            >
              Demo mode
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default ConnectStripePage;
