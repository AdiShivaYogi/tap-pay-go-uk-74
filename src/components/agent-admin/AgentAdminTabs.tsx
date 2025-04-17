
import React, { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SubmissionsTab } from "./SubmissionsTab";
import { CodeProposalsTab } from "./CodeProposalsTab";
import { HistoryTab } from "./HistoryTab";
import { ApiUsageStats } from "./ApiUsageStats";
import { useAgentGodMode } from "@/hooks/agent-god-mode";
import { useSubmissionHandlers } from "./handlers/submission-handlers";
import { useCodeProposalHandlers } from "./handlers/code-proposal-handlers";
import { AgentGodMode } from "./AgentGodMode";
import { useToast } from "@/hooks/use-toast";
import { FeedbackItem } from "@/hooks/agent-god-mode/types";

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
  const { toast } = useToast();
  const { handleApproveSubmission, handleRejectSubmission } = useSubmissionHandlers({ 
    submissions, 
    setSubmissions 
  });
  
  const { handleApproveProposal, handleRejectProposal } = useCodeProposalHandlers({ 
    proposals: codeProposals, 
    setProposals: setCodeProposals 
  });

  const { 
    isGeneratingFeedback,
    generateFeedback,
  } = useAgentGodMode({ userId });
  
  // Notificare despre numărul de propuneri
  useEffect(() => {
    if (!loading && (submissions.length > 0 || codeProposals.length > 0)) {
      const totalProposals = submissions.length + codeProposals.length;
      toast({
        title: `${totalProposals} propuneri în așteptare`,
        description: `Aveți ${submissions.length} propuneri de task-uri și ${codeProposals.length} propuneri de cod care așteaptă revizuirea dumneavoastră.`,
        duration: 5000,
      });
    }
  }, [loading, submissions.length, codeProposals.length, toast]);

  // Helper function to adapt the generateFeedback function to work with both SubmissionsTab and CodeProposalsTab
  const handleGenerateFeedbackForSubmission = async (type: "submission", item: any) => {
    await generateFeedback(item as FeedbackItem, type);
  };

  const handleGenerateFeedbackForProposal = async (type: "proposal", item: any) => {
    await generateFeedback(item as FeedbackItem, type);
  };

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
            onGenerateFeedback={handleGenerateFeedbackForSubmission}
            loading={loading}
          />
        </TabsContent>
        
        <TabsContent value="code">
          <CodeProposalsTab 
            proposals={codeProposals} 
            onApproveProposal={handleApproveProposal} 
            onRejectProposal={handleRejectProposal}
            onGenerateFeedback={handleGenerateFeedbackForProposal}
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
