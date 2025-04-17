
import React from 'react';
import { Layout } from "@/components/layout/layout";
import { HeroSection } from "@/components/home/HeroSection";
import { FeatureGrid } from "@/components/home/FeatureGrid";
import { StatsSection } from "@/components/home/StatsSection";
import { BetaTestingSection } from "@/components/home/BetaTestingSection";
import { TrustSection } from "@/components/home/TrustSection";
import { Section } from "@/components/ui/themed-components";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

const Index = () => {
  const { toast } = useToast();
  
  // Afișăm un mesaj de bun venit pentru utilizatorii noi
  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    if (!hasSeenWelcome) {
      toast({
        title: "Bun venit pe TapPayGo!",
        description: "Transformă-ți telefonul într-un terminal de plată în câteva minute.",
        duration: 6000,
      });
      localStorage.setItem('hasSeenWelcome', 'true');
    }
  }, [toast]);

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
      
      <Toaster />
    </Layout>
  );
};

export default Index;
