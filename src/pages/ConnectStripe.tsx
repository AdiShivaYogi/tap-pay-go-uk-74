
import { Layout } from "@/components/layout/layout";
import { Section, PageHeader } from "@/components/ui/themed-components";
import { ConnectStripeSteps } from "@/components/stripe/ConnectStripeSteps";
import { StripeInfoAlert } from "@/components/stripe/StripeInfoAlert";
import { StripeFAQ } from "@/components/stripe/StripeFAQ";
import { StripeFeatureCards } from "@/components/stripe/StripeFeatureCards";
import { CreditCard } from "lucide-react";

const ConnectStripe = () => {
  return (
    <Layout>
      <Section variant="default">
        <PageHeader
          icon={CreditCard}
          title="Conectează-te cu Stripe"
          description="Acceptă plăți contactless cu telefonul tău în câțiva pași simpli"
        />
        
        <div className="mb-8">
          <StripeInfoAlert />
        </div>
        
        <div className="max-w-3xl mx-auto mb-12">
          <ConnectStripeSteps />
        </div>
        
        <Section variant="alt">
          <StripeFeatureCards />
        </Section>
        
        <Section>
          <StripeFAQ />
        </Section>
      </Section>
    </Layout>
  );
};

export default ConnectStripe;
