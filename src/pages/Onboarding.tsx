import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const OnboardingPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedPlan = searchParams.get('plan');
  const totalSteps = 3;

  useEffect(() => {
    if (!selectedPlan) {
      navigate('/pricing');
    }
  }, [selectedPlan, navigate]);

  const handleNext = () => {
    if (currentStep === totalSteps) {
      navigate("/connect-stripe");
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/pricing');
    }
  };

  if (!selectedPlan) {
    return null;
  }

  return (
    <Layout>
      <div className="container max-w-4xl mx-auto py-12 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Getting Started</h1>
          <div className="text-sm text-muted-foreground">
            Step {currentStep} of {totalSteps}
          </div>
        </div>

        <div className="flex space-x-2 mb-10">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div
              key={index}
              className={`h-1 flex-1 rounded-full ${
                index + 1 <= currentStep ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>
              {currentStep === 1 && "Selected Plan"}
              {currentStep === 2 && "How It Works"}
              {currentStep === 3 && "Connect Stripe"}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && "You've chosen the perfect plan. Let's start setting things up."}
              {currentStep === 2 && "A simple 3-step process to start receiving payments."}
              {currentStep === 3 && "Securely connect with Stripe to receive payments directly."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="p-6 bg-muted/50 rounded-lg text-center">
                  <h3 className="text-xl font-semibold mb-2">
                    {selectedPlan === 'pay-as-you-go' && "Pay-as-you-go"}
                    {selectedPlan === 'monthly' && "Plan Lunar"}
                    {selectedPlan === 'lifetime' && "Plan Lifetime"}
                  </h3>
                  <p className="text-muted-foreground">
                    {selectedPlan === 'pay-as-you-go' && "Plătești doar când folosești serviciul"}
                    {selectedPlan === 'monthly' && "Acces complet cu plată lunară"}
                    {selectedPlan === 'lifetime' && "Acces nelimitat pe viață"}
                  </p>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-8">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <div className="text-2xl font-bold text-primary">1</div>
                  </div>
                  <h3 className="font-medium mb-2">Connect Stripe</h3>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    Link your existing Stripe account or create a new one through our secure portal.
                  </p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <div className="text-2xl font-bold text-primary">2</div>
                  </div>
                  <h3 className="font-medium mb-2">Enter Amount</h3>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    Input the payment amount you want to receive from your customer.
                  </p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <div className="text-2xl font-bold text-primary">3</div>
                  </div>
                  <h3 className="font-medium mb-2">Accept Payment</h3>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    Your customer pays with their contactless card or device, and you get paid instantly.
                  </p>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6 text-center">
                <div className="bg-muted/50 p-6 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 text-primary">
                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1"></path>
                    <line x1="4" y1="22" x2="4" y2="15"></line>
                  </svg>
                  <p className="text-sm text-muted-foreground mb-4">
                    To start accepting payments, you'll need to connect your Stripe account. This connection is secure and we don't store any of your API keys.
                  </p>
                  <div className="flex justify-center">
                    <Button variant="outline" className="w-full">
                      <svg viewBox="0 0 60 25" xmlns="http://www.w3.org/2000/svg" width="60" height="25" className="mr-2">
                        <path fill="#635BFF" d="M59.64 14.28h-8.06v1.2h5.92v2.2h-5.92v1.2h8.03v2.32H48.16v-9.24h11.48v2.32zm-13.68 5.72L42.2 14.28h-2.77v-2.13h4.02c1.08 0 1.94.88 1.94 1.96 0 .77-.45 1.43-1.1 1.75l3.27 4.23-1.6-.09zm-14.33-3.52h-3.8v3.43h-3.43V10.76h11.07v2.37h-3.84v7.06h-3.42v-7.01l3.42.3zm-12.35 3.52L15.7 14.28h-2.66v-2.21h3.92c1.07 0 1.94.88 1.94 1.96 0 .77-.45 1.43-1.1 1.75l3.27 4.23-2.87-.09zm-3.25-3.52h-3.46v3.43H9.14V10.76h3.43v6.72h3.46v-6.72h3.42v9.24h-3.42v-3.52zm44.15-3.52c1 0 1.81.8 1.81 1.79a1.8 1.8 0 0 1-1.8 1.8c-1 0-1.8-.81-1.8-1.8 0-1 .8-1.8 1.8-1.8z"/>
                      </svg>
                      Connect with Stripe
                    </Button>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground">
                  By connecting your Stripe account, you agree to our 
                  <a href="/terms" className="text-primary hover:underline mx-1">Terms of Service</a> and 
                  <a href="/privacy" className="text-primary hover:underline mx-1">Privacy Policy</a>.
                </p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              {currentStep === 1 ? "Change Plan" : "Back"}
            </Button>
            <Button onClick={handleNext}>
              {currentStep === totalSteps ? "Connect Stripe" : "Continue"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default OnboardingPage;
