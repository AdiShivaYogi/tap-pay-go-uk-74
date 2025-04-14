
import React from 'react';
import { Layout } from "@/components/layout/layout";
import { HeroSection } from "@/components/home/HeroSection";
import { FeatureGrid } from "@/components/home/FeatureGrid";
import { StatsSection } from "@/components/home/StatsSection";
import { BetaTestingSection } from "@/components/home/BetaTestingSection";
import { TrustSection } from "@/components/home/TrustSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeatureGrid />
      <StatsSection />
      <BetaTestingSection />
      <TrustSection />
    </Layout>
  );
};

export default Index;
