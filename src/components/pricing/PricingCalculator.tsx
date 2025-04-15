
import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Calculator } from "lucide-react";
import { pricingPlans } from "@/config/pricing";
import { Heading3 } from "@/components/ui/themed-components";

export const PricingCalculator = () => {
  const [monthlyTransactions, setMonthlyTransactions] = useState<number>(100);
  const [averageAmount, setAverageAmount] = useState<number>(50);

  const calculations = useMemo(() => {
    const payAsYouGoCommission = 0.01 * averageAmount * monthlyTransactions + 0.20 * monthlyTransactions; 
    const monthlyPlanCommission = 0.007 * averageAmount * monthlyTransactions + 0.15 * monthlyTransactions;
    const monthlyPlanTotal = monthlyPlanCommission + 14.99;
    const lifetimePlanCommission = 0.005 * averageAmount * monthlyTransactions + 0.10 * monthlyTransactions;
    
    return {
      payAsYouGoCost: payAsYouGoCommission.toFixed(2),
      monthlyPlanCost: monthlyPlanTotal.toFixed(2),
      lifetimePlanCost: lifetimePlanCommission.toFixed(2),
      monthlyBreakEvenTransactions: Math.ceil(14.99 / (0.003 * averageAmount + 0.05)),
      lifetimeBreakEvenMonths: Math.ceil(1840 / (monthlyPlanTotal - lifetimePlanCommission))
    };
  }, [monthlyTransactions, averageAmount]);

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
      </CardContent>
    </Card>
  );
};
