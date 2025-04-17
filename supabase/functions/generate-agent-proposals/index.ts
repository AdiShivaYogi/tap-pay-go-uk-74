
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
    const { 
      action, 
      count = 2, 
      priority = 'normal', 
      userId, 
      vitalCount = 1, 
      forceGenerate = false, 
      strategicDirection = 'optimization' 
    } = await req.json()

    // Acțiunea principală este generarea de propuneri
    if (action === 'generate') {
      console.log(`Generare ${count} propuneri, dintre care ${vitalCount} vitale în direcția: ${strategicDirection}...`)

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
        const proposals = generateProposals(newTaskIds, count, vitalCount, strategicDirection)
        
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
        
        // Generăm și propuneri de cod pentru diversitate
        await generateCodeProposals(supabaseClient, strategicDirection)
        
        return new Response(
          JSON.stringify({ 
            success: true, 
            message: 'Propuneri generate cu succes',
            count: insertedProposals.length,
            direction: strategicDirection
          }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200 
          }
        )
      }

      // Avem task-uri, generăm propuneri pentru acestea
      const taskIds = tasks.map(task => task.id)
      const proposals = generateProposals(taskIds, count, vitalCount, strategicDirection)
      
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
      
      // Generăm și propuneri de cod
      await generateCodeProposals(supabaseClient, strategicDirection)
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Propuneri generate cu succes',
          count: insertedProposals.length,
          direction: strategicDirection
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

// Funcție pentru generarea propunerilor în funcție de direcția strategică
function generateProposals(taskIds: string[], count: number, vitalCount: number, direction: string = 'optimization') {
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
    
    // Generăm propunerea aliniată cu direcția strategică
    const proposal = {
      agent_id: agentId,
      task_id: taskId,
      proposed_status: "in_progress",
      proposed_progress: Math.floor(Math.random() * 50) + 10, // 10-60%
      proposed_changes: isVital ? 
        `VITAL: Propunere critică pentru ${direction}: ${getRandomProposalText(true, direction)}` : 
        `Propunere pentru ${direction}: ${getRandomProposalText(false, direction)}`,
      notes: `Propunere generată automat de ${agentId} în direcția strategică: ${direction}`,
      approval_status: "pending"
    }
    
    proposals.push(proposal)
  }
  
  return proposals
}

// Generare propuneri de cod
async function generateCodeProposals(supabase: any, direction: string = 'optimization') {
  try {
    // Generăm propuneri de cod aliniate cu direcția strategică
    const codeProposals = generateStrategicCodeProposals(direction)
    
    // Inserăm propunerile de cod în baza de date
    const { data: insertedCodeProposals, error: insertCodeError } = await supabase
      .from('code_proposals')
      .insert(codeProposals)
    
    if (insertCodeError) {
      console.error('Eroare la inserarea propunerilor de cod:', insertCodeError)
      return false
    }
    
    console.log(`Propuneri de cod inserate: ${codeProposals.length}`)
    return true
  } catch (e) {
    console.error('Eroare la generarea propunerilor de cod:', e)
    return false
  }
}

