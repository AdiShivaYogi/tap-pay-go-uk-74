
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Creăm un client Supabase pentru a lucra cu baza de date
const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, agentId, taskId, progressData, taskUpdate } = await req.json();
    console.log(`Acțiune primită: ${action}`, { agentId, taskId });

    let result;

    switch (action) {
      case 'getAssignedTasks':
        // Returnează taskurile asignate unui agent specific
        result = await getAssignedTasks(agentId);
        break;
      case 'getTaskDetails':
        // Returnează detaliile unui task specific
        result = await getTaskDetails(taskId);
        break;
      case 'updateTaskProgress':
        // Actualizează progresul unui task
        result = await updateTaskProgress(taskId, agentId, progressData);
        break;
      case 'submitTaskUpdate':
        // Trimite o actualizare pentru un task pentru review
        result = await submitTaskUpdate(taskId, agentId, taskUpdate);
        break;
      default:
        throw new Error('Acțiune necunoscută');
    }

    return new Response(JSON.stringify({ success: true, data: result }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (err) {
    console.error('Eroare în agent-roadmap-tasks:', err);
    return new Response(
      JSON.stringify({
        error: 'Eroare la procesarea cererii pentru roadmap',
        details: err instanceof Error ? err.message : 'Eroare necunoscută',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});

// Funcții helper pentru operațiuni cu taskuri
async function getAssignedTasks(agentId) {
  // În viitor, vom avea o tabelă pentru asignări de taskuri
  // Deocamdată returnăm taskuri bazate pe specializarea agentului
  
  const agentToCategory = {
    'payment-agent': 'payment',
    'support-agent': 'product',
    'analytics-agent': 'monitoring',
    'security-agent': 'security',
    'ai-assistant': null // poate lucra la orice
  };

  const category = agentToCategory[agentId];
  
  // Pentru agentul general, returnăm taskuri care nu sunt completate
  if (!category) {
    const { data, error } = await supabase
      .from('roadmap_tasks')
      .select('*')
      .neq('status', 'completed')
      .limit(5);
      
    if (error) throw error;
    return data;
  }
  
  // Pentru agenți specializați, returnăm taskuri din categoria lor
  const { data, error } = await supabase
    .from('roadmap_tasks')
    .select('*')
    .eq('category', category)
    .neq('status', 'completed')
    .limit(5);
    
  if (error) throw error;
  return data;
}

async function getTaskDetails(taskId) {
  const { data, error } = await supabase
    .from('roadmap_tasks')
    .select('*')
    .eq('id', taskId)
    .single();
    
  if (error) throw error;
  return data;
}

async function updateTaskProgress(taskId, agentId, progressData) {
  // Adaugă o intrare în istoricul progresului
  const { data, error } = await supabase
    .from('agent_task_progress')
    .insert({
      task_id: taskId,
      agent_id: agentId,
      progress_percentage: progressData.progress,
      notes: progressData.notes,
      status: 'in_progress'
    })
    .select()
    .single();
    
  if (error) throw error;
  
  // Actualizează progresul taskului principal dacă este necesar
  if (progressData.updateMainTask) {
    const { error: updateError } = await supabase
      .from('roadmap_tasks')
      .update({ 
        progress: progressData.progress,
        last_updated_by: agentId,
        last_updated_at: new Date().toISOString()
      })
      .eq('id', taskId);
      
    if (updateError) throw updateError;
  }
  
  return data;
}

async function submitTaskUpdate(taskId, agentId, taskUpdate) {
  // Adaugă o propunere de actualizare care trebuie aprobată de un admin
  const { data, error } = await supabase
    .from('agent_task_submissions')
    .insert({
      task_id: taskId,
      agent_id: agentId,
      proposed_changes: taskUpdate.changes,
      proposed_status: taskUpdate.status || 'inProgress',
      proposed_progress: taskUpdate.progress,
      notes: taskUpdate.notes,
      approval_status: 'pending'
    })
    .select()
    .single();
    
  if (error) throw error;
  return data;
}
