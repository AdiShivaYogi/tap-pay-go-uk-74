
import React from 'react';
import { Layout } from "@/components/layout/layout";
import { HeroSection } from "@/components/home/HeroSection";
import { FeatureGrid } from "@/components/home/FeatureGrid";
import { StatsSection } from "@/components/home/StatsSection";
import { BetaTestingSection } from "@/components/home/BetaTestingSection";
import { TrustSection } from "@/components/home/TrustSection";
import { Section } from "@/components/ui/themed-components";

const Index = () => {
  return (
    <Layout>
      <Section variant="default" container={false}>
        <HeroSection />
      </Section>
      
      <Section variant="alt">
        <FeatureGrid />
      </Section>
      
      <Section>
        <StatsSection />
      </Section>
      
      <Section variant="alt">
        <BetaTestingSection />
      </Section>
      
      <Section>
        <TrustSection />
      </Section>
    </Layout>
  );
};

export default Index;
