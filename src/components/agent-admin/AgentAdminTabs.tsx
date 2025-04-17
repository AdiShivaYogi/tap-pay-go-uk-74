
import React, { useEffect, useState } from "react";
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
import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

interface AgentAdminTabsProps {
  submissions: any[];
  codeProposals: any[];
  progressHistory: any[];
  userId?: string | undefined;
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

  // Pass userId explicitly to avoid destructuring issues
  const { 
    isGeneratingFeedback,
    generateFeedback,
  } = useAgentGodMode(userId ? { userId } : undefined);
  
  // Marcare propuneri vitale pentru ecosistem
  useEffect(() => {
    const processVitalProposals = async () => {
      if (!loading && submissions.length > 0) {
        // Calculăm care sunt propunerile vitale și le marcăm pentru aprobare automată
        const vitalProposals = submissions.filter(sub => {
          const changeText = (sub.proposed_changes || "").toLowerCase();
          return (
            changeText.includes("vital") || 
            changeText.includes("critic") || 
            changeText.includes("esențial") ||
            changeText.includes("important") ||
            changeText.includes("prioritate")
          );
        });
        
        if (vitalProposals.length > 0) {
          toast({
            title: `${vitalProposals.length} propuneri vitale detectate`,
            description: "Au fost identificate propuneri critice pentru ecosistem care vor fi procesate cu prioritate.",
            duration: 5000,
          });

          // Aprobă automat propunerile vitale
          if (userId) {
            for (const proposal of vitalProposals) {
              try {
                await handleApproveSubmission(proposal.id);
                console.log(`Propunere vitală aprobată automat: ${proposal.id}`);
              } catch (err) {
                console.error(`Eroare la aprobarea propunerii vitale ${proposal.id}:`, err);
              }
            }
          }
        }
      }
    };
    
    // Declanșăm procesul de verificare la fiecare 2 minute pentru propuneri noi
    processVitalProposals();
    const interval = setInterval(processVitalProposals, 2 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [submissions, loading, userId, handleApproveSubmission, toast]);

  // Actualizare date când se primește evenimentul de refresh
  useEffect(() => {
    const handleRefresh = async () => {
      console.log('Primire eveniment refresh-proposals, reîncărcarea datelor...');
      
      try {
        // Reîncarcă propunerile de task-uri
        const { data: submissionsData, error: submissionsError } = await supabase
          .from('agent_task_submissions')
          .select(`
            *,
            roadmap_tasks:task_id (*)
          `)
          .eq('approval_status', 'pending')
          .order('created_at', { ascending: false });
          
        if (submissionsError) {
          console.error('Eroare la reîncărcarea propunerilor:', submissionsError);
        } else {
          console.log(`Propuneri reîncărcate: ${submissionsData?.length || 0}`);
          setSubmissions(submissionsData || []);
        }
        
        // Reîncarcă propunerile de cod
        const { data: proposalsData, error: proposalsError } = await supabase
          .from('code_proposals')
          .select('*')
          .eq('status', 'pending')
          .order('created_at', { ascending: false });
          
        if (proposalsError) {
          console.error('Eroare la reîncărcarea propunerilor de cod:', proposalsError);
        } else {
          console.log(`Propuneri de cod reîncărcate: ${proposalsData?.length || 0}`);
          setCodeProposals(proposalsData || []);
        }
      } catch (err) {
        console.error('Eroare la reîncărcarea datelor:', err);
      }
    };
    
    // Adăugare listener pentru evenimentul custom de refresh
    window.addEventListener('refresh-proposals', handleRefresh);
    
    return () => {
      window.removeEventListener('refresh-proposals', handleRefresh);
    };
  }, [setSubmissions, setCodeProposals]);

  // Generare periodică de propuneri noi
  useEffect(() => {
    const scheduleProposalGeneration = async () => {
      if (!userId) return;
      
      try {
        const { error } = await supabase.functions.invoke('generate-agent-proposals', {
          body: { 
            action: 'schedule',
            interval: 5, // la fiecare 5 minute
            userId: userId
          }
        });
        
        if (error) {
          console.error('Eroare la programarea generării de propuneri:', error);
        }
      } catch (err) {
        console.error('Excepție la programarea generării de propuneri:', err);
      }
    };
    
    scheduleProposalGeneration();
  }, [userId]);

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
  
  // Filtrare propuneri vitale
  const vitalSubmissions = submissions.filter(sub => {
    const changeText = (sub.proposed_changes || "").toLowerCase();
    return (
      changeText.includes("vital") || 
      changeText.includes("critic") || 
      changeText.includes("esențial") ||
      changeText.includes("important") ||
      changeText.includes("prioritate")
    );
  });

  // Încearcă să reîmprospăteze datele la montare
  useEffect(() => {
    const refreshInitialData = async () => {
      try {
        // Dispare evenimentul de refresh pentru a forța reîncărcarea datelor
        const refreshEvent = new CustomEvent('refresh-proposals', { 
          detail: { timestamp: new Date().getTime() } 
        });
        window.dispatchEvent(refreshEvent);
        console.log('Eveniment inițial refresh-proposals trimis');
      } catch (e) {
        console.error('Eroare la trimiterea evenimentului inițial de refresh:', e);
      }
    };

    setTimeout(refreshInitialData, 1000); // Întârziere pentru a permite încărcarea componentei
  }, []);

  return (
    <>
      <AgentGodMode 
        userId={userId} 
      />
      
      <Tabs defaultValue="submissions" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="submissions" className="flex items-center gap-1">
            <Sparkles className="h-3.5 w-3.5" />
            Propuneri task-uri ({submissions.length})
            {vitalSubmissions.length > 0 && (
              <Badge variant="outline" className="ml-2 bg-amber-100 text-amber-800 border-amber-200">
                {vitalSubmissions.length} vitale
              </Badge>
            )}
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
