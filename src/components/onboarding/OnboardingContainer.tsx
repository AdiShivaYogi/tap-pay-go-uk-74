
import { Layout } from "@/components/layout/layout";
import { CreditCard } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { SectionContainer } from "@/components/ui/section-container";
import { StyledCard } from "@/components/ui/styled-card";
import { OnboardingSteps } from "./OnboardingSteps";
import { OnboardingSecurityInfo } from "./OnboardingSecurityInfo";
import { UKComplianceAlert } from "./UKComplianceAlert";

export const OnboardingContainer = () => {
  return (
    <Layout>
      <SectionContainer>
        <PageHeader
          icon={CreditCard}
          title="Onboarding TapPayGo"
          description="Configurează rapid aplicația pentru a începe să procesezi plăți în UK"
        />
        
        <div className="space-y-6 max-w-2xl mx-auto">
          <UKComplianceAlert />
          
          <StyledCard className="border-primary/10">
            <div className="p-6">
              <OnboardingSteps />
            </div>
          </StyledCard>
          
          <OnboardingSecurityInfo />
        </div>
      </SectionContainer>
    </Layout>
  );
};
