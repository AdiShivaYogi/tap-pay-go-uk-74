
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, InfoIcon } from "lucide-react";
import { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface PricingPlan {
  name: string;
  id: string;
  description: string;
  price: string;
  period?: string;
  features: string[];
  cta: string;
  popular: boolean;
  icon: LucideIcon;
  breakEvenInfo?: string;
}

interface PricingCardProps {
  plan: PricingPlan;
}

export const PricingCard = ({ plan }: PricingCardProps) => {
  const navigate = useNavigate();

  const handleSelectPlan = (planId: string) => {
    navigate(`/onboarding?plan=${planId}`);
  };

  return (
    <Card className={`flex flex-col transform transition-all duration-300 hover:scale-105 ${
      plan.popular ? 'border-primary shadow-lg relative overflow-hidden' : ''
    }`}>
      {plan.popular && (
        <>
          <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 rounded-bl-lg text-sm font-medium">
            Popular
          </div>
          <div className="absolute -inset-[1px] rounded-lg bg-gradient-to-r from-primary/50 via-primary to-primary/50 opacity-20 blur-lg -z-10" />
        </>
      )}
      <CardHeader>
        <div className="flex items-center gap-2 mb-4">
          <plan.icon className="h-6 w-6 text-primary" />
          <CardTitle>{plan.name}</CardTitle>
        </div>
        <CardDescription>{plan.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="mb-6">
          <span className="text-3xl font-bold">{plan.price}</span>
          {plan.period && (
            <span className="text-sm text-muted-foreground"> {plan.period}</span>
          )}
        </div>
        
        {plan.breakEvenInfo && (
          <div className="mb-4 flex items-center text-xs text-muted-foreground">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1 bg-muted px-2 py-1 rounded-full">
                    <InfoIcon className="h-3 w-3" />
                    <span>{plan.breakEvenInfo}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Calculul estimat de rentabilitate bazat pe volumul tranzacțiilor.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
        
        <ul className="space-y-3">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-start">
              <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          variant={plan.popular ? "default" : "outline"}
          onClick={() => handleSelectPlan(plan.id)}
        >
          {plan.cta}
        </Button>
      </CardFooter>
    </Card>
  );
};
