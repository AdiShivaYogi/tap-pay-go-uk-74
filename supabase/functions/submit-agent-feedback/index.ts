
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Cors headers pentru a permite apeluri din browser
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Funcția de actualizare a stării propunerilor de task
async function updateTaskSubmission(supabase, submissionId, feedback, approve) {
  try {
    // Mai întâi obținem detaliile despre propunere
    const { data: submission, error: fetchError } = await supabase
      .from('agent_task_submissions')
      .select('*')
      .eq('id', submissionId)
      .single();
    
    if (fetchError) {
      throw new Error(`Nu s-a putut găsi propunerea: ${fetchError.message}`);
    }
    
    // Actualizăm propunerea cu feedback și starea de aprobare
    const { error: updateError } = await supabase
      .from('agent_task_submissions')
      .update({
        notes: feedback,
        approval_status: approve ? 'approved' : 'pending'
      })
      .eq('id', submissionId);
    
    if (updateError) {
      throw new Error(`Nu s-a putut actualiza propunerea: ${updateError.message}`);
    }
    
    // Dacă este aprobată, actualizăm și task-ul corespunzător
    if (approve && submission.task_id) {
      const { error: taskUpdateError } = await supabase
        .from('roadmap_tasks')
        .update({
          progress: submission.proposed_progress,
          status: submission.proposed_status,
          last_updated_at: new Date().toISOString()
        })
        .eq('id', submission.task_id);
      
      if (taskUpdateError) {
        throw new Error(`Nu s-a putut actualiza task-ul: ${taskUpdateError.message}`);
      }
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error updating task submission:', error);
    throw error;
  }
}

// Funcția de actualizare a stării propunerilor de cod
async function updateCodeProposal(supabase, proposalId, feedback, approve) {
  try {
    // Actualizăm propunerea cu feedback și starea de aprobare
    const { error: updateError } = await supabase
      .from('code_proposals')
      .update({
        rejection_reason: feedback, // Utilizăm câmpul rejection_reason pentru feedback
        status: approve ? 'approved' : 'pending',
        approved_at: approve ? new Date().toISOString() : null
      })
      .eq('id', proposalId);
    
    if (updateError) {
      throw new Error(`Nu s-a putut actualiza propunerea de cod: ${updateError.message}`);
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error updating code proposal:', error);
    throw error;
  }
}

// Funcția principală pentru trimiterea feedback-ului
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Inițializare client Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseUrl || !supabaseServiceRoleKey) {
      throw new Error('Variabile de mediu lipsă pentru Supabase');
    }
    
    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
    
    // Parsing parametri din request
    const { itemType, itemId, feedback, userId, approve = false, model = 'deepseek' } = await req.json();
    
    if (!userId || !itemType || !itemId || !feedback) {
      return new Response(
        JSON.stringify({ error: 'Parametri lipsă: userId, itemType, itemId sau feedback' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400
        }
      );
    }
    
    // Actualizăm propunerea în funcție de tipul acesteia
    if (itemType === 'submission') {
      await updateTaskSubmission(supabase, itemId, feedback, approve);
    } else if (itemType === 'proposal') {
      await updateCodeProposal(supabase, itemId, feedback, approve);
    } else {
      throw new Error(`Tip de element necunoscut: ${itemType}`);
    }
    
    // Înregistrăm utilizarea pentru monitorizare
    try {
      await supabase.from('ai_feedback_submissions').insert({
        user_id: userId,
        item_type: itemType,
        item_id: itemId,
        feedback_length: feedback.length,
        model_used: model,
        submitted_at: new Date().toISOString(),
        was_approved: approve
      });
    } catch (logError) {
      console.error('Eroare la înregistrarea feedback-ului:', logError);
      // Continuăm chiar dacă înregistrarea eșuează
    }
    
    // Returnează succes
    return new Response(JSON.stringify({ 
      success: true,
      message: approve ? 'Feedback trimis și propunere aprobată' : 'Feedback trimis cu succes'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    });
    
  } catch (err) {
    console.error('Eroare în submit-agent-feedback:', err);
    
    return new Response(JSON.stringify({ 
      error: 'Eroare la trimiterea feedback-ului', 
      details: err instanceof Error ? err.message : 'Eroare necunoscută' 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500
    });
  }
});
