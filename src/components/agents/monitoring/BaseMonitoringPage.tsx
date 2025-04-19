
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
import { MonitoringTabs } from "@/components/agents/monitoring/MonitoringTabs";

interface BaseMonitoringPageProps {
  tabs?: 'default' | 'unified';
  title?: string;
  isEmbedded?: boolean;
}

export const BaseMonitoringPage: React.FC<BaseMonitoringPageProps> = ({ 
  tabs = 'default', 
  title = "Monitorizare Agenți",
  isEmbedded = false
}) => {
  const { user } = useAuth();
  const { isAdmin } = useUserRole();
  const { toast } = useToast();
  const [showAutonomyAlert, setShowAutonomyAlert] = useState(true);
  
  // Safe type conversion
  const safetyPanelData = useSafetyPanel();
  const autonomyLevel: number = typeof safetyPanelData.autonomyLevel === 'number' 
    ? safetyPanelData.autonomyLevel : 0;
    
  const agentsRunning: number = typeof safetyPanelData.agentsRunning === 'number'
    ? safetyPanelData.agentsRunning : 0;
  
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

  useEffect(() => {
    if (!loading) {
      setSubmissionsState(submissions);
      setCodeProposalsState(codeProposals);
    }
  }, [submissions, codeProposals, loading]);

  // Only show the toast when not embedded in another page
  useEffect(() => {
    if (!isEmbedded) {
      const timer = setTimeout(() => {
        toast({
          title: "Lansare automată inițiată pentru toți agenții",
          description: "Toți agenții autonomi vor fi lansați automat în câteva secunde pentru operațiuni complete.",
          duration: 6000,
        });
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [toast, isEmbedded]);

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

  // When used inside UnifiedAgentManagement, render without the outer Layout and Section
  const content = (
    <>
      {!isEmbedded && <MonitoringHeader agentsRunning={agentsRunning} />}

      {showAutonomyAlert && !isEmbedded && (
        <AutonomyAlert 
          showAutonomyAlert={showAutonomyAlert} 
          setShowAutonomyAlert={setShowAutonomyAlert} 
        />
      )}

      {!isEmbedded && (
        <AutonomyOverviewSection 
          autonomyLevel={autonomyLevel}
          agentsRunning={agentsRunning}
        />
      )}
      
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
    </>
  );

  if (isEmbedded) {
    return content;
  }

  return (
    <Layout>
      <Section>
        {content}
      </Section>
    </Layout>
  );
};
