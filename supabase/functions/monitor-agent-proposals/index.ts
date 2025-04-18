import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Variabilă globală pentru stocarea direcției strategice curente
let currentStrategicDirection = "optimization"; // valoarea implicită

serve(async (req) => {
  // Gestionăm CORS pre-flight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Creăm clientul Supabase 
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    // Extragem datele din body
    const body = await req.json()
    const { action = 'getStats', direction } = body

    // Obținem statistici despre propuneri
    if (action === 'getStats') {
      // Statistici task submissions
      const { data: taskStats, error: taskError } = await supabaseClient.rpc(
        'get_task_submission_stats'
      )

      // Statistici code proposals
      const { data: codeStats, error: codeError } = await supabaseClient.rpc(
        'get_code_proposal_stats'
      )

      // Adăugăm și direcția strategică curentă în statistici
      const strategicInfo = {
        currentDirection: currentStrategicDirection,
        lastUpdated: new Date().toISOString()
      }

      if (taskError || codeError) {
        console.error('Eroare la obținerea statisticilor:', { taskError, codeError })
        throw new Error('Eroare la obținerea statisticilor')
      }

      return new Response(
        JSON.stringify({
          success: true,
          data: {
            taskStats: taskStats || {},
            codeStats: codeStats || {},
            strategicInfo
          }
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      )
    }
    // Actualizăm direcția strategică
    else if (action === 'updateStrategy') {
      if (!direction) {
        throw new Error('Direcția strategică este obligatorie')
      }
      
      // Actualizăm direcția curentă
      currentStrategicDirection = direction
      console.log(`Direcția strategică actualizată la: ${direction}`)
      
      // Înregistrăm modificarea în baza de date
      const { error } = await supabaseClient
        .from('agent_activity')
        .insert({
          agent_id: 'strategy-director',
          agent_name: 'Director Strategic',
          category: 'strategy',
          action: `Actualizare direcție la: ${direction}`
        })
        
      if (error) {
        console.error('Eroare la înregistrarea activității:', error)
      }
      
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Direcție strategică actualizată',
          currentDirection: direction
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      )
    }
    // Procesăm automat propunerile
    else if (action === 'processProposals') {
      // Obținem propunerile vitale mai întâi
      const { data: vitalSubmissions, error: vitalError } = await supabaseClient
        .from('agent_task_submissions')
        .select('*')
        .eq('approval_status', 'pending')
        .textSearch('proposed_changes', 'vital|critic|esențial|important|urgent|prioritate', {
          config: 'english'
        })
        .limit(5)

      if (vitalError) {
        console.error('Eroare la obținerea propunerilor vitale:', vitalError)
        throw new Error('Eroare la obținerea propunerilor vitale')
      }

      // Procesăm propunerile vitale
      for (const submission of (vitalSubmissions || [])) {
        // Aprobăm automat propunerile vitale
        const { error: approvalError } = await supabaseClient
          .from('agent_task_submissions')
          .update({ approval_status: 'approved' })
          .eq('id', submission.id)

        if (approvalError) {
          console.error(`Eroare la aprobarea propunerii ${submission.id}:`, approvalError)
          continue
        }

        // Actualizăm și task-ul principal
        const { error: taskError } = await supabaseClient
          .from('roadmap_tasks')
          .update({
            status: submission.proposed_status,
            progress: submission.proposed_progress,
            last_updated_by: 'auto-processor',
            last_updated_at: new Date().toISOString()
          })
          .eq('id', submission.task_id)

        if (taskError) {
          console.error(`Eroare la actualizarea task-ului ${submission.task_id}:`, taskError)
        }
      }

      // Similar pentru propuneri de cod
      const { data: vitalCodeProposals, error: vitalCodeError } = await supabaseClient
        .from('code_proposals')
        .select('*')
        .eq('status', 'pending')
        .textSearch('motivation', 'vital|critic|esențial|important|urgent|prioritate', {
          config: 'english'
        })
        .limit(5)

      if (vitalCodeError) {
        console.error('Eroare la obținerea propunerilor de cod vitale:', vitalCodeError)
        throw new Error('Eroare la obținerea propunerilor de cod vitale')
      }

      // Procesăm propunerile de cod vitale
      for (const proposal of (vitalCodeProposals || [])) {
        const { error: approvalError } = await supabaseClient
          .from('code_proposals')
          .update({ 
            status: 'approved',
            approved_at: new Date().toISOString(),
            approved_by: 'auto-processor'
          })
          .eq('id', proposal.id)

        if (approvalError) {
          console.error(`Eroare la aprobarea propunerii de cod ${proposal.id}:`, approvalError)
        }
      }

      return new Response(
        JSON.stringify({
          success: true,
          processed: {
            vitalTasks: vitalSubmissions?.length || 0,
            vitalCode: vitalCodeProposals?.length || 0
          }
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      )
    } else {
      throw new Error('Acțiune necunoscută')
    }
  } catch (error) {
    console.error('Eroare în monitor-agent-proposals:', error)
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Eroare necunoscută' 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
