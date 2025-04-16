
import React, { useState, useEffect } from "react";
import { Layout } from "@/components/layout/layout";
import { Section } from "@/components/ui/layout/section";
import { PageHeader } from "@/components/ui/layout/page-header";
import { Bot } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useUserRole } from "@/hooks/use-user-role";
import { AccessRestrictionAlert } from "@/features/roadmap/components/AccessRestrictionAlert";
import { supabase } from "@/integrations/supabase/types-extension"; 
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { SubmissionsTab } from "@/components/agent-admin/SubmissionsTab";
import { HistoryTab } from "@/components/agent-admin/HistoryTab";

const AgentAdmin = () => {
  const { user } = useAuth();
  const { isAdmin } = useUserRole();
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [progressHistory, setProgressHistory] = useState<any[]>([]);
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
        
        setSubmissions(submissionsData || []);
        setProgressHistory(progressData || []);
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
        <PageHeader
          icon={Bot}
          title="Administrare Agenți"
          description="Gestionează activitatea și contribuțiile agenților la dezvoltarea platformei"
        />
        
        <Tabs defaultValue="submissions" className="mt-6">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="submissions">Propuneri în așteptare {submissions.length > 0 && `(${submissions.length})`}</TabsTrigger>
            <TabsTrigger value="history">Istoric activitate</TabsTrigger>
          </TabsList>
          
          <TabsContent value="submissions">
            <SubmissionsTab 
              submissions={submissions}
              onApproveSubmission={handleApproveSubmission}
              onRejectSubmission={handleRejectSubmission}
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
