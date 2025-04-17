
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
import { UnifiedMonitoringTabs } from "@/components/agents/unified-monitoring/UnifiedMonitoringTabs";
import { useAgentAdminData } from "@/hooks/use-agent-admin-data";
import { useSubmissionHandlers } from "@/components/agent-admin/handlers/submission-handlers";
import { useCodeProposalHandlers } from "@/components/agent-admin/handlers/code-proposal-handlers";

interface BaseMonitoringPageProps {
  tabs?: 'default' | 'unified';
  title?: string;
}

export const BaseMonitoringPage: React.FC<BaseMonitoringPageProps> = ({ 
  tabs = 'default', 
  title = "Monitorizare Agenți" 
}) => {
  const { user } = useAuth();
  const { isAdmin } = useUserRole();
  const { toast } = useToast();
  const [showAutonomyAlert, setShowAutonomyAlert] = useState(true);
  const { autonomyLevel, agentsRunning } = useSafetyPanel();
  const { submissions, progressHistory, codeProposals, loading } = useAgentAdminData(!!isAdmin);
  const [submissionsState, setSubmissionsState] = useState<any[]>([]);
  const [codeProposalsState, setCodeProposalsState] = useState<any[]>([]);

  const { handleApproveSubmission, handleRejectSubmission } = useSubmissionHandlers({ 
    submissions: submissionsState, 
    setSubmissions: setSubmissionsState 
  });
  
  const { handleApproveProposal, handleRejectProposal } = useCodeProposalHandlers({ 
    proposals: codeProposalsState, 
    setProposals: setCodeProposalsState 
  });

  // When data is loaded from the hook, update our state
  useEffect(() => {
    if (!loading) {
      setSubmissionsState(submissions);
      setCodeProposalsState(codeProposals);
    }
  }, [submissions, codeProposals, loading]);

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
        <MonitoringHeader agentsRunning={agentsRunning} />

        <AutonomyAlert 
          showAutonomyAlert={showAutonomyAlert} 
          setShowAutonomyAlert={setShowAutonomyAlert} 
        />

        <AutonomyOverviewSection 
          autonomyLevel={autonomyLevel}
          agentsRunning={agentsRunning}
        />
        
        {tabs === 'default' ? (
          <MonitoringTabs />
        ) : (
          <UnifiedMonitoringTabs 
            submissions={submissionsState}
            codeProposals={codeProposalsState}
            progressHistory={progressHistory}
            userId={user?.id}
            setSubmissions={setSubmissionsState}
            setCodeProposals={setCodeProposalsState}
            loading={loading}
            onApproveSubmission={handleApproveSubmission}
            onRejectSubmission={handleRejectSubmission}
            onApproveProposal={handleApproveProposal}
            onRejectProposal={handleRejectProposal}
          />
        )}
      </Section>
    </Layout>
  );
};

