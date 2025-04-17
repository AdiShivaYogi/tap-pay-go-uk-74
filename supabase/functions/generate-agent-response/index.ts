import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Constants for DeepSeek API pricing
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

// System prompt templates
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

/**
 * Determines if current time is during off-peak hours (16:30-00:30 UTC)
 * @returns {boolean} True if current time is during off-peak hours
 */
function isOffPeakHours() {
  const currentUTC = new Date();
  const hours = currentUTC.getUTCHours();
  const minutes = currentUTC.getUTCMinutes();
  
  // Off-peak is between 16:30 UTC and 00:30 UTC
  return (hours > 16 || hours === 0) || (hours === 16 && minutes >= 30) || (hours === 0 && minutes <= 30);
}

/**
 * Calculates token costs based on token count and pricing model
 * @param {number} inputTokens - Number of input tokens
 * @param {number} outputTokens - Number of output tokens
 * @param {boolean} isCacheHit - Whether the input tokens were served from cache
 * @returns {Object} Cost details including input, output and total costs
 */
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

/**
 * Records token usage in the database
 * @param {Object} supabase - Supabase client
 * @param {number} inputTokens - Number of input tokens
 * @param {number} outputTokens - Number of output tokens
 * @param {number} responseTime - Response time in seconds
 * @param {string} promptType - Type of prompt used
 * @param {boolean} isCacheHit - Whether the input tokens were served from cache
 * @param {string} model - The model used (deepseek or claude)
 */
async function recordTokenUsage(supabase, inputTokens, outputTokens, responseTime, promptType, isCacheHit = false, model = 'deepseek') {
  try {
    // Only calculate costs for DeepSeek models
    const costDetails = model === 'deepseek' ? calculateTokenCost(inputTokens, outputTokens, isCacheHit) : {
      inputCost: 0,
      outputCost: 0,
      totalCost: 0,
      timePeriod: 'unknown'
    };
    
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
      is_cache_hit: isCacheHit,
      model: model
    });

    if (error) {
      console.error('Error recording token usage:', error);
    }
  } catch (err) {
    console.error('Exception while recording token usage:', err);
  }
}

/**
 * Selects the appropriate prompt template and replaces placeholders with actual values
 * @param {Object} params - Parameters containing request details
 * @returns {string} Formatted system prompt
 */
function createSystemPrompt(params) {
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
  } = params;

  let promptTemplate = SYSTEM_PROMPT_TEMPLATES.standard;
  
  if (isConversationStarter) {
    promptTemplate = SYSTEM_PROMPT_TEMPLATES.conversationStarter;
  } else if (isTaskProposal) {
    promptTemplate = SYSTEM_PROMPT_TEMPLATES.taskProposal;
  } else if (isCodeProposal) {
    promptTemplate = CODE_GENERATION_TEMPLATES.codeProposal.replace('{message}', message);
  }
  
  return promptTemplate
    .replace('{agentId}', agentId)
    .replace('{agentType}', agentType)
    .replace('{agentDescription}', agentDescription)
    .replace('{context}', context || '')
    .replace('{activeTask ? "TASK ACTIV: Lucrezi la taskul \\"" + activeTask.title + "\\" - " + activeTask.description + ". Progres curent: " + activeTask.progress + "%." : ""}', 
      activeTask ? `TASK ACTIV: Lucrezi la taskul "${activeTask.title}" - ${activeTask.description}. Progres curent: ${activeTask.progress}%.` : '');
}

/**
 * Determines the prompt type for logging purposes
 * @param {Object} params - Parameters containing request flags
 * @returns {string} Prompt type identifier
 */
function determinePromptType(params) {
  const { isConversationStarter, isTaskProposal, isCodeProposal } = params;
  
  if (isConversationStarter) return 'conversation_starter';
  if (isTaskProposal) return 'task_proposal';
  if (isCodeProposal) return 'code_proposal';
  return 'standard';
}

/**
 * Calls the Deepseek API with the provided message and system prompt
 * @param {string} systemPrompt - The system prompt to send to the API
 * @param {string} message - The user message to send to the API
 * @param {string} apiKey - The Deepseek API key
 * @returns {Promise<Object>} The API response
 */
