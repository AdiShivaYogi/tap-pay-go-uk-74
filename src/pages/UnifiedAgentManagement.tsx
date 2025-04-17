
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
import { AgentApiKeyDialog } from "@/components/agents/AgentApiKeyDialog";
import { OpenRouterApiKeyDialog } from "@/components/agents/OpenRouterApiKeyDialog";
import { useAgentAdminData } from "@/hooks/use-agent-admin-data";
import { useSubmissionHandlers } from "@/components/agent-admin/handlers/submission-handlers";
import { useCodeProposalHandlers } from "@/components/agent-admin/handlers/code-proposal-handlers";

const UnifiedAgentManagement = () => {
  const { user } = useAuth();
  const { isAdmin } = useUserRole();
  const { toast } = useToast();
  const [showAutonomyAlert, setShowAutonomyAlert] = useState(true);
  const { autonomyLevel, agentsRunning } = useSafetyPanel();
  const { submissions, progressHistory, codeProposals, loading } = useAgentAdminData(!!isAdmin);
  const [submissionsState, setSubmissionsState] = useState<any[]>([]);
  const [codeProposalsState, setCodeProposalsState] = useState<any[]>([]);

  // Inițializăm handlerii pentru propuneri și cod
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
        {/* Header section */}
        <MonitoringHeader agentsRunning={agentsRunning} />

        {/* API Keys */}
        <div className="flex flex-wrap gap-3 mb-4">
          <AgentApiKeyDialog />
          <OpenRouterApiKeyDialog />
        </div>

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
        
        {/* Unified tabs with all monitoring and admin content */}
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
      </Section>
    </Layout>
  );
};

export default UnifiedAgentManagement;
