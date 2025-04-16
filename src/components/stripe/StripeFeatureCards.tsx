
import { CreditCard, ExternalLink, MoreHorizontal, ShieldCheck } from "lucide-react";
import { StyledCard } from "@/components/ui/card-variants";
import { Grid3Cols } from "@/components/ui/themed-components";

export const StripeFeatureCards = () => {
  return (
    <Grid3Cols>
      <StyledCard className="border-primary/10 h-full">
        <div className="p-6 h-full">
          <div className="flex items-start justify-between">
            <div className="p-2 rounded-full bg-blue-50">
              <ShieldCheck className="h-5 w-5 text-blue-500" />
            </div>
            <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
          </div>
          <h3 className="mt-4 mb-2 font-medium">Securitate de nivel înalt</h3>
          <p className="text-sm text-muted-foreground">
            Stripe oferă securitate PCI DSS nivel 1 pentru toate datele cardurilor tale, asigurând protecția maximă.
          </p>
        </div>
      </StyledCard>
      
      <StyledCard className="border-primary/10 h-full">
        <div className="p-6 h-full">
          <div className="flex items-start justify-between">
            <div className="p-2 rounded-full bg-blue-50">
              <CreditCard className="h-5 w-5 text-blue-500" />
            </div>
            <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
          </div>
          <h3 className="mt-4 mb-2 font-medium">Plăți internaționale</h3>
          <p className="text-sm text-muted-foreground">
            Acceptă plăți în peste 135 de valute diferite din întreaga lume, cu conversie automată.
          </p>
        </div>
      </StyledCard>
      
      <StyledCard className="border-primary/10 h-full">
        <div className="p-6 h-full">
          <div className="flex items-start justify-between">
            <div className="p-2 rounded-full bg-blue-50">
              <ExternalLink className="h-5 w-5 text-blue-500" />
            </div>
            <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
          </div>
          <h3 className="mt-4 mb-2 font-medium">Dashboard dedicat</h3>
          <p className="text-sm text-muted-foreground">
            Accesează dashboard-ul Stripe pentru rapoarte detaliate și gestionarea completă a plăților tale.
          </p>
        </div>
      </StyledCard>
    </Grid3Cols>
  );
};
