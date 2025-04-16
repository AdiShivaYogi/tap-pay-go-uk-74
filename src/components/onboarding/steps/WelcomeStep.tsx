
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface WelcomeStepProps {
  onNext: () => void;
}

export const WelcomeStep: React.FC<WelcomeStepProps> = ({ onNext }) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-4">Bun venit la TapPayGo</h2>
        <p className="text-muted-foreground text-lg">
          Transformă-ți iPhone-ul într-un cititor de carduri. Fără hardware. Fără cont separat. Doar Stripe.
        </p>
      </div>
      
      <div className="flex justify-center">
        <img 
          src="/lovable-uploads/8d8d7578-89fa-456f-b552-520d487871a5.png" 
          alt="TapPayGo Demo" 
          className="rounded-lg shadow-lg max-w-md"
        />
      </div>
      
      <Button 
        onClick={onNext} 
        className="w-full h-14 text-lg"
      >
        Continuă <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </div>
  );
};