// Generare propuneri de cod aliniate cu direcția strategică
function generateStrategicCodeProposals(direction: string) {
  const baseProposals = [
    {
      agent_id: "code-assistant",
      proposed_files: JSON.stringify(["src/components/agents/AutoAgentProcessor.tsx"]),
      proposed_code: "import React, { useState, useEffect } from 'react';\n\nexport const AutoAgentProcessor = () => {\n  const [processing, setProcessing] = useState(false);\n\n  useEffect(() => {\n    const interval = setInterval(() => {\n      console.log('Auto-processing agent tasks...');\n    }, 30000);\n    return () => clearInterval(interval);\n  }, []);\n\n  return (\n    <div className=\"hidden\">\n      {/* Component invizibil pentru procesare automată */}\n    </div>\n  );\n};",
      motivation: "VITAL: Această componentă este necesară pentru procesarea automată a activităților agenților și asigurarea funcționalității optime a sistemului autonom.",
      status: "pending"
    },
    {
      agent_id: "ai-assistant",
      proposed_files: JSON.stringify(["src/components/agents/AgentStatistics.tsx"]),
      proposed_code: "import React from 'react';\nimport { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';\nimport { Progress } from '@/components/ui/progress';\n\nexport const AgentStatistics = () => {\n  return (\n    <Card>\n      <CardHeader>\n        <CardTitle>Statistici Agent</CardTitle>\n      </CardHeader>\n      <CardContent>\n        <div className=\"space-y-4\">\n          <div>\n            <div className=\"flex justify-between text-xs mb-1\">\n              <span>Eficiență</span>\n              <span>75%</span>\n            </div>\n            <Progress value={75} />\n          </div>\n        </div>\n      </CardContent>\n    </Card>\n  );\n};\n",
      motivation: "Această componentă adaugă o modalitate de vizualizare a statisticilor pentru agenți.",
      status: "pending"
    }
  ]
  
  // Adăugăm propuneri specifice direcției strategice
  let strategicProposals: any[] = []
  
  switch(direction) {
    case 'optimization':
      strategicProposals.push({
        agent_id: "optimization-agent",
        proposed_files: JSON.stringify(["src/components/agents/optimization/SystemOptimizer.tsx"]),
        proposed_code: "import React, { useEffect } from 'react';\nimport { supabase } from '@/integrations/supabase/client';\n\nexport const SystemOptimizer = () => {\n  useEffect(() => {\n    const optimizeSystem = async () => {\n      console.log('Optimizing system performance...');\n      // Implementare pentru optimizare sistem\n    };\n    \n    optimizeSystem();\n    const interval = setInterval(optimizeSystem, 60000);\n    return () => clearInterval(interval);\n  }, []);\n  \n  return null;\n};",
        motivation: "VITAL: Această componentă implementează optimizări automate ale sistemului pentru îmbunătățirea performanței generale.",
        status: "pending"
      });
      break;
    case 'innovation':
      strategicProposals.push({
        agent_id: "innovation-agent",
        proposed_files: JSON.stringify(["src/components/agents/innovation/FeatureGenerator.tsx"]),
        proposed_code: "import React, { useState, useEffect } from 'react';\nimport { supabase } from '@/integrations/supabase/client';\n\nexport const FeatureGenerator = () => {\n  const [ideas, setIdeas] = useState([]);\n  \n  useEffect(() => {\n    const generateNewIdeas = async () => {\n      console.log('Generating innovative feature ideas...');\n      // Implementare pentru generare de idei noi\n    };\n    \n    generateNewIdeas();\n  }, []);\n  \n  return null;\n};",
        motivation: "VITAL: Această componentă generează idei inovatoare pentru noi funcționalități în ecosistem.",
        status: "pending"
      });
      break;
    case 'integration':
      strategicProposals.push({
        agent_id: "integration-agent",
        proposed_files: JSON.stringify(["src/components/agents/integration/ApiConnector.tsx"]),
        proposed_code: "import React, { useEffect } from 'react';\nimport { supabase } from '@/integrations/supabase/client';\n\nexport const ApiConnector = () => {\n  useEffect(() => {\n    const checkApiConnections = async () => {\n      console.log('Checking and establishing API connections...');\n      // Implementare pentru verificare și stabilire conexiuni API\n    };\n    \n    checkApiConnections();\n    const interval = setInterval(checkApiConnections, 120000);\n    return () => clearInterval(interval);\n  }, []);\n  \n  return null;\n};",
        motivation: "VITAL: Această componentă facilitează integrarea sistemului cu API-uri externe pentru extinderea funcționalității.",
        status: "pending"
      });
      break;
    case 'security':
      strategicProposals.push({
        agent_id: "security-agent",
        proposed_files: JSON.stringify(["src/components/agents/security/SecurityMonitor.tsx"]),
        proposed_code: "import React, { useEffect } from 'react';\nimport { supabase } from '@/integrations/supabase/client';\n\nexport const SecurityMonitor = () => {\n  useEffect(() => {\n    const monitorSecurity = async () => {\n      console.log('Monitoring system security...');\n      // Implementare pentru monitorizarea securității\n    };\n    \n    monitorSecurity();\n    const interval = setInterval(monitorSecurity, 30000);\n    return () => clearInterval(interval);\n  }, []);\n  \n  return null;\n};",
        motivation: "VITAL: Această componentă monitorizează și îmbunătățește securitatea sistemului de agenți autonomi.",
        status: "pending"
      });
      break;
    case 'autonomy':
      strategicProposals.push({
        agent_id: "autonomy-agent",
        proposed_files: JSON.stringify(["src/components/agents/autonomy/SelfEvolvingSystem.tsx"]),
        proposed_code: "import React, { useEffect } from 'react';\nimport { supabase } from '@/integrations/supabase/client';\n\nexport const SelfEvolvingSystem = () => {\n  useEffect(() => {\n    const evolveSystem = async () => {\n      console.log('Evolving agent capabilities...');\n      // Implementare pentru evoluția autonomă a sistemului\n    };\n    \n    evolveSystem();\n    const interval = setInterval(evolveSystem, 90000);\n    return () => clearInterval(interval);\n  }, []);\n  \n  return null;\n};",
        motivation: "VITAL: Această componentă permite sistemului de agenți să evolueze independent și să-și îmbunătățească capabilitățile.",
        status: "pending"
      });
      break;
  }
  
  // Combinăm propunerile de bază cu cele strategice
  return [...baseProposals, ...strategicProposals];
}

