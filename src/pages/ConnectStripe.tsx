
import { Layout } from "@/components/layout/layout";
import { CreditCard } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { SectionContainer } from "@/components/ui/section-container";
import { StyledCard } from "@/components/ui/card-variants";
import { ConnectStripeSteps } from "@/components/stripe/ConnectStripeSteps";
import { StripeFeatureCards } from "@/components/stripe/StripeFeatureCards";
import { StripeFAQ } from "@/components/stripe/StripeFAQ";
import { StripeInfoAlert } from "@/components/stripe/StripeInfoAlert";

const ConnectStripe = () => {
  return (
    <Layout>
      <SectionContainer>
        <PageHeader
          icon={CreditCard}
          title="Conectare Stripe"
          description="Configurează integrarea cu Stripe pentru procesarea plăților"
        />
        
        <div className="space-y-6">
          <StyledCard className="border-primary/10">
            <div className="p-6">
              <StripeInfoAlert />
              <ConnectStripeSteps />
            </div>
          </StyledCard>
          
          <StripeFeatureCards />
          <StripeFAQ />
        </div>
      </SectionContainer>
    </Layout>
  );
};

export default ConnectStripe;
