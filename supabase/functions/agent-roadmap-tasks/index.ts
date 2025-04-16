
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
    const { action, agentId, taskId, progressData, taskUpdate, taskProposal, codeProposal } = await req.json();
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
      case 'proposeNewTask':
        // Permite agentului să propună un task complet nou
        result = await proposeNewTask(agentId, taskProposal);
        break;
      case 'proposeCodeChange':
        // Permite agentului să propună o modificare de cod
        result = await proposeCodeChange(agentId, codeProposal);
        break;
      case 'getAgentContributions':
        // Obține toate contribuțiile unui agent (istoric)
        result = await getAgentContributions(agentId);
        break;
      case 'getCodeProposals':
        // Obține propunerile de cod pentru un agent specific
        result = await getCodeProposals(agentId);
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

async function proposeNewTask(agentId, taskProposal) {
  // Adaugă o propunere pentru un task complet nou
  const { data, error } = await supabase
    .from('agent_task_submissions')
    .insert({
      agent_id: agentId,
      proposed_changes: JSON.stringify({
        title: taskProposal.title,
        description: taskProposal.description,
        category: taskProposal.category,
        priority: taskProposal.priority || "medium",
        estimated_effort: taskProposal.estimated_effort || "medium",
        implementation_details: taskProposal.implementation_details || ""
      }),
      proposed_status: 'planned',
      proposed_progress: 0,
      notes: taskProposal.notes || "Propunere nouă de task",
      approval_status: 'pending',
      is_new_task_proposal: true
    })
    .select()
    .single();
    
  if (error) throw error;
  return data;
}

async function proposeCodeChange(agentId, codeProposal) {
  console.log('Procesare propunere de cod:', codeProposal);
  
  // Validare date de intrare
  if (!codeProposal.files || !Array.isArray(codeProposal.files) || codeProposal.files.length === 0) {
    throw new Error('Trebuie furnizată cel puțin o cale de fișier');
  }
  
  if (!codeProposal.code || typeof codeProposal.code !== 'object') {
    throw new Error('Trebuie furnizat codul pentru fiecare fișier');
  }
  
  if (!codeProposal.motivation) {
    throw new Error('Trebuie furnizată o motivație pentru schimbările de cod');
  }
  
  try {
    const { data, error } = await supabase
      .from('code_proposals')
      .insert({
        agent_id: agentId,
        proposed_files: JSON.stringify(codeProposal.files),
        proposed_code: JSON.stringify(codeProposal.code),
        motivation: codeProposal.motivation,
        status: 'pending'
      })
      .select()
      .single();
      
    if (error) {
      console.error('Eroare la inserarea în baza de date:', error);
      throw error;
    }
    
    console.log('Propunere de cod adăugată cu succes:', data);
    return data;
  } catch (err) {
    console.error('Eroare la procesarea propunerii de cod:', err);
    throw err;
  }
}

async function getAgentContributions(agentId) {
  // Obține toate contribuțiile unui agent (și propuneri și progres)
  const { data: progressData, error: progressError } = await supabase
    .from('agent_task_progress')
    .select('*, roadmap_tasks(*)')
    .eq('agent_id', agentId)
    .order('created_at', { ascending: false });
    
  if (progressError) throw progressError;
  
  const { data: submissionData, error: submissionError } = await supabase
    .from('agent_task_submissions')
    .select('*, roadmap_tasks(*)')
    .eq('agent_id', agentId)
    .order('created_at', { ascending: false });
    
  if (submissionError) throw submissionError;
  
  const { data: codeProposalsData, error: codeProposalsError } = await supabase
    .from('code_proposals')
    .select('*')
    .eq('agent_id', agentId)
    .order('created_at', { ascending: false });
    
  if (codeProposalsError) throw codeProposalsError;
  
  return {
    progress: progressData || [],
    submissions: submissionData || [],
    codeProposals: codeProposalsData || []
  };
}

async function getCodeProposals(agentId) {
  // Obține toate propunerile de cod pentru un agent specific
  const { data, error } = await supabase
    .from('code_proposals')
    .select('*')
    .eq('agent_id', agentId)
    .order('created_at', { ascending: false });
    
  if (error) throw error;
  return data || [];
}