// Texte aleatorii pentru propuneri bazate pe direcția strategică
function getRandomProposalText(isVital: boolean, direction: string) {
  const proposals: Record<string, string[]> = {
    "optimization": [
      "Optimizarea algoritmilor de procesare pentru îmbunătățirea performanței generale.",
      "Refactorizarea codului pentru reducerea amprentei de memorie și CPU.",
      "Implementarea unui sistem de cache pentru accesarea mai rapidă a datelor frecvent utilizate.",
      "Optimizarea interogărilor către baza de date pentru reducerea timpilor de răspuns.",
      "Restructurarea arhitecturii componentelor pentru minimizarea dependențelor."
    ],
    "innovation": [
      "Dezvoltarea unui sistem de generare de idei bazat pe pattern-urile observate în comportamentul utilizatorilor.",
      "Implementarea unui mecanism de auto-învățare pentru îmbunătățirea constantă a sistemului.",
      "Crearea unui nou sistem de vizualizare a datelor pentru o înțelegere mai intuitivă.",
      "Dezvoltarea unui framework de experimente pentru testarea rapidă a noilor funcționalități.",
      "Implementarea unui mecanism de feedback continuu pentru identificarea oportunităților de inovare."
    ],
    "integration": [
      "Crearea unui layer de abstracție pentru integrarea facilă cu sisteme externe.",
      "Implementarea adaptoarelor pentru API-urile celor mai populare servicii externe.",
      "Dezvoltarea unui sistem de sincronizare de date între platforme diferite.",
      "Implementarea unui mecanism standardizat pentru schimbul de date între servicii.",
      "Crearea unui ecosistem de plugin-uri pentru extinderea funcționalității de bază."
    ],
    "security": [
      "Implementarea unui sistem de detectare a comportamentului anormal în cadrul ecosistemului.",
      "Adăugarea de mecanisme avansate de autentificare și autorizare pentru acțiunile critice.",
      "Dezvoltarea unui sistem de audit pentru monitorizarea continuă a activităților.",
      "Implementarea criptării end-to-end pentru toate datele sensibile procesate de agenți.",
      "Crearea unui sistem automat de verificare a vulnerabilităților în codul generat."
    ],
    "autonomy": [
      "Implementarea mecanismelor de auto-reglare pentru optimizarea continuă a comportamentului agenților.",
      "Dezvoltarea unui sistem de luare a deciziilor bazat pe învățare prin reinforcement.",
      "Crearea unui framework pentru auto-generarea și auto-optimizarea codului.",
      "Implementarea unui mecanism de auto-diagnosticare și auto-reparare pentru sistemele critice.",
      "Dezvoltarea capacității de adaptare dinamică la schimbările din mediul de operare."
    ]
  };

  // Dacă direcția nu există, folosim optimizarea ca fallback
  const directionProposals = proposals[direction] || proposals["optimization"];
  
  // Selectăm aleatoriu o propunere
  const randomIndex = Math.floor(Math.random() * directionProposals.length);
  
  // Adăugăm un prefix pentru propunerile vitale
  return isVital 
    ? `Imperativ pentru evoluția sistemului: ${directionProposals[randomIndex]}` 
    : directionProposals[randomIndex];
}
