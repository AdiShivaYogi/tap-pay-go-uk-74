
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CreditCard, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface AboutStripeStepProps {
  onNext: () => void;
}

export const AboutStripeStep: React.FC<AboutStripeStepProps> = ({ onNext }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-center mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md inline-flex items-center gap-4">
          <CreditCard className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-semibold">Stripe</span>
        </div>
      </div>
      
      <div className="text-center mb-6">
        <p className="text-lg text-muted-foreground">
          TapPayGo nu procesează plăți. Toate încasările se fac în siguranță prin Stripe — una dintre cele mai sigure platforme de plăți din lume.
        </p>
      </div>
      
      <Alert className="bg-blue-50 border-blue-200 mb-6">
        <Info className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-700">
          Stripe gestionează toate informațiile bancare și financiare. TapPayGo nu stochează niciodată datele cardurilor clienților.
        </AlertDescription>
      </Alert>
      
      <Button 
        onClick={onNext}
        className="w-full h-14 text-lg"
      >
        Continuă <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </div>
  );
};
