
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
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mb-6">
            <CreditCard className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-center text-primary mb-2">Conectează-te cu Stripe</h1>
          <p className="text-lg text-muted-foreground text-center max-w-2xl">
            Acceptă plăți contactless cu telefonul tău în câțiva pași simpli
          </p>
        </div>
        
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
