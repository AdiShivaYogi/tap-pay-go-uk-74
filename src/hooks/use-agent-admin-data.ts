
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useAgentAdminData = (enabled = true) => {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [codeProposals, setCodeProposals] = useState<any[]>([]);
  const [progressHistory, setProgressHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch data when the hook is enabled
  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch task submissions awaiting approval
        const { data: submissionsData, error: submissionsError } = await supabase
          .from('agent_task_submissions')
          .select(`
            *,
            roadmap_tasks:task_id (*)
          `)
          .eq('approval_status', 'pending')
          .order('created_at', { ascending: false });
          
        if (submissionsError) {
          console.error('Error fetching submissions:', submissionsError);
        } else {
          setSubmissions(submissionsData || []);
        }
        
        // Fetch code proposals awaiting approval
        const { data: proposalsData, error: proposalsError } = await supabase
          .from('code_proposals')
          .select('*')
          .eq('status', 'pending')
          .order('created_at', { ascending: false });
          
        if (proposalsError) {
          console.error('Error fetching code proposals:', proposalsError);
        } else {
          setCodeProposals(proposalsData || []);
        }
        
        // Fetch progress history for visualization
        const { data: progressData, error: progressError } = await supabase
          .from('agent_task_progress')
          .select(`
            *,
            roadmap_tasks:task_id (*)
          `)
          .order('created_at', { ascending: false })
          .limit(50);
          
        if (progressError) {
          console.error('Error fetching progress history:', progressError);
        } else {
          setProgressHistory(progressData || []);
        }
      } catch (err) {
        console.error('Error in useAgentAdminData:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
    
    // Set up real-time subscriptions
    const submissionsSubscription = supabase
      .channel('agent_task_submissions_changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'agent_task_submissions',
      }, () => {
        fetchData();
      })
      .subscribe();
      
    const proposalsSubscription = supabase
      .channel('code_proposals_changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'code_proposals',
      }, () => {
        fetchData();
      })
      .subscribe();
      
    return () => {
      submissionsSubscription.unsubscribe();
      proposalsSubscription.unsubscribe();
    };
  }, [enabled]);

  return {
    submissions,
    codeProposals,
    progressHistory,
    loading,
  };
};
