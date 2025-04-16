
import React from "react";
import { StyledCard } from "@/components/ui/styled-card";
import { Shield } from "lucide-react";

export const OnboardingSecurityInfo: React.FC = () => {
  return (
    <StyledCard className="border-primary/10">
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="p-2 rounded-full bg-primary/10">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Securitate și confidențialitate</h3>
            <p className="text-sm text-muted-foreground">
              TapPayGo este o aplicație care doar intermediază conexiunea ta cu Stripe. 
              Noi nu stocăm date bancare sau informații personale sensibile. Toate plățile 
              și tranzacțiile sunt gestionate de Stripe, unul dintre liderii globali în 
              procesarea plăților securizate.
            </p>
          </div>
        </div>
      </div>
    </StyledCard>
  );
};
