
import { toast } from "@/hooks/use-toast";
import { extendedSupabase as supabase } from "@/integrations/supabase/extended-client";

export const handleApproveSubmission = async (
  submissionId: string,
  submissions: any[],
  setSubmissions: React.Dispatch<React.SetStateAction<any[]>>
) => {
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

export const handleRejectSubmission = async (
  submissionId: string,
  submissions: any[],
  setSubmissions: React.Dispatch<React.SetStateAction<any[]>>
) => {
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
