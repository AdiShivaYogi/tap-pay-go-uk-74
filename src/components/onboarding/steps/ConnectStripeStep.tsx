
import React from "react";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";

interface ConnectStripeStepProps {
  onConnect: () => void;
}

export const ConnectStripeStep: React.FC<ConnectStripeStepProps> = ({ onConnect }) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold mb-4">Conectează-te cu Stripe</h2>
        <p className="text-muted-foreground">
          Pentru a începe să procesezi plăți, conectează-te cu contul tău Stripe existent sau creează unul nou.
        </p>
      </div>
      
      <div className="bg-muted/30 p-6 rounded-lg space-y-4 text-center">
        <p className="text-sm text-muted-foreground mb-4">
          După conectare, vei reveni automat în aplicație.
          Stripe gestionează tot procesul de creare sau autentificare.
        </p>
        
        <Button 
          onClick={onConnect}
          className="w-full sm:w-auto h-14 px-8 text-lg mx-auto"
        >
          <CreditCard className="mr-2 h-5 w-5" />
          Conectează-te cu Stripe
        </Button>
      </div>
    </div>
  );
};
