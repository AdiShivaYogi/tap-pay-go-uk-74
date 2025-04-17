
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Network, Shield, ChartPie, BarChart3, Rocket, Settings } from "lucide-react";
import { 
  AutonomyTab,
  NetworkTab,
  SafetyTab,
  ActivityTab,
  ProjectsTab,
  InnerWorldTab
} from "../monitoring/tabs";
import { SubmissionsTab } from "../../agent-admin/SubmissionsTab";
import { CodeProposalsTab } from "../../agent-admin/CodeProposalsTab";
import { HistoryTab } from "../../agent-admin/HistoryTab";
import { ApiUsageStats } from "../../agent-admin/ApiUsageStats";
import { useAgentGodMode } from "@/hooks/agent-god-mode";
import { AgentGodMode } from "../../agent-admin/AgentGodMode";
import { useToast } from "@/hooks/use-toast";

interface UnifiedMonitoringTabsProps {
  submissions: any[];
  codeProposals: any[];
  progressHistory: any[];
  userId?: string;
  setSubmissions: (submissions: any[]) => void;
  setCodeProposals: (codeProposals: any[]) => void;
  loading?: boolean;
  onApproveSubmission: (id: string) => Promise<void>;
  onRejectSubmission: (id: string) => Promise<void>;
  onApproveProposal: (id: string) => Promise<void>;
  onRejectProposal: (id: string) => Promise<void>;
}

export const UnifiedMonitoringTabs: React.FC<UnifiedMonitoringTabsProps> = ({
  submissions,
  codeProposals,
  progressHistory,
  userId,
  setSubmissions,
  setCodeProposals,
  loading = false,
  onApproveSubmission,
  onRejectSubmission,
  onApproveProposal,
  onRejectProposal
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("autonomy");
  
  // Folosim hook-ul AgentGodMode pentru generare feedback
  const { 
    isGeneratingFeedback,
    generateFeedback,
  } = useAgentGodMode(userId ? { userId } : undefined);

  // Helper functions pentru a genera feedback
  const handleGenerateFeedbackForSubmission = async (type: "submission", item: any) => {
    await generateFeedback(item, type);
  };

  const handleGenerateFeedbackForProposal = async (type: "proposal", item: any) => {
    await generateFeedback(item, type);
  };

  return (
    <>
      <AgentGodMode userId={userId} />
      
      <Tabs defaultValue="autonomy" className="space-y-6" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="autonomy" className="flex items-center gap-1">
            <Brain className="h-4 w-4" />
            Autonomie & Execuție
          </TabsTrigger>
          <TabsTrigger value="network" className="flex items-center gap-1">
            <Network className="h-4 w-4" />
            Rețea Agenți
          </TabsTrigger>
          <TabsTrigger value="safety" className="flex items-center gap-1">
            <Shield className="h-4 w-4" />
            Infrastructură de siguranță
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center gap-1">
            <ChartPie className="h-4 w-4" />
            Activitate în timp real
          </TabsTrigger>
          <TabsTrigger value="projects" className="flex items-center gap-1">
            <BarChart3 className="h-4 w-4" />
            Proiecte agenți
          </TabsTrigger>
          <TabsTrigger value="inner-world" className="flex items-center gap-1">
            <Rocket className="h-4 w-4" />
            Lumea Interioară
          </TabsTrigger>
          <TabsTrigger value="submissions" className="flex items-center gap-1">
            <Settings className="h-4 w-4" />
            Propuneri ({submissions.length})
          </TabsTrigger>
          <TabsTrigger value="code" className="flex items-center gap-1">
            <Settings className="h-4 w-4" />
            Cod ({codeProposals.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="autonomy">
          <AutonomyTab />
        </TabsContent>
        
        <TabsContent value="network">
          <NetworkTab />
        </TabsContent>
        
        <TabsContent value="safety">
          <SafetyTab />
        </TabsContent>
        
        <TabsContent value="activity">
          <ActivityTab />
        </TabsContent>
        
        <TabsContent value="projects">
          <ProjectsTab />
        </TabsContent>
        
        <TabsContent value="inner-world">
          <InnerWorldTab />
        </TabsContent>

        <TabsContent value="submissions">
          <SubmissionsTab 
            submissions={submissions} 
            onApproveSubmission={onApproveSubmission} 
            onRejectSubmission={onRejectSubmission}
            onGenerateFeedback={handleGenerateFeedbackForSubmission}
            loading={loading}
          />
        </TabsContent>
        
        <TabsContent value="code">
          <CodeProposalsTab 
            proposals={codeProposals} 
            onApproveProposal={onApproveProposal} 
            onRejectProposal={onRejectProposal}
            onGenerateFeedback={handleGenerateFeedbackForProposal}
            loading={loading}
          />
        </TabsContent>
      </Tabs>
    </>
  );
};
