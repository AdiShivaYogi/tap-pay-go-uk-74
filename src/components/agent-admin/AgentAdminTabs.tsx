
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SubmissionsTab } from "./SubmissionsTab";
import { CodeProposalsTab } from "./CodeProposalsTab";
import { HistoryTab } from "./HistoryTab";
import { ApiUsageStats } from "./ApiUsageStats";
import { useAgentGodMode } from "@/hooks/agent-god-mode";
import { useSubmissionHandlers } from "./handlers/submission-handlers";
import { useCodeProposalHandlers } from "./handlers/code-proposal-handlers";
import { AgentGodMode } from "./AgentGodMode";

interface AgentAdminTabsProps {
  submissions: any[];
  codeProposals: any[];
  progressHistory: any[];
  userId: string | undefined;
  setSubmissions: (submissions: any[]) => void;
  setCodeProposals: (codeProposals: any[]) => void;
  loading?: boolean;
}

export const AgentAdminTabs = ({ 
  submissions, 
  codeProposals, 
  progressHistory,
  userId,
  setSubmissions,
  setCodeProposals,
  loading = false
}: AgentAdminTabsProps) => {
  const { handleApproveSubmission, handleRejectSubmission } = useSubmissionHandlers({ 
    submissions, 
    setSubmissions 
  });
  
  const { handleApproveProposal, handleRejectProposal } = useCodeProposalHandlers({ 
    proposals: codeProposals, 
    setProposals: setCodeProposals 
  });

  const { 
    isGodModeEnabled,
    isProcessing,
    isGeneratingFeedback,
    currentSubmission,
    currentProposal,
    feedback,
    feedbackType,
    toggleGodMode,
    generateFeedback,
    submitFeedback,
    cancelFeedback,
    setFeedback
  } = useAgentGodMode({ userId });

  return (
    <>
      <AgentGodMode 
        userId={userId} 
      />
      
      <Tabs defaultValue="submissions" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="submissions">
            Propuneri task-uri ({submissions.length})
          </TabsTrigger>
          <TabsTrigger value="code">
            Propuneri cod ({codeProposals.length})
          </TabsTrigger>
          <TabsTrigger value="history">
            Istoric activități
          </TabsTrigger>
          <TabsTrigger value="api-usage">
            Utilizare API
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="submissions">
          <SubmissionsTab 
            submissions={submissions} 
            onApproveSubmission={handleApproveSubmission} 
            onRejectSubmission={handleRejectSubmission}
            onGenerateFeedback={generateFeedback}
            loading={loading}
          />
        </TabsContent>
        
        <TabsContent value="code">
          <CodeProposalsTab 
            proposals={codeProposals} 
            onApproveProposal={handleApproveProposal} 
            onRejectProposal={handleRejectProposal}
            onGenerateFeedback={generateFeedback}
            loading={loading}
          />
        </TabsContent>
        
        <TabsContent value="history">
          <HistoryTab progressHistory={progressHistory} loading={loading} />
        </TabsContent>
        
        <TabsContent value="api-usage">
          <ApiUsageStats />
        </TabsContent>
      </Tabs>
    </>
  );
};
