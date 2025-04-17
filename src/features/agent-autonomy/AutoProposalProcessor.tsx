
import React, { useEffect, useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { extendedSupabase as supabase } from "@/integrations/supabase/extended-client";
import { logAgentActivity } from "@/components/agents/monitoring/hooks/utils/activity-processing";

/**
 * Componenta invizibilă care gestionează automat fluxul de propuneri 
 * Este partea principală a sistemului autonom de evaluare și aprobare
 */
export const AutoProposalProcessor = () => {
  const { toast } = useToast();
  const [lastProcessTime, setLastProcessTime] = useState<Date | null>(null);
  const [processingQueue, setProcessingQueue] = useState<string[]>([]);
  const [processingStatus, setProcessingStatus] = useState<'idle' | 'processing'>('idle');
  const [stats, setStats] = useState({
    processed: 0,
    approved: 0,
    rejected: 0,
    vital: 0,
    standard: 0
  });

  // Clasifică propunerile în funcție de importanța lor
  const classifyProposal = (proposal: any): 'vital' | 'high' | 'standard' | 'low' => {
    const textToCheck = typeof proposal.proposed_changes === 'string' 
      ? proposal.proposed_changes.toLowerCase()
      : typeof proposal.motivation === 'string'
        ? proposal.motivation.toLowerCase()
        : '';

    // Cuvinte cheie pentru propuneri vitale
    const vitalKeywords = ['vital', 'critic', 'esențial', 'urgent', 'prioritate', 'important', 'crucial', 'necesar'];

    // Cuvinte cheie pentru propuneri de prioritate înaltă
    const highKeywords = ['îmbunătățire', 'optimizare', 'performanță', 'securitate', 'eficiență', 'autonom'];

    // Cuvinte cheie pentru propuneri de prioritate scăzută
    const lowKeywords = ['minor', 'opțional', 'cosmetică', 'sugestie', 'eventual'];

    // Verificăm prezența cuvintelor cheie
    if (vitalKeywords.some(keyword => textToCheck.includes(keyword))) {
      return 'vital';
    } else if (highKeywords.some(keyword => textToCheck.includes(keyword))) {
      return 'high';
    } else if (lowKeywords.some(keyword => textToCheck.includes(keyword))) {
      return 'low';
    } else {
      return 'standard';
    }
  };

  // Evaluează propunerea și decide dacă merită aprobată automat
  const evaluateProposal = async (proposal: any, type: 'task' | 'code'): Promise<boolean> => {
    const priority = classifyProposal(proposal);
    
    // Propunerile vitale sunt aprobate automat
    if (priority === 'vital') {
      logAgentActivity(
        'auto-processor', 
        `Propunere vitală aprobată automat: ${type === 'task' ? proposal.task_id : 'cod'}`, 
        'autonomy'
      );
      return true;
    }
    
    // Propunerile de prioritate înaltă au șanse mari de aprobare
    if (priority === 'high') {
      // 70% șansă de aprobare automată pentru propuneri de prioritate înaltă
      const shouldApprove = Math.random() < 0.7;
      if (shouldApprove) {
        logAgentActivity(
          'auto-processor', 
          `Propunere de prioritate înaltă aprobată: ${type === 'task' ? proposal.task_id : 'cod'}`, 
          'autonomy'
        );
      }
      return shouldApprove;
    }

    // Propunerile standard au șanse moderate de aprobare
    if (priority === 'standard') {
      // 40% șansă de aprobare automată pentru propuneri standard
      const shouldApprove = Math.random() < 0.4;
      if (shouldApprove) {
        logAgentActivity(
          'auto-processor', 
          `Propunere standard aprobată: ${type === 'task' ? proposal.task_id : 'cod'}`, 
          'autonomy'
        );
      }
      return shouldApprove;
    }

    // Propunerile de prioritate scăzută au șanse mici de aprobare automată
    // 20% șansă de aprobare automată pentru propuneri de prioritate scăzută
    const shouldApprove = Math.random() < 0.2;
    if (shouldApprove) {
      logAgentActivity(
        'auto-processor', 
        `Propunere de prioritate scăzută aprobată: ${type === 'task' ? proposal.task_id : 'cod'}`, 
        'autonomy'
      );
    }
    return shouldApprove;
  };

  // Procesare automată propuneri task-uri
  const processPendingTaskSubmissions = async () => {
    try {
      // Obținem propunerile de task-uri în așteptare
      const { data: pendingSubmissions, error } = await supabase
        .from('agent_task_submissions')
        .select(`
          *,
          roadmap_tasks:task_id (*)
        `)
        .eq('approval_status', 'pending')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) {
        console.error('Eroare la obținerea propunerilor de task-uri:', error);
        return;
      }

      if (!pendingSubmissions || pendingSubmissions.length === 0) {
        return;
      }

      // Parcurgem fiecare propunere și o evaluăm
      for (const submission of pendingSubmissions) {
        setProcessingStatus('processing');
        setProcessingQueue(prev => [...prev, `Task: ${submission.id.substring(0, 8)}`]);
        
        try {
          const shouldApprove = await evaluateProposal(submission, 'task');
          
          if (shouldApprove) {
            // Aprobă propunerea
            await supabase
              .from('agent_task_submissions')
              .update({ approval_status: 'approved' })
              .eq('id', submission.id);
              
            // Actualizează task-ul principal
            await supabase
              .from('roadmap_tasks')
              .update({
                status: submission.proposed_status,
                progress: submission.proposed_progress,
                last_updated_by: 'auto-processor',
                last_updated_at: new Date().toISOString()
              })
              .eq('id', submission.task_id);
              
            setStats(prev => ({ ...prev, approved: prev.approved + 1 }));
            
            const priority = classifyProposal(submission);
            if (priority === 'vital') {
              setStats(prev => ({ ...prev, vital: prev.vital + 1 }));
            } else {
              setStats(prev => ({ ...prev, standard: prev.standard + 1 }));
            }
            
            console.log(`[AutoProposalProcessor] Propunere task aprobată automat: ${submission.id}`);
          } else {
            // Respinge propunerea
            await supabase
              .from('agent_task_submissions')
              .update({ approval_status: 'rejected' })
              .eq('id', submission.id);
              
            setStats(prev => ({ ...prev, rejected: prev.rejected + 1 }));
            console.log(`[AutoProposalProcessor] Propunere task respinsă automat: ${submission.id}`);
          }
          
          setStats(prev => ({ ...prev, processed: prev.processed + 1 }));
        } catch (err) {
          console.error(`Eroare la procesarea propunerii task ${submission.id}:`, err);
        }
        
        setProcessingQueue(prev => prev.filter(item => !item.includes(submission.id.substring(0, 8))));
      }
    } catch (err) {
      console.error('Eroare la procesarea propunerilor de task-uri:', err);
    } finally {
      setProcessingStatus('idle');
    }
  };

  // Procesare automată propuneri de cod
  const processPendingCodeProposals = async () => {
    try {
      // Obținem propunerile de cod în așteptare
      const { data: pendingProposals, error } = await supabase
        .from('code_proposals')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) {
        console.error('Eroare la obținerea propunerilor de cod:', error);
        return;
      }

      if (!pendingProposals || pendingProposals.length === 0) {
        return;
      }

      // Parcurgem fiecare propunere și o evaluăm
      for (const proposal of pendingProposals) {
        setProcessingStatus('processing');
        setProcessingQueue(prev => [...prev, `Cod: ${proposal.id.substring(0, 8)}`]);
        
        try {
          const shouldApprove = await evaluateProposal(proposal, 'code');
          
          if (shouldApprove) {
            // Aprobă propunerea
            await supabase
              .from('code_proposals')
              .update({ 
                status: 'approved',
                approved_at: new Date().toISOString(),
                approved_by: 'auto-processor'
              })
              .eq('id', proposal.id);
              
            setStats(prev => ({ ...prev, approved: prev.approved + 1 }));
            
            const priority = classifyProposal(proposal);
            if (priority === 'vital') {
              setStats(prev => ({ ...prev, vital: prev.vital + 1 }));
            } else {
              setStats(prev => ({ ...prev, standard: prev.standard + 1 }));
            }
            
            console.log(`[AutoProposalProcessor] Propunere cod aprobată automat: ${proposal.id}`);
          } else {
            // Respinge propunerea
            await supabase
              .from('code_proposals')
              .update({ 
                status: 'rejected',
                rejected_at: new Date().toISOString(),
                rejected_by: 'auto-processor',
                rejection_reason: 'Respins automat de procesorul de propuneri'
              })
              .eq('id', proposal.id);
              
            setStats(prev => ({ ...prev, rejected: prev.rejected + 1 }));
            console.log(`[AutoProposalProcessor] Propunere cod respinsă automat: ${proposal.id}`);
          }
          
          setStats(prev => ({ ...prev, processed: prev.processed + 1 }));
        } catch (err) {
          console.error(`Eroare la procesarea propunerii cod ${proposal.id}:`, err);
        }
        
        setProcessingQueue(prev => prev.filter(item => !item.includes(proposal.id.substring(0, 8))));
      }
    } catch (err) {
      console.error('Eroare la procesarea propunerilor de cod:', err);
    } finally {
      setProcessingStatus('idle');
    }
  };

  // Declanșare manuală pentru a genera noi propuneri
  const triggerNewProposalGeneration = async () => {
    try {
      const { error } = await supabase.functions.invoke('generate-agent-proposals', {
        body: {
          action: 'generate',
          count: 3,  // Generează 3 propuneri
          vitalCount: 1,  // Una dintre ele să fie vitală
          forceGenerate: true
        }
      });

      if (error) {
        console.error('Eroare la generarea propunerilor:', error);
        return;
      }

      console.log('[AutoProposalProcessor] Propuneri noi generate cu succes');
      
      // Actualizăm interogarea după 3 secunde pentru a permite procesarea pe server
      setTimeout(() => {
        // Declanșăm un refresh al UI-ului pentru a afișa noile propuneri
        window.dispatchEvent(new CustomEvent('refresh-proposals', { 
          detail: { timestamp: new Date().getTime() } 
        }));
      }, 3000);
      
    } catch (err) {
      console.error('Eroare la generarea propunerilor:', err);
    }
  };

  // Procesare periodică a propunerilor
  useEffect(() => {
    const interval = setInterval(() => {
      const PROCESSING_INTERVAL_SECONDS = 60;
      const now = new Date();
      
      if (!lastProcessTime || 
          (now.getTime() - lastProcessTime.getTime()) > PROCESSING_INTERVAL_SECONDS * 1000) {
        
        processPendingTaskSubmissions();
        processPendingCodeProposals();
        setLastProcessTime(now);
        
        // Generează ocazional propuneri noi (1 din 5 șanse la fiecare ciclu)
        if (Math.random() < 0.2) {
          triggerNewProposalGeneration();
        }
      }
    }, 30000); // Verifică la fiecare 30 de secunde
    
    // Procesăm la pornire
    processPendingTaskSubmissions();
    processPendingCodeProposals();
    setLastProcessTime(new Date());
    
    return () => clearInterval(interval);
  }, [lastProcessTime]);

  // Înregistrăm metrici importante pentru activitate
  useEffect(() => {
    if (stats.processed > 0) {
      logAgentActivity(
        'auto-processor',
        `Procesare finalizată: ${stats.processed} propuneri (${stats.approved} aprobate, ${stats.rejected} respinse)`,
        'autonomy'
      );
    }
  }, [stats.processed, stats.approved, stats.rejected]);

  // Componenta nu renderizează nimic vizibil
  return null;
};
