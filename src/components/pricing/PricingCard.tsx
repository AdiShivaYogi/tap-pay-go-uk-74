
import { Button } from "@/components/ui/button";
import { Check, InfoIcon } from "lucide-react";
import { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { StyledCard, StyledCardHeader, StyledCardContent, StyledCardTitle, StyledCardDescription, StyledCardFooter } from "@/components/ui/cards";

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
  isApiPlan?: boolean;
}

interface PricingCardProps {
  plan: PricingPlan;
}

export const PricingCard = ({ plan }: PricingCardProps) => {
  const navigate = useNavigate();

  const handleSelectPlan = (planId: string) => {
    if (plan.isApiPlan) {
      navigate('/status');
    } else {
      navigate(`/onboarding?plan=${planId}`);
    }
  };

  return (
    <StyledCard
      variant="pricing"
      gradient={plan.popular}
      icon={plan.icon}
      iconClassName={plan.isApiPlan ? "text-indigo-500" : "text-primary"}
      className={plan.isApiPlan ? 'border-indigo-400/30 bg-indigo-50/10' : ''}
    >
      {plan.popular && (
        <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 rounded-bl-lg text-sm font-medium">
          Popular
        </div>
      )}
      {plan.isApiPlan && (
        <div className="absolute top-0 right-0 bg-indigo-500 text-white px-4 py-1 rounded-bl-lg text-sm font-medium">
          Enterprise
        </div>
      )}
      
      <StyledCardHeader>
        <div className="flex items-center gap-2 mb-4">
          <plan.icon className={`h-6 w-6 ${plan.isApiPlan ? "text-indigo-500" : "text-primary"}`} />
          <StyledCardTitle>{plan.name}</StyledCardTitle>
        </div>
        <StyledCardDescription>{plan.description}</StyledCardDescription>
      </StyledCardHeader>
      
      <StyledCardContent className="flex-1">
        <div className="mb-6">
          <span className="text-3xl font-bold">{plan.price}</span>
          {plan.period && (
            <span className="text-sm text-muted-foreground"> {plan.period}</span>
          )}
        </div>
        
        {plan.isApiPlan && (
          <Badge variant="outline" className="mb-4 border-indigo-200 text-indigo-700 bg-indigo-50">
            Serviciu High-Ticket
          </Badge>
        )}
        
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
              <Check className={`h-5 w-5 ${plan.isApiPlan ? "text-indigo-500" : "text-primary"} shrink-0 mr-2`} />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </StyledCardContent>
      
      <StyledCardFooter>
        <Button 
          className="w-full" 
          variant={plan.isApiPlan ? "outline" : (plan.popular ? "default" : "outline")}
          onClick={() => handleSelectPlan(plan.id)}
          style={plan.isApiPlan ? { borderColor: 'rgb(129, 140, 248, 0.5)', color: 'rgb(79, 70, 229)' } : {}}
        >
          {plan.cta}
        </Button>
      </StyledCardFooter>
    </StyledCard>
  );
};
