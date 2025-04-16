import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/extended-client";

export type AgentAdminData = {
  submissions: any[];
  progressHistory: any[];
  codeProposals: any[];
  loading: boolean;
};

export const useAgentAdminData = (isAdmin: boolean): AgentAdminData => {
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

  return {
    submissions,
    progressHistory,
    codeProposals,
    loading
  };
};
