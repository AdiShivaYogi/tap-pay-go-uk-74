
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
import { Calculator, Zap } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { pricingPlans } from "@/config/pricing";
import { useToast } from "@/hooks/use-toast";

export const PricingCalculator = () => {
  const [monthlyTransactions, setMonthlyTransactions] = useState<number>(100);
  const [averageAmount, setAverageAmount] = useState<number>(50);
  const [monthlyApiRequests, setMonthlyApiRequests] = useState<number>(5000);
  const { toast } = useToast();

  const calculations = useMemo(() => {
    // Comisioane pentru planurile standard
    const payAsYouGoCommission = 0.01 * averageAmount * monthlyTransactions + 0.20 * monthlyTransactions; 
    const monthlyPlanCommission = 0.007 * averageAmount * monthlyTransactions + 0.15 * monthlyTransactions;
    const monthlyPlanTotal = monthlyPlanCommission + 14.99;
    const lifetimePlanCommission = 0.005 * averageAmount * monthlyTransactions + 0.10 * monthlyTransactions;
    
    // Calcularea costurilor API
    const baseApiCost = 149.99; // cost lunar bază
    const extraApiRequests = Math.max(0, monthlyApiRequests - 10000); // requests peste limita de 10000
    const extraApiCost = extraApiRequests * 0.01; // £0.01 per request extra
    const totalApiCost = baseApiCost + extraApiCost;
    
    // Cost per request
    const costPerRequest = totalApiCost / monthlyApiRequests;
    
    // Calcularea pragurilor de rentabilitate
    const monthlyBreakEvenTransactions = Math.ceil(14.99 / (0.003 * averageAmount + 0.05));
    const lifetimeBreakEvenMonths = Math.ceil(1840 / (monthlyPlanTotal - lifetimePlanCommission));
    const apiBreakEvenRequests = 10000; // punctul de rentabilitate pentru API

    return {
      payAsYouGoCost: payAsYouGoCommission.toFixed(2),
      monthlyPlanCost: monthlyPlanTotal.toFixed(2),
      lifetimePlanCost: lifetimePlanCommission.toFixed(2),
      apiTotalCost: totalApiCost.toFixed(2),
      costPerApiRequest: costPerRequest.toFixed(4),
      monthlyBreakEvenTransactions,
      lifetimeBreakEvenMonths,
      apiBreakEvenRequests
    };
  }, [monthlyTransactions, averageAmount, monthlyApiRequests]);

  const showRecommendation = () => {
    const planName = pricingPlans.find(plan => plan.id === "api-enterprise")?.name;
    
    toast({
      title: "Recomandare Plan API Enterprise",
      description: `Cu ${monthlyApiRequests} request-uri API lunar, costul per request este £${calculations.costPerApiRequest}. Planul ${planName} include 10,000 request-uri în prețul de bază.`,
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
        <Tabs defaultValue="standard">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="standard">Plăți Standard</TabsTrigger>
            <TabsTrigger value="api">Serviciu API</TabsTrigger>
          </TabsList>

          <TabsContent value="standard" className="space-y-6">
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
          </TabsContent>

          <TabsContent value="api" className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="h-5 w-5 text-primary" />
              <span className="font-medium">Calcul costuri API Enterprise</span>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Număr request-uri API lunar:</span>
                <span className="font-semibold">{monthlyApiRequests}</span>
              </div>
              <Slider 
                value={[monthlyApiRequests]} 
                min={1000} 
                max={50000}
                step={1000}
                onValueChange={(values) => setMonthlyApiRequests(values[0])}
                className="my-4"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div className="p-4 border rounded-lg">
                <div className="text-sm text-muted-foreground">Cost Total API</div>
                <div className="text-lg font-bold">£{calculations.apiTotalCost}</div>
                <div className="text-xs text-muted-foreground">Costuri lunare totale</div>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="text-sm text-muted-foreground">Cost per Request</div>
                <div className="text-lg font-bold">£{calculations.costPerApiRequest}</div>
                <div className="text-xs text-muted-foreground">Cost mediu per request API</div>
              </div>
            </div>

            <div className="mt-6 space-y-3 pt-4 border-t">
              <div className="flex items-center gap-2">
                <Badge variant="outline">Info</Badge>
                <span className="text-sm">Primele {calculations.apiBreakEvenRequests} request-uri sunt incluse în prețul de bază.</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">Info</Badge>
                <span className="text-sm">Pentru request-uri suplimentare se aplică taxa de £0.01 per request.</span>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div 
          className="mt-4 text-center p-3 bg-muted/50 rounded-md cursor-pointer hover:bg-muted transition-colors"
          onClick={showRecommendation}
        >
          <span className="text-sm font-medium">Click pentru recomandare personalizată</span>
        </div>
      </CardContent>
    </Card>
  );
};

