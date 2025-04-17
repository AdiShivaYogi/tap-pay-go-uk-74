
import React, { useState, useEffect } from "react";
import { Layout } from "@/components/layout/layout";
import { Section } from "@/components/ui/layout/section";
import { useAuth } from "@/hooks/use-auth";
import { useUserRole } from "@/hooks/use-user-role";
import { AccessRestrictionAlert } from "@/features/roadmap/components/AccessRestrictionAlert";
import { useToast } from "@/hooks/use-toast";
import { useSafetyPanel } from "@/components/agents/monitoring/safety/hooks/useSafetyPanel";
import { MonitoringHeader } from "@/components/agents/monitoring/MonitoringHeader";
import { AutonomyAlert } from "@/components/agents/monitoring/AutonomyAlert";
import { AutonomyOverviewSection } from "@/components/agents/monitoring/AutonomyOverviewSection";
import { MonitoringTabs } from "@/components/agents/monitoring/MonitoringTabs";

const AgentMonitoring = () => {
  const { user } = useAuth();
  const { isAdmin } = useUserRole();
  const { toast } = useToast();
  const [showAutonomyAlert, setShowAutonomyAlert] = useState(true);
  const { autonomyLevel, agentsRunning } = useSafetyPanel();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      toast({
        title: "Lansare automată inițiată pentru toți agenții",
        description: "Toți agenții autonomi vor fi lansați automat în câteva secunde pentru operațiuni complete.",
        duration: 6000,
      });
    }, 500);
    
    return () => clearTimeout(timer);
  }, [toast]);

  if (!user) {
    return (
      <Layout>
        <Section>
          <AccessRestrictionAlert role="vizitator" />
        </Section>
      </Layout>
    );
  }

  if (!isAdmin) {
    return (
      <Layout>
        <Section>
          <AccessRestrictionAlert role="admin" />
        </Section>
      </Layout>
    );
  }

  return (
    <Layout>
      <Section>
        {/* Header section */}
        <MonitoringHeader agentsRunning={agentsRunning} />

        {/* Autonomy alert */}
        <AutonomyAlert 
          showAutonomyAlert={showAutonomyAlert} 
          setShowAutonomyAlert={setShowAutonomyAlert} 
        />

        {/* Autonomy overview section */}
        <AutonomyOverviewSection 
          autonomyLevel={autonomyLevel}
          agentsRunning={agentsRunning}
        />
        
        {/* Tabs with all monitoring content */}
        <MonitoringTabs />
      </Section>
    </Layout>
  );
};

export default AgentMonitoring;
