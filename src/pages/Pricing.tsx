
import { Layout } from "@/components/layout/layout";
import { PricingCard } from "@/components/pricing/PricingCard";
import { PricingFAQ } from "@/components/pricing/PricingFAQ";
import { IncludedFeatures } from "@/components/pricing/IncludedFeatures";
import { PricingCalculator } from "@/components/pricing/PricingCalculator";
import { Separator } from "@/components/ui/separator";
import { pricingPlans, pricingFAQs } from "@/config/pricing";
import { Button } from "@/components/ui/button";
import { Code, ArrowRight } from "lucide-react";

const PricingPage = () => {
  const standardPlans = pricingPlans.filter(plan => !plan.isApiPlan);
  const apiPlans = pricingPlans.filter(plan => plan.isApiPlan);
  
  return (
    <Layout>
      <div className="container py-12 px-4">
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Prețuri Simple și Transparente
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Alegeți planul care se potrivește nevoilor afacerii dvs. Fără taxe ascunse.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {standardPlans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </div>
        
        <PricingCalculator />

        {apiPlans.length > 0 && (
          <div className="mt-24 mb-8">
            <div className="flex flex-col items-center justify-center space-y-4 mb-12">
              <div className="bg-primary/10 p-3 rounded-full">
                <Code className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-center">API Enterprise</h2>
              <p className="text-xl text-muted-foreground text-center max-w-2xl">
                Serviciu premium pentru integrarea programatică cu platforma noastră
              </p>
              <Separator className="my-4 w-24" />
            </div>
            
            <div className="max-w-4xl mx-auto">
              {apiPlans.map((plan) => (
                <PricingCard key={plan.name} plan={plan} />
              ))}
              
              <div className="mt-10 bg-muted/50 rounded-lg p-8 border border-muted">
                <h3 className="text-xl font-bold mb-4">De ce să alegeți serviciul nostru API?</h3>
                <ul className="space-y-3">
                  <li className="flex gap-2 items-start">
                    <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Integrare completă și facilă cu sistemele proprii prin API-ul nostru bine documentat</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Acces la date și funcționalități în timp real prin request-uri API securizate</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Suport tehnic dedicat și consultanță pentru integrările avansate</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Soluții personalizate pentru afaceri cu nevoi specifice și volume mari</span>
                  </li>
                </ul>
                
                <div className="mt-8 flex justify-center">
                  <Button size="lg" className="gap-2">
                    Solicită o demonstrație API
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        <PricingFAQ faqs={pricingFAQs} />
        <IncludedFeatures />
      </div>
    </Layout>
  );
};

export default PricingPage;
