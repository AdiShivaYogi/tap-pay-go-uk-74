
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
    const { action, count = 2, priority = 'normal', userId, vitalCount = 1, forceGenerate = false } = await req.json()

    // Acțiunea principală este generarea de propuneri
    if (action === 'generate') {
      console.log(`Generare ${count} propuneri, dintre care ${vitalCount} vitale...`)

      // Verificăm dacă există task-uri în baza de date
      const { data: tasks, error: tasksError } = await supabaseClient
        .from('roadmap_tasks')
        .select('id, title')
        .limit(10)

      if (tasksError) {
        console.error('Eroare la interogarea task-urilor:', tasksError)
        throw new Error(`Eroare la interogarea task-urilor: ${tasksError.message}`)
      }

      // Dacă nu avem task-uri existente, creăm câteva noi
      if (!tasks || tasks.length === 0) {
        console.log('Nu există task-uri, creez task-uri noi...')

        const defaultTasks = [
          {
            title: 'Implementare sistem de agenți autonomi',
            description: 'Dezvoltarea unui sistem de agenți inteligenți care pot opera autonom',
            category: 'autonomy',
            status: 'pending',
          },
          {
            title: 'Optimizare infrastructură pentru agenți',
            description: 'Îmbunătățirea infrastructurii tehnice pentru suportul agenților autonomi',
            category: 'infrastructure',
            status: 'pending',
          },
          {
            title: 'Dezvoltare interfață comunicare inter-agenți',
            description: 'Crearea unui protocol de comunicare între diverși agenți autonomi',
            category: 'development',
            status: 'pending',
          }
        ]

        const { data: newTasks, error: createTasksError } = await supabaseClient
          .from('roadmap_tasks')
          .insert(defaultTasks)
          .select()

        if (createTasksError) {
          console.error('Eroare la crearea task-urilor:', createTasksError)
          throw new Error(`Eroare la crearea task-urilor: ${createTasksError.message}`)
        }

        console.log(`Task-uri create: ${newTasks.length}`)
        
        // Folosim noile task-uri pentru propuneri
        const newTaskIds = newTasks.map(task => task.id)
        
        // Generăm propuneri pentru task-urile noi
        const proposals = generateProposals(newTaskIds, count, vitalCount)
        
        // Inserăm propunerile în baza de date
        const { data: insertedProposals, error: insertError } = await supabaseClient
          .from('agent_task_submissions')
          .insert(proposals)
          .select()

        if (insertError) {
          console.error('Eroare la inserarea propunerilor:', insertError)
          throw new Error(`Eroare la inserarea propunerilor: ${insertError.message}`)
        }

        console.log(`Propuneri generate și inserate: ${insertedProposals.length}`)
        
        return new Response(
          JSON.stringify({ 
            success: true, 
            message: 'Propuneri generate cu succes',
            count: insertedProposals.length 
          }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200 
          }
        )
      }

      // Avem task-uri, generăm propuneri pentru acestea
      const taskIds = tasks.map(task => task.id)
      const proposals = generateProposals(taskIds, count, vitalCount)
      
      // Inserăm propunerile în baza de date
      const { data: insertedProposals, error: insertError } = await supabaseClient
        .from('agent_task_submissions')
        .insert(proposals)
        .select()

      if (insertError) {
        console.error('Eroare la inserarea propunerilor:', insertError)
        throw new Error(`Eroare la inserarea propunerilor: ${insertError.message}`)
      }

      console.log(`Propuneri generate și inserate: ${insertedProposals.length}`)
      
      // Generăm și o propunere de cod pentru diversitate
      const codeProposal = {
        agent_id: "code-assistant",
        proposed_files: JSON.stringify(["src/components/agents/AutoAgentProcessor.tsx"]),
        proposed_code: "import React, { useState, useEffect } from 'react';\n\nexport const AutoAgentProcessor = () => {\n  const [processing, setProcessing] = useState(false);\n\n  useEffect(() => {\n    const interval = setInterval(() => {\n      console.log('Auto-processing agent tasks...');\n    }, 30000);\n    return () => clearInterval(interval);\n  }, []);\n\n  return (\n    <div className=\"hidden\">\n      {/* Component invizibil pentru procesare automată */}\n    </div>\n  );\n};",
        motivation: "VITAL: Această componentă este necesară pentru procesarea automată a activităților agenților și asigurarea funcționalității optime a sistemului autonom.",
        status: "pending"
      }
      
      const { data: codeSubmission, error: codeError } = await supabaseClient
        .from('code_proposals')
        .insert(codeProposal)
        .select()
      
      if (codeError) {
        console.error('Eroare la inserarea propunerii de cod:', codeError)
      } else {
        console.log('Propunere de cod inserată în baza de date:', codeSubmission)
      }
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Propuneri generate cu succes',
          count: insertedProposals.length 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      )
    } 
    // Acțiunea de programare (nu face nimic deocamdată, doar returnează succes)
    else if (action === 'schedule') {
      return new Response(
        JSON.stringify({ success: true, message: 'Generare propuneri programată cu succes' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      )
    }
    else {
      throw new Error('Acțiune necunoscută')
    }
  } catch (error) {
    console.error('Eroare în generate-agent-proposals:', error)
    
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

// Funcție pentru generarea propunerilor
function generateProposals(taskIds: string[], count: number, vitalCount: number) {
  const proposals = []
  const agentIds = ["ai-assistant", "research-agent", "monitoring-agent", "planning-agent"]
  
  for (let i = 0; i < count; i++) {
    // Selectăm un task aleatoriu
    const randomTaskIndex = Math.floor(Math.random() * taskIds.length)
    const taskId = taskIds[randomTaskIndex]
    
    // Selectăm un agent aleatoriu
    const randomAgentIndex = Math.floor(Math.random() * agentIds.length)
    const agentId = agentIds[randomAgentIndex]
    
    // Decidem dacă propunerea este vitală
    const isVital = i < vitalCount
    
    // Generăm propunerea
    const proposal = {
      agent_id: agentId,
      task_id: taskId,
      proposed_status: "in_progress",
      proposed_progress: Math.floor(Math.random() * 50) + 10, // 10-60%
      proposed_changes: isVital ? 
        `VITAL: Propunere critică pentru funcționarea sistemului: ${getRandomProposalText()}` : 
        `Propunere pentru îmbunătățirea sistemului: ${getRandomProposalText()}`,
      notes: `Propunere generată automat de ${agentId}`,
      approval_status: "pending"
    }
    
    proposals.push(proposal)
  }
  
  return proposals
}

// Texte aleatorii pentru propuneri
function getRandomProposalText() {
  const proposals = [
    "Implementare sistem de verificare a rezultatelor generate de agenți pentru a asigura calitatea și siguranța acestora.",
    "Adăugarea unui mecanism de monitorizare în timp real a activității agenților autonomi.",
    "Crearea unui sistem de feedback automat pentru îmbunătățirea continuă a agenților.",
    "Dezvoltarea unui mecanism de comunicare între agenți pentru rezolvarea colaborativă a problemelor.",
    "Implementare protocol de siguranță pentru operațiunile critice realizate de agenți.",
    "Optimizarea procesului de generare a propunerilor pentru a crește eficiența sistemului.",
    "Integrarea unui sistem de priorități pentru executarea sarcinilor bazat pe importanță și urgență.",
    "Crearea unui dashboard unificat pentru monitorizarea și controlul tuturor agenților din ecosistem."
  ]
  
  const randomIndex = Math.floor(Math.random() * proposals.length)
  return proposals[randomIndex]
}
