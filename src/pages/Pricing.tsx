
import { Layout } from "@/components/layout/layout";
import { PricingCard } from "@/components/pricing/PricingCard";
import { PricingFAQ } from "@/components/pricing/PricingFAQ";
import { IncludedFeatures } from "@/components/pricing/IncludedFeatures";
import { PricingCalculator } from "@/components/pricing/PricingCalculator";
import { Separator } from "@/components/ui/separator";
import { pricingPlans, pricingFAQs } from "@/config/pricing";
import { Section, PageHeader, Grid3Cols } from "@/components/ui/themed-components";

const PricingPage = () => {
  const standardPlans = pricingPlans;
  
  return (
    <Layout>
      <Section>
        <PageHeader
          title="Prețuri Simple și Transparente"
          description="Alegeți planul care se potrivește nevoilor afacerii dvs. Fără taxe ascunse."
        />

        <Grid3Cols className="max-w-5xl mx-auto">
          {standardPlans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </Grid3Cols>
        
        <PricingCalculator />

        <PricingFAQ faqs={pricingFAQs} />
        <IncludedFeatures />
      </Section>
    </Layout>
  );
};

export default PricingPage;
