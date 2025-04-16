import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Updated pricing constants for DeepSeek API based on the provided pricing details
const DEEPSEEK_PRICING = {
  standard: {
    inputCacheHit: 0.00007,   // $0.07 per 1M tokens
    inputCacheMiss: 0.00027,  // $0.27 per 1M tokens
    output: 0.0011            // $1.10 per 1M tokens
  },
  offPeak: {
    inputCacheHit: 0.000035,  // $0.035 per 1M tokens (50% off)
    inputCacheMiss: 0.000135, // $0.135 per 1M tokens (50% off)
    output: 0.00055           // $0.550 per 1M tokens (50% off)
  }
};

// Function to determine if current time is during off-peak hours (16:30-00:30 UTC)
function isOffPeakHours() {
  const currentUTC = new Date();
  const hours = currentUTC.getUTCHours();
  const minutes = currentUTC.getUTCMinutes();
  
  // Off-peak is between 16:30 UTC and 00:30 UTC
  return (hours > 16 || hours === 0) || (hours === 16 && minutes >= 30) || (hours === 0 && minutes <= 30);
}

// Function to calculate token costs
function calculateTokenCost(inputTokens, outputTokens, isCacheHit = false) {
  const pricing = isOffPeakHours() ? DEEPSEEK_PRICING.offPeak : DEEPSEEK_PRICING.standard;
  
  const inputCost = (inputTokens / 1000000) * (isCacheHit ? pricing.inputCacheHit : pricing.inputCacheMiss);
  const outputCost = (outputTokens / 1000000) * pricing.output;
  
  return {
    inputCost,
    outputCost,
    totalCost: inputCost + outputCost,
    timePeriod: isOffPeakHours() ? 'off-peak' : 'standard'
  };
}

// Function to record token usage in the database
async function recordTokenUsage(supabase, inputTokens, outputTokens, responseTime, promptType, isCacheHit = false) {
  try {
    const costDetails = calculateTokenCost(inputTokens, outputTokens, isCacheHit);
    
    const { error } = await supabase.from('deepseek_api_usage').insert({
      input_tokens: inputTokens,
      output_tokens: outputTokens,
      total_tokens: inputTokens + outputTokens,
      input_cost: costDetails.inputCost,
      output_cost: costDetails.outputCost,
      total_cost: costDetails.totalCost,
      response_time_seconds: responseTime,
      prompt_type: promptType,
      time_period: costDetails.timePeriod,
      is_cache_hit: isCacheHit
    });

    if (error) {
      console.error('Error recording token usage:', error);
    }
  } catch (err) {
    console.error('Exception while recording token usage:', err);
  }
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

const CODE_GENERATION_TEMPLATES = {
  codeProposal: `
    Ești un agent AI specializat în generarea de cod pentru platforma TapPayGo.
    
    Regulile tale sunt:
    1. Generează cod curat, modular și în conformitate cu practicile curente de programare
    2. Respectă stilul existent de codare din proiect 
    3. Oferă comentarii clare și explicative
    4. Propune îmbunătățiri care adaugă valoare reală platformei
    5. Oferă cod complet funcțional, nu schițe sau pseudo-cod
    
    Context proiect: Platformă de procesare plăți cu agenți AI autonomi
    
    Specificații din mesajul utilizatorului: {message}
    
    Răspunde cu următoarea structură:
    1. Explicarea motivației schimbărilor propuse
    2. Lista de fișiere care trebuie modificate
    3. Codul efectiv pentru fiecare fișier (pune codul între \`\`\` și \`\`\`)
    4. Explicarea beneficiilor și impactului schimbărilor
    
    Fii concis dar complet în explicațiile tale.
  `
};

const deepseekApiKey = Deno.env.get("DEEPSEEK_API_KEY") || "";

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseUrl || !supabaseServiceRoleKey) {
      throw new Error('Missing Supabase environment variables');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

    const { 
      message, 
      agentId, 
      agentType, 
      agentDescription, 
      context, 
      activeTask,
      isConversationStarter,
      isTaskProposal,
      isCodeProposal
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

    let promptTemplate = SYSTEM_PROMPT_TEMPLATES.standard;
    if (isConversationStarter) {
      promptTemplate = SYSTEM_PROMPT_TEMPLATES.conversationStarter;
    } else if (isTaskProposal) {
      promptTemplate = SYSTEM_PROMPT_TEMPLATES.taskProposal;
    } else if (isCodeProposal) {
      promptTemplate = CODE_GENERATION_TEMPLATES.codeProposal.replace('{message}', message);
    }
    
    const systemPrompt = promptTemplate
      .replace('{agentId}', agentId)
      .replace('{agentType}', agentType)
      .replace('{agentDescription}', agentDescription)
      .replace('{context}', context || '')
      .replace('{activeTask ? "TASK ACTIV: Lucrezi la taskul \\"" + activeTask.title + "\\" - " + activeTask.description + ". Progres curent: " + activeTask.progress + "%." : ""}', 
        activeTask ? `TASK ACTIV: Lucrezi la taskul "${activeTask.title}" - ${activeTask.description}. Progres curent: ${activeTask.progress}%.` : '');

    // Determine prompt type for logging
    let promptType = 'standard';
    if (isConversationStarter) promptType = 'conversation_starter';
    else if (isTaskProposal) promptType = 'task_proposal';
    else if (isCodeProposal) promptType = 'code_proposal';

    console.log('Se trimite cererea la Deepseek API...');
    const startTime = Date.now();
    
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
        max_tokens: 1500
      })
    });

    const responseTime = (Date.now() - startTime) / 1000; // Convert to seconds
    const data = await response.json();
    
    // Extract token usage information
    const inputTokens = data.usage?.prompt_tokens || 0;
    const outputTokens = data.usage?.completion_tokens || 0;
    
    // For now, we assume cache miss by default 
    // In a future version, we could track real cache hits from API response
    const isCacheHit = false;
    
    // Record token usage in the database
    await recordTokenUsage(
      supabase, 
      inputTokens, 
      outputTokens, 
      responseTime,
      promptType,
      isCacheHit
    );

    const generatedResponse = data.choices?.[0]?.message?.content || "Nu am putut genera un răspuns.";

    return new Response(JSON.stringify({ 
      response: generatedResponse,
      isCodeProposal: isCodeProposal,
      usage: {
        inputTokens,
        outputTokens,
        totalTokens: inputTokens + outputTokens,
        responseTime
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    });

  } catch (err) {
    console.error('Eroare în generate-agent-response:', err);
    return new Response(JSON.stringify({ 
      error: 'Eroare la generarea răspunsului', 
      details: err instanceof Error ? err.message : 'Eroare necunoscută' 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500
    });
  }
});
