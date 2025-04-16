
import { ShieldCheck, CreditCard, BarChart } from "lucide-react";
import { StyledCard } from "@/components/ui/cards";

export const StripeFeatureCards = () => {
  return (
    <div className="py-8">
      <h2 className="text-2xl font-semibold text-center mb-10">Beneficii Stripe</h2>
      
      <div className="grid gap-6 md:grid-cols-3">
        <StyledCard className="p-6">
          <div className="flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <ShieldCheck className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-medium mb-2">Securitate de nivel înalt</h3>
            <p className="text-muted-foreground text-sm">
              Stripe oferă securitate PCI DSS nivel 1 pentru toate datele cardurilor tale, asigurând protecția maximă.
            </p>
          </div>
        </StyledCard>
        
        <StyledCard className="p-6">
          <div className="flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <CreditCard className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-medium mb-2">Plăți internaționale</h3>
            <p className="text-muted-foreground text-sm">
              Acceptă plăți în peste 135 de valute diferite din întreaga lume, cu conversie automată.
            </p>
          </div>
        </StyledCard>
        
        <StyledCard className="p-6">
          <div className="flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <BarChart className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-medium mb-2">Dashboard dedicat</h3>
            <p className="text-muted-foreground text-sm">
              Accesează dashboard-ul Stripe pentru rapoarte detaliate și gestionarea completă a plăților tale.
            </p>
          </div>
        </StyledCard>
      </div>
    </div>
  );
};
