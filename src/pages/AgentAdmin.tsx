
import React, { useState, useEffect } from "react";
import { Layout } from "@/components/layout/layout";
import { Section } from "@/components/ui/layout/section";
import { PageHeader } from "@/components/ui/layout/page-header";
import { Bot, Code } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useUserRole } from "@/hooks/use-user-role";
import { AccessRestrictionAlert } from "@/features/roadmap/components/AccessRestrictionAlert";
import { supabase } from "@/integrations/supabase/types-extension"; 
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { SubmissionsTab } from "@/components/agent-admin/SubmissionsTab";
import { HistoryTab } from "@/components/agent-admin/HistoryTab";
import { CodeProposalsTab } from "@/components/agent-admin/CodeProposalsTab";

const AgentAdmin = () => {
  const { user } = useAuth();
  const { isAdmin } = useUserRole();
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [progressHistory, setProgressHistory] = useState<any[]>([]);
  const [codeProposals, setCodeProposals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!isAdmin) return;
    
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const { data: submissionsData, error: submissionsError } = await supabase
          .from('agent_task_submissions')
          .select('*, roadmap_tasks(*)')
          .eq('approval_status', 'pending')
          .order('created_at', { ascending: false });
          
        if (submissionsError) throw submissionsError;
        
        const { data: progressData, error: progressError } = await supabase
          .from('agent_task_progress')
          .select('*, roadmap_tasks(*)')
          .order('created_at', { ascending: false })
          .limit(20);
          
        if (progressError) throw progressError;
        
        const { data: codeProposalsData, error: codeProposalsError } = await supabase
          .from('code_proposals')
          .select('*')
          .eq('status', 'pending')
          .order('created_at', { ascending: false });
          
        if (codeProposalsError) throw codeProposalsError;
        
        setSubmissions(submissionsData || []);
        setProgressHistory(progressData || []);
        setCodeProposals(codeProposalsData || []);
      } catch (err) {
        console.error('Eroare la încărcarea datelor:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [isAdmin]);
  
  const handleApproveSubmission = async (submissionId: string) => {
    try {
      // Obține detaliile despre submission
      const submission = submissions.find(s => s.id === submissionId);
      if (!submission) return;
      
      // Actualizează statusul submission-ului
      const { error: updateSubmissionError } = await supabase
        .from('agent_task_submissions')
        .update({ approval_status: 'approved' })
        .eq('id', submissionId);
        
      if (updateSubmissionError) throw updateSubmissionError;
      
      // Actualizează taskul principal
      const { error: updateTaskError } = await supabase
        .from('roadmap_tasks')
        .update({
          status: submission.proposed_status,
          progress: submission.proposed_progress,
          last_updated_by: 'admin',
          last_updated_at: new Date().toISOString()
        })
        .eq('id', submission.task_id);
        
      if (updateTaskError) throw updateTaskError;
      
      // Actualizează lista locală
      setSubmissions(submissions.filter(s => s.id !== submissionId));
      
      toast({ 
        title: "Propunere aprobată", 
        description: "Schimbările au fost aplicate taskului."
      });
    } catch (err) {
      console.error('Eroare la aprobarea propunerii:', err);
      toast({ 
        title: "Eroare", 
        description: "Nu s-a putut aproba propunerea.",
        variant: "destructive"
      });
    }
  };
  
  const handleRejectSubmission = async (submissionId: string) => {
    try {
      // Actualizează statusul submission-ului
      const { error } = await supabase
        .from('agent_task_submissions')
        .update({ approval_status: 'rejected' })
        .eq('id', submissionId);
        
      if (error) throw error;
      
      // Actualizează lista locală
      setSubmissions(submissions.filter(s => s.id !== submissionId));
      
      toast({ 
        title: "Propunere respinsă", 
        description: "Propunerea a fost respinsă și nu va fi aplicată."
      });
    } catch (err) {
      console.error('Eroare la respingerea propunerii:', err);
      toast({ 
        title: "Eroare", 
        description: "Nu s-a putut respinge propunerea.",
        variant: "destructive"
      });
    }
  };
  
  const handleApproveCodeProposal = async (proposalId: string) => {
    try {
      // Actualizează statusul propunerii de cod
      const { error } = await supabase
        .from('code_proposals')
        .update({ 
          status: 'approved',
          approved_at: new Date().toISOString(),
          approved_by: user?.id
        })
        .eq('id', proposalId);
        
      if (error) throw error;
      
      // Actualizează lista locală
      setCodeProposals(codeProposals.filter(p => p.id !== proposalId));
      
      toast({ 
        title: "Propunere de cod aprobată", 
        description: "Codul propus a fost aprobat pentru implementare."
      });
    } catch (err) {
      console.error('Eroare la aprobarea propunerii de cod:', err);
      toast({ 
        title: "Eroare", 
        description: "Nu s-a putut aproba propunerea de cod.",
        variant: "destructive"
      });
    }
  };
  
  const handleRejectCodeProposal = async (proposalId: string, reason?: string) => {
    try {
      // Actualizează statusul propunerii de cod
      const { error } = await supabase
        .from('code_proposals')
        .update({ 
          status: 'rejected',
          rejected_at: new Date().toISOString(),
          rejected_by: user?.id,
          rejection_reason: reason || null
        })
        .eq('id', proposalId);
        
      if (error) throw error;
      
      // Actualizează lista locală
      setCodeProposals(codeProposals.filter(p => p.id !== proposalId));
      
      toast({ 
        title: "Propunere de cod respinsă", 
        description: "Propunerea de cod a fost respinsă și nu va fi implementată."
      });
    } catch (err) {
      console.error('Eroare la respingerea propunerii de cod:', err);
      toast({ 
        title: "Eroare", 
        description: "Nu s-a putut respinge propunerea de cod.",
        variant: "destructive"
      });
    }
  };
  
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
  
  const pendingSubmissionsCount = submissions.length;
  const pendingCodeProposalsCount = codeProposals.length;
  
  return (
    <Layout>
      <Section>
        <PageHeader
          icon={Bot}
          title="Administrare Agenți"
          description="Gestionează activitatea și contribuțiile agenților la dezvoltarea platformei"
        />
        
        <Tabs defaultValue="submissions" className="mt-6">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="submissions">Propuneri task-uri {pendingSubmissionsCount > 0 && `(${pendingSubmissionsCount})`}</TabsTrigger>
            <TabsTrigger value="code">Propuneri cod {pendingCodeProposalsCount > 0 && `(${pendingCodeProposalsCount})`}</TabsTrigger>
            <TabsTrigger value="history">Istoric activitate</TabsTrigger>
          </TabsList>
          
          <TabsContent value="submissions">
            <SubmissionsTab 
              submissions={submissions}
              onApproveSubmission={handleApproveSubmission}
              onRejectSubmission={handleRejectSubmission}
            />
          </TabsContent>

          <TabsContent value="code">
            <CodeProposalsTab 
              proposals={codeProposals}
              onApproveProposal={handleApproveCodeProposal}
              onRejectProposal={handleRejectCodeProposal}
            />
          </TabsContent>
          
          <TabsContent value="history">
            <HistoryTab progressHistory={progressHistory} />
          </TabsContent>
        </Tabs>
      </Section>
    </Layout>
  );
};

export default AgentAdmin;
