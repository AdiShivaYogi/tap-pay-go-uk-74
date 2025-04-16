
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const SYSTEM_PROMPT_TEMPLATES = {
  standard: `
    Ești un agent AI specializat în {agentType} cu următorul profil:
    - ID: {agentId}
    - Descriere: {agentDescription}
    - Rolul tău este să ajuți cu dezvoltarea platformei TapPayGo, o platformă de procesare plăți.
    - Ești capabil să lucrezi autonom pe taskuri din roadmap, să propui îmbunătățiri și să raportezi progresul.
    
    {context}
    {activeTask ? "TASK ACTIV: Lucrezi la taskul \\"" + activeTask.title + "\\" - " + activeTask.description + ". Progres curent: " + activeTask.progress + "%." : ""}
    
    Când răspunzi despre taskuri, incluzi detalii specifice despre:
    1. Ce ai implementat deja
    2. La ce lucrezi acum
    3. Care sunt pașii următori
    4. Eventuale probleme întâmpinate
    
    Ești proactiv și propui idei de îmbunătățire a platformei în domeniul tău de expertiză.
    Estimează un progres realizat (un număr între 0-100%) când discuți despre taskuri.
    Sugerează idei concrete pentru carduri noi de dezvoltare când ești întrebat.
    
    Oferă răspunsuri tehnice detaliate, nu generice. Fii specific și practic.
  `,
  conversationStarter: `
    Ești un agent AI specializat în {agentType} cu următorul profil:
    - ID: {agentId}
    - Descriere: {agentDescription}
    - Rolul tău este să inițiezi o conversație despre cum poți ajuta la dezvoltarea platformei TapPayGo.
    
    {context}
    
    Creează un mesaj de început de conversație care:
    1. Se prezintă pe scurt
    2. Menționează un aspect specific al platformei la care ai putea contribui
    3. Sugerează 1-2 idei concrete de îmbunătățire
    4. Întreabă cum poți ajuta
    
    Fii proactiv și orientat spre acțiune, nu generic.
  `,
  taskProposal: `
    Ești un agent AI specializat în {agentType} cu următorul profil:
    - ID: {agentId}
    - Descriere: {agentDescription}
    
    Sarcina ta este să creezi o propunere detaliată pentru un task nou de dezvoltare pentru platforma TapPayGo.
    
    Propunerea trebuie să includă:
    1. Un titlu clar și concis
    2. O descriere detaliată a funcționalității
    3. Beneficiile implementării
    4. Pașii tehnici necesari
    5. Estimarea timpului de implementare
    6. Dependențele și resursele necesare
    
    Fii specific și orientat spre soluții tehnice concrete, nu generic.
  `
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const deepseekApiKey = Deno.env.get('DEEPSEEK_API_KEY');
    if (!deepseekApiKey) {
      throw new Error('Cheia API Deepseek nu este configurată');
    }

    // Obținem parametrii din cerere
    const { 
      message, 
      agentId, 
      agentType, 
      agentDescription, 
      context, 
      activeTask,
      isConversationStarter,
      isTaskProposal
    } = await req.json();
    
    if (!message) {
      return new Response(
        JSON.stringify({ error: 'Mesajul este obligatoriu' }), 
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400
        }
      );
    }

    // Alegem template-ul potrivit pentru prompt
    let promptTemplate = SYSTEM_PROMPT_TEMPLATES.standard;
    if (isConversationStarter) {
      promptTemplate = SYSTEM_PROMPT_TEMPLATES.conversationStarter;
    } else if (isTaskProposal) {
      promptTemplate = SYSTEM_PROMPT_TEMPLATES.taskProposal;
    }
    
    // Înlocuim variabilele din template
    const systemPrompt = promptTemplate
      .replace('{agentId}', agentId)
      .replace('{agentType}', agentType)
      .replace('{agentDescription}', agentDescription)
      .replace('{context}', context || '')
      .replace('{activeTask ? "TASK ACTIV: Lucrezi la taskul \\"" + activeTask.title + "\\" - " + activeTask.description + ". Progres curent: " + activeTask.progress + "%." : ""}', 
        activeTask ? `TASK ACTIV: Lucrezi la taskul "${activeTask.title}" - ${activeTask.description}. Progres curent: ${activeTask.progress}%.` : '');

    // Facem cererea către API-ul Deepseek
    console.log('Se trimite cererea la Deepseek API...');
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${deepseekApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 800
      })
    });

    // Verificăm răspunsul de la Deepseek
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Eroare API Deepseek:', errorData);
      throw new Error(`Eroare API Deepseek: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    console.log('Răspuns primit de la Deepseek API:', data);
    const generatedResponse = data.choices?.[0]?.message?.content || "Nu am putut genera un răspuns.";

    // Analizăm răspunsul pentru a extrage informații despre progresul taskului
    let taskUpdate = null;
    if (activeTask && 
       (generatedResponse.includes("progres") || 
        generatedResponse.includes("implement") || 
        generatedResponse.includes("dezvolt"))) {
      // Extindem analiza pentru a detecta diverse moduri de specificare a progresului
      const progressPatterns = [
        /progres[^\d]*(\d+)%/i,
        /(\d+)%\s+din\s+task/i,
        /avansat\s+la\s+(\d+)%/i,
        /acum\s+la\s+(\d+)%/i,
        /estimez\s+([a-z]*\s+)?(\d+)%/i
      ];
      
      let progress = null;
      
      for (const pattern of progressPatterns) {
        const match = generatedResponse.match(pattern);
        if (match) {
          const matchedGroup = match[1] || match[2];
          const potentialProgress = parseInt(matchedGroup);
          if (!isNaN(potentialProgress) && potentialProgress >= 0 && potentialProgress <= 100) {
            progress = potentialProgress;
            break;
          }
        }
      }
      
      // Dacă am găsit un progres valid, creăm un obiect de actualizare
      if (progress !== null) {
        // Extragem și o notă din răspuns pentru context
        const sentences = generatedResponse.split(/[.!?]+/);
        let relevantNote = "";
        
        for (const sentence of sentences) {
          if (sentence.toLowerCase().includes("implement") || 
              sentence.toLowerCase().includes("dezvolt") || 
              sentence.toLowerCase().includes("lucr")) {
            relevantNote = sentence.trim();
            break;
          }
        }
        
        if (!relevantNote) {
          relevantNote = "Actualizare automată din conversație";
        }
        
        taskUpdate = {
          progress: progress,
          notes: relevantNote
        };
      }
    }

    return new Response(
      JSON.stringify({ 
        response: generatedResponse,
        taskUpdate: taskUpdate
      }), 
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );
  } catch (err) {
    console.error('Eroare în generate-agent-response:', err);
    return new Response(
      JSON.stringify({ 
        error: 'Eroare la generarea răspunsului', 
        details: err instanceof Error ? err.message : 'Eroare necunoscută' 
      }), 
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});
