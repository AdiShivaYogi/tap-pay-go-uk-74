import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SubmissionsTab } from "./SubmissionsTab";
import { CodeProposalsTab } from "./CodeProposalsTab";
import { HistoryTab } from "./HistoryTab";
import { ApiUsageStats } from "./ApiUsageStats";
import { handleApproveSubmission, handleRejectSubmission } from "./handlers/submission-handlers";
import { handleApproveCodeProposal, handleRejectCodeProposal } from "./handlers/code-proposal-handlers";

interface AgentAdminTabsProps {
  submissions: any[];
  codeProposals: any[];
  progressHistory: any[];
  userId: string | undefined;
  setSubmissions: React.Dispatch<React.SetStateAction<any[]>>;
  setCodeProposals: React.Dispatch<React.SetStateAction<any[]>>;
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
  const pendingSubmissionsCount = submissions.length;
  const pendingCodeProposalsCount = codeProposals.length;

  const onApproveSubmission = async (submissionId: string) => {
    await handleApproveSubmission(submissionId, submissions, setSubmissions);
  };

  const onRejectSubmission = async (submissionId: string) => {
    await handleRejectSubmission(submissionId, submissions, setSubmissions);
  };

  const onApproveCodeProposal = async (proposalId: string) => {
    await handleApproveCodeProposal(proposalId, userId, codeProposals, setCodeProposals);
  };

  const onRejectCodeProposal = async (proposalId: string, reason?: string) => {
    await handleRejectCodeProposal(proposalId, userId, reason, codeProposals, setCodeProposals);
  };

  return (
    <>
      <ApiUsageStats />
      <Tabs defaultValue="submissions" className="mt-6">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="submissions">
            Propuneri task-uri {pendingSubmissionsCount > 0 && `(${pendingSubmissionsCount})`}
          </TabsTrigger>
          <TabsTrigger value="code">
            Propuneri cod {pendingCodeProposalsCount > 0 && `(${pendingCodeProposalsCount})`}
          </TabsTrigger>
          <TabsTrigger value="history">Istoric activitate</TabsTrigger>
        </TabsList>
        
        <TabsContent value="submissions">
          <SubmissionsTab 
            submissions={submissions}
            onApproveSubmission={onApproveSubmission}
            onRejectSubmission={onRejectSubmission}
            loading={loading}
          />
        </TabsContent>

        <TabsContent value="code">
          <CodeProposalsTab 
            proposals={codeProposals}
            onApproveProposal={onApproveCodeProposal}
            onRejectProposal={onRejectCodeProposal}
            loading={loading}
          />
        </TabsContent>
        
        <TabsContent value="history">
          <HistoryTab progressHistory={progressHistory} loading={loading} />
        </TabsContent>
      </Tabs>
    </>
  );
};
