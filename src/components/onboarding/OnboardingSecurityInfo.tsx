
import React from "react";
import { StyledCard } from "@/components/ui/styled-card";
import { Shield, Check } from "lucide-react";

export const OnboardingSecurityInfo: React.FC = () => {
  return (
    <StyledCard className="border-primary/10">
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="p-2 rounded-full bg-primary/10">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Securitate și conformitate UK</h3>
            <p className="text-sm text-muted-foreground mb-4">
              TapPayGo este o aplicație care doar intermediază conexiunea ta cu Stripe. 
              Noi nu stocăm date bancare sau informații personale sensibile. Toate plățile 
              și tranzacțiile sunt gestionate de Stripe, unul dintre liderii globali în 
              procesarea plăților securizate.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm text-muted-foreground">GDPR Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm text-muted-foreground">PSD2 Ready</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm text-muted-foreground">SCA Support</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm text-muted-foreground">UK-FCA Registered</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StyledCard>
  );
};
