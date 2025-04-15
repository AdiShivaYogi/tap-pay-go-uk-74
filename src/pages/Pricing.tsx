
import { Layout } from "@/components/layout/layout";
import { PricingCard } from "@/components/pricing/PricingCard";
import { PricingFAQ } from "@/components/pricing/PricingFAQ";
import { IncludedFeatures } from "@/components/pricing/IncludedFeatures";
import { PricingCalculator } from "@/components/pricing/PricingCalculator";
import { pricingPlans, pricingFAQs } from "@/config/pricing";

const PricingPage = () => {
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
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </div>
        
        <PricingCalculator />

        <PricingFAQ faqs={pricingFAQs} />
        <IncludedFeatures />
      </div>
    </Layout>
  );
};

export default PricingPage;