async function callDeepseekAPI(systemPrompt, message, apiKey) {
  return await fetch('https://api.deepseek.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
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
}

/**
 * Calls the OpenRouter API to access Claude models
 * @param {string} systemPrompt - The system prompt to send to the API
 * @param {string} message - The user message to send to the API
 * @param {string} apiKey - The OpenRouter API key
 * @returns {Promise<Object>} The API response
 */
async function callClaudeAPI(systemPrompt, message, apiKey) {
  // Obține modelul preferat din parametri sau folosește un model implicit
  // Preferințe de model în ordine: claude-3.5-sonnet, claude-3-opus, claude-3-sonnet, claude-3-haiku
  const preferredModel = "anthropic/claude-3.5-sonnet";
  const fallbackModels = [
    "anthropic/claude-3-opus:2024-05-16",
    "anthropic/claude-3-sonnet", 
    "anthropic/claude-3-haiku"
  ];
  
  // Prima încercare cu modelul preferat
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': Deno.env.get('SUPABASE_URL') || 'https://tappaygo.com',
        'X-Title': 'TapPayGo Platform'
      },
      body: JSON.stringify({
        model: preferredModel,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 1500
      })
    });
    
    if (response.ok) {
      return response;
    }
    
    // Dacă modelul preferat nu este disponibil, încearcă modelele de rezervă
    const errorData = await response.json();
    console.log(`Modelul preferat ${preferredModel} nu este disponibil: ${errorData.error?.message || 'Eroare necunoscută'}`);
    
    // Încearcă modelele alternative
    for (const fallbackModel of fallbackModels) {
      console.log(`Se încearcă modelul alternativ: ${fallbackModel}`);
      
      const fallbackResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': Deno.env.get('SUPABASE_URL') || 'https://tappaygo.com',
          'X-Title': 'TapPayGo Platform'
        },
        body: JSON.stringify({
          model: fallbackModel,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: message }
          ],
          temperature: 0.7,
          max_tokens: 1500
        })
      });
      
      if (fallbackResponse.ok) {
        console.log(`Se folosește modelul alternativ: ${fallbackModel}`);
        return fallbackResponse;
      }
    }
    
    // Dacă niciun model nu este disponibil, returnează eroarea inițială
    throw new Error(`Niciun model Claude disponibil: ${errorData.error?.message || 'Eroare necunoscută'}`);
    
  } catch (error) {
    console.error('Eroare la apelarea API-ului Claude:', error);
    throw error;
  }
}

/**
 * Main handler function for the Supabase Edge Function
 */
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseUrl || !supabaseServiceRoleKey) {
      throw new Error('Missing Supabase environment variables');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
    
    // Get API keys from environment
    const deepseekApiKey = Deno.env.get("DEEPSEEK_API_KEY") || "";
    const openrouterApiKey = Deno.env.get("OPENROUTER_API_KEY") || "";

    // Parse request body
    const params = await req.json();
    
    if (!params.message) {
      return new Response(
        JSON.stringify({ error: 'Mesajul este obligatoriu' }), 
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400
        }
      );
    }

    // Determine which model to use (default to deepseek if not specified)
    const modelToUse = params.model?.toLowerCase() === 'claude' ? 'claude' : 'deepseek';
    
    // Check if the required API key is available
    if (modelToUse === 'claude' && !openrouterApiKey) {
      return new Response(
        JSON.stringify({ 
          error: 'Cheia API OpenRouter nu este configurată',
          details: 'Pentru a utiliza modelele Claude, configurați o cheie API OpenRouter în setările aplicației.' 
        }), 
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400
        }
      );
    } else if (modelToUse === 'deepseek' && !deepseekApiKey) {
      return new Response(
        JSON.stringify({ 
          error: 'Cheia API Deepseek nu este configurată',
          details: 'Pentru a utiliza modelele Deepseek, configurați o cheie API Deepseek în setările aplicației.' 
        }), 
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400
        }
      );
    }

    // Create system prompt and determine prompt type
    const systemPrompt = createSystemPrompt(params);
    const promptType = determinePromptType(params);

    console.log(`Se trimite cererea la ${modelToUse === 'claude' ? 'Claude (OpenRouter)' : 'Deepseek'} API...`);
    const startTime = Date.now();
    
    // Call appropriate API based on model
    let response, data;
    if (modelToUse === 'claude') {
      response = await callClaudeAPI(systemPrompt, params.message, openrouterApiKey);
      data = await response.json();
    } else {
      response = await callDeepseekAPI(systemPrompt, params.message, deepseekApiKey);
      data = await response.json();
    }
    
    const responseTime = (Date.now() - startTime) / 1000; // Convert to seconds
    
    // Extract token usage information (with fallbacks since different APIs may have different response formats)
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
      isCacheHit,
      modelToUse
    );

    // Extract the generated response based on API format
    let generatedResponse = '';
    
    if (modelToUse === 'claude') {
      generatedResponse = data.choices?.[0]?.message?.content || 
                         data.choices?.[0]?.content || 
                         "Nu am putut genera un răspuns cu Claude.";
    } else {
      generatedResponse = data.choices?.[0]?.message?.content || 
                         "Nu am putut genera un răspuns.";
    }

    // Return the response
    return new Response(JSON.stringify({ 
      response: generatedResponse,
      isCodeProposal: params.isCodeProposal,
      model: modelToUse,
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
