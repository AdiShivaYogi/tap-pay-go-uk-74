
// deno-lint-ignore-file no-explicit-any
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

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
    const { action, userId } = await req.json()

    // Acțiunea principală este startMonitoring
    if (action === 'startMonitoring') {
      console.log('Pornire monitorizare propuneri pentru userId:', userId)
      
      // Înregistrăm activitatea de pornire a monitorizării
      const logActivity = async () => {
        try {
          await supabaseClient.from('agent_activity_logs').insert({
            agent_id: 'agent-monitor',
            agent_name: 'Task Monitor',
            description: 'Pornire monitorizare propuneri și aprobări automate',
            category: 'system'
          })
        } catch (error) {
          console.error('Eroare la înregistrarea activității:', error)
        }
      }
      
      // Nu așteptăm finalizarea înregistrării pentru a nu bloca răspunsul
      logActivity();
      
      // Căutăm propuneri vitale care ar trebui aprobate automat
      const processVitalProposals = async () => {
        try {
          // Obținem propunerile de task-uri vitale în așteptare
          const { data: vitalProposals, error: fetchError } = await supabaseClient
            .from('agent_task_submissions')
            .select('*')
            .eq('approval_status', 'pending')
            .filter('proposed_changes', 'ilike', '%vital%')
            .limit(10)
          
          if (fetchError) {
            console.error('Eroare la obținerea propunerilor vitale:', fetchError)
            return
          }
          
          console.log(`Propuneri vitale găsite: ${vitalProposals?.length || 0}`)
          
          // Aprobăm automat propunerile vitale
          if (vitalProposals && vitalProposals.length > 0) {
            for (const proposal of vitalProposals) {
              try {
                await supabaseClient
                  .from('agent_task_submissions')
                  .update({ approval_status: 'approved' })
                  .eq('id', proposal.id)
                
                console.log(`Propunere vitală aprobată automat: ${proposal.id}`)
                
                // Înregistrăm această activitate
                await supabaseClient.from('agent_activity_logs').insert({
                  agent_id: 'agent-monitor',
                  agent_name: 'Task Monitor',
                  description: `Aprobare automată a propunerii vitale ${proposal.id}`,
                  category: 'approval'
                })
                
                // Actualizăm și task-ul asociat, dacă există
                if (proposal.task_id) {
                  await supabaseClient
                    .from('roadmap_tasks')
                    .update({
                      status: proposal.proposed_status,
                      progress: proposal.proposed_progress
                    })
                    .eq('id', proposal.task_id)
                    
                  console.log(`Task actualizat: ${proposal.task_id}`)
                }
              } catch (err) {
                console.error(`Eroare la aprobarea propunerii ${proposal.id}:`, err)
              }
            }
          }
          
          // Procesăm și propunerile de cod vitale
          const { data: vitalCodeProposals, error: codeError } = await supabaseClient
            .from('code_proposals')
            .select('*')
            .eq('status', 'pending')
            .filter('motivation', 'ilike', '%vital%')
            .limit(5)
          
          if (codeError) {
            console.error('Eroare la obținerea propunerilor de cod vitale:', codeError)
            return
          }
          
          console.log(`Propuneri de cod vitale găsite: ${vitalCodeProposals?.length || 0}`)
          
          // Aprobăm automat propunerile de cod vitale
          if (vitalCodeProposals && vitalCodeProposals.length > 0) {
            for (const proposal of vitalCodeProposals) {
              try {
                await supabaseClient
                  .from('code_proposals')
                  .update({ 
                    status: 'approved',
                    approved_at: new Date().toISOString(),
                    approved_by: userId
                  })
                  .eq('id', proposal.id)
                
                console.log(`Propunere de cod vitală aprobată automat: ${proposal.id}`)
                
                // Înregistrăm această activitate
                await supabaseClient.from('agent_activity_logs').insert({
                  agent_id: 'agent-monitor',
                  agent_name: 'Task Monitor',
                  description: `Aprobare automată a propunerii de cod vitale ${proposal.id}`,
                  category: 'approval'
                })
              } catch (err) {
                console.error(`Eroare la aprobarea propunerii de cod ${proposal.id}:`, err)
              }
            }
          }
        } catch (error) {
          console.error('Eroare în procesarea propunerilor vitale:', error)
        }
      }
      
      // Pornim procesarea propunerilor vitale
      try {
        await processVitalProposals()
      } catch (err) {
        console.error('Eroare la pornirea procesării propunerilor vitale:', err)
      }
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Monitorizare propuneri pornită cu succes',
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
    console.error('Eroare în agent-task-monitor:', error)
    
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
