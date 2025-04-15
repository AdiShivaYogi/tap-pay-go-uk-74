
import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Calculator } from "lucide-react";
import { pricingPlans } from "@/config/pricing";
import { useToast } from "@/hooks/use-toast";

export const PricingCalculator = () => {
  const [monthlyTransactions, setMonthlyTransactions] = useState<number>(100);
  const [averageAmount, setAverageAmount] = useState<number>(50);
  const { toast } = useToast();

  const calculations = useMemo(() => {
    // Comisioane pentru fiecare plan
    const payAsYouGoCommission = 0.01 * averageAmount * monthlyTransactions + 0.20 * monthlyTransactions; 
    const monthlyPlanCommission = 0.007 * averageAmount * monthlyTransactions + 0.15 * monthlyTransactions;
    const monthlyPlanTotal = monthlyPlanCommission + 14.99;
    const lifetimePlanCommission = 0.005 * averageAmount * monthlyTransactions + 0.10 * monthlyTransactions;
    
    // Calcularea pragurilor de rentabilitate
    const monthlyBreakEvenTransactions = Math.ceil(14.99 / (0.003 * averageAmount + 0.05));
    const lifetimeBreakEvenMonths = Math.ceil(1840 / (monthlyPlanTotal - lifetimePlanCommission));

    // Planul recomandat în funcție de volumul actual
    let recommendedPlan = "pay-as-you-go";
    
    if (monthlyTransactions > monthlyBreakEvenTransactions) {
      recommendedPlan = "monthly";
      
      // Verificăm dacă utilizarea preconizată pe 24 de luni justifică planul Lifetime
      if (monthlyTransactions * averageAmount > 5000 && lifetimeBreakEvenMonths < 24) {
        recommendedPlan = "lifetime";
      }
    }

    return {
      payAsYouGoCost: payAsYouGoCommission.toFixed(2),
      monthlyPlanCost: monthlyPlanTotal.toFixed(2),
      lifetimePlanCost: lifetimePlanCommission.toFixed(2),
      monthlyBreakEvenTransactions,
      lifetimeBreakEvenMonths,
      recommendedPlan
    };
  }, [monthlyTransactions, averageAmount]);

  const showRecommendation = () => {
    const planName = pricingPlans.find(plan => plan.id === calculations.recommendedPlan)?.name;
    
    toast({
      title: "Planul recomandat pentru tine",
      description: `Bazat pe ${monthlyTransactions} tranzacții lunare cu valoare medie de £${averageAmount}, planul ${planName} este cel mai avantajos.`,
      duration: 5000,
    });
  };

  return (
    <Card className="mt-12 max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          <CardTitle>Calculator Economii</CardTitle>
        </div>
        <CardDescription>
          Descoperă care plan este optim pentru nevoile tale
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Număr tranzacții lunar:</span>
            <span className="font-semibold">{monthlyTransactions}</span>
          </div>
          <Slider 
            value={[monthlyTransactions]} 
            min={10} 
            max={1000}
            step={10}
            onValueChange={(values) => setMonthlyTransactions(values[0])}
            className="my-4"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Valoare medie tranzacție (£):</span>
            <span className="font-semibold">{averageAmount}</span>
          </div>
          <Slider 
            value={[averageAmount]} 
            min={5} 
            max={200}
            step={5}
            onValueChange={(values) => setAverageAmount(values[0])}
            className="my-4"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="p-4 border rounded-lg">
            <div className="text-sm text-muted-foreground">Pay-as-you-go</div>
            <div className="text-lg font-bold">£{calculations.payAsYouGoCost}</div>
            <div className="text-xs text-muted-foreground">Costuri lunare totale</div>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="text-sm text-muted-foreground">Monthly</div>
            <div className="text-lg font-bold">£{calculations.monthlyPlanCost}</div>
            <div className="text-xs text-muted-foreground">Costuri lunare totale</div>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="text-sm text-muted-foreground">Lifetime</div>
            <div className="text-lg font-bold">£{calculations.lifetimePlanCost}</div>
            <div className="text-xs text-muted-foreground">Costuri lunare (după plata inițială)</div>
          </div>
        </div>

        <div className="mt-6 space-y-3 pt-4 border-t">
          <div>
            <span className="font-medium">Praguri de rentabilitate:</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">Info</Badge>
            <span className="text-sm">Planul Monthly devine mai avantajos decât Pay-as-you-go la peste <strong>{calculations.monthlyBreakEvenTransactions}</strong> tranzacții lunare.</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">Info</Badge>
            <span className="text-sm">Planul Lifetime se amortizează în <strong>{calculations.lifetimeBreakEvenMonths}</strong> luni comparativ cu planul Monthly.</span>
          </div>
          <div 
            className="mt-4 text-center p-3 bg-muted/50 rounded-md cursor-pointer hover:bg-muted transition-colors"
            onClick={showRecommendation}
          >
            <span className="text-sm font-medium">Pentru tine recomandăm: <span className="text-primary">
              {pricingPlans.find(plan => plan.id === calculations.recommendedPlan)?.name}
            </span></span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
