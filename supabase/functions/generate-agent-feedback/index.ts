
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Configuration
const deepseekApiKey = Deno.env.get('DEEPSEEK_API_KEY');
const openrouterApiKey = Deno.env.get('OPENROUTER_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Validation functions
function validateApiKeys() {
  if (!deepseekApiKey && !openrouterApiKey) {
    throw new Error("Nu este configurată nicio cheie API (DeepSeek sau OpenRouter).");
  }
}

function validateRequestData(requestData: any) {
  const { submissionId, proposalId, agentId, content } = requestData;
  
  if (!agentId || !content) {
    throw new Error("Lipsesc datele necesare pentru generarea feedback-ului (agentId sau content).");
  }
  
  if (!submissionId && !proposalId) {
    throw new Error("Trebuie specificat submissionId sau proposalId.");
  }
}

// API call functions
async function callOpenRouterApi(systemPrompt: string, userPrompt: string) {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openrouterApiKey}`,
      'HTTP-Referer': Deno.env.get('SUPABASE_URL') || 'https://tappaygo.com',
      'X-Title': 'TapPayGo Platform',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'anthropic/claude-3-sonnet',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenRouter API a returnat status ${response.status}`);
  }

  return await response.json();
}

async function callDeepseekApi(systemPrompt: string, userPrompt: string) {
  const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${deepseekApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    throw new Error(`Deepseek API a returnat status ${response.status}`);
  }

  return await response.json();
}

// Data handling functions
async function logApiUsage(responseData: any, useOpenRouter: boolean, responseTimeSeconds: number) {
  await fetch(`${Deno.env.get('SUPABASE_URL')}/rest/v1/deepseek_api_usage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': Deno.env.get('SUPABASE_ANON_KEY') as string,
      'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
    },
    body: JSON.stringify({
      input_tokens: responseData.usage.prompt_tokens,
      output_tokens: responseData.usage.completion_tokens,
      total_tokens: responseData.usage.total_tokens,
      input_cost: useOpenRouter ? (responseData.usage.prompt_tokens * 0.000003) : (responseData.usage.prompt_tokens * 0.0000005), 
      output_cost: useOpenRouter ? (responseData.usage.completion_tokens * 0.000015) : (responseData.usage.completion_tokens * 0.0000015),
      total_cost: useOpenRouter 
        ? ((responseData.usage.prompt_tokens * 0.000003) + (responseData.usage.completion_tokens * 0.000015))
        : ((responseData.usage.prompt_tokens * 0.0000005) + (responseData.usage.completion_tokens * 0.0000015)),
      response_time_seconds: responseTimeSeconds,
      prompt_type: 'agent-feedback',
      time_period: 'standard',
      is_cache_hit: false
    }),
  });
}

async function saveSubmissionFeedback(submissionId: string, feedback: string, isGodMode: boolean) {
  // Salvăm feedback-ul în baza de date
  await fetch(`${Deno.env.get('SUPABASE_URL')}/rest/v1/agent_feedback`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': Deno.env.get('SUPABASE_ANON_KEY') as string,
      'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
    },
    body: JSON.stringify({
      submission_id: submissionId,
      feedback: feedback,
      is_approved: isGodMode,
      is_god_mode: isGodMode
    }),
  });
  
  // Dacă suntem în God Mode, aprobăm automat propunerea
  if (isGodMode) {
    await fetch(`${Deno.env.get('SUPABASE_URL')}/rest/v1/agent_task_submissions?id=eq.${submissionId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'apikey': Deno.env.get('SUPABASE_ANON_KEY') as string,
        'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        approval_status: 'approved',
        notes: `Aprobat automat în God Mode cu feedback`
      }),
    });
  }
}

async function saveProposalFeedback(proposalId: string, feedback: string, isGodMode: boolean) {
  // Salvăm feedback-ul în baza de date pentru propuneri de cod
  await fetch(`${Deno.env.get('SUPABASE_URL')}/rest/v1/code_proposal_feedback`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': Deno.env.get('SUPABASE_ANON_KEY') as string,
      'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
    },
    body: JSON.stringify({
      proposal_id: proposalId,
      feedback: feedback,
      is_approved: isGodMode,
      is_god_mode: isGodMode
    }),
  });
  
  // Dacă suntem în God Mode, aprobăm automat propunerea
  if (isGodMode) {
    const currentDate = new Date().toISOString();
    
    await fetch(`${Deno.env.get('SUPABASE_URL')}/rest/v1/code_proposals?id=eq.${proposalId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'apikey': Deno.env.get('SUPABASE_ANON_KEY') as string,
        'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        status: 'approved',
        approved_at: currentDate
      }),
    });
  }
}

// Main function to handle feedback generation
async function generateFeedback(requestData: any) {
  // Extragem datele din request
  const { 
    submissionId, 
    proposalId,
    agentId, 
    content, 
    type, 
    isGodMode,
    preferredModel
  } = requestData;

  // Construim promptul pentru generarea feedback-ului
  let systemPrompt = `Ești un Agent Supervisor expert în evaluarea și îmbunătățirea propunerilor de la alți agenți AI. 
  Oferă un feedback constructiv, focusat și concis pentru propunerea de mai jos.`;
  
  if (isGodMode) {
    systemPrompt += `\nFuncționezi în God Mode, ceea ce înseamnă că propunerea va fi aprobată automat, dar agentul are nevoie de feedback pentru îmbunătățire continuă.`;
  } else {
    systemPrompt += `\nPropunerea necesită îmbunătățiri înainte de a fi aprobată. Oferă sugestii concrete pentru îmbunătățiri.`;
  }

  // Determinăm ce API să folosim în funcție de cheile disponibile și preferința utilizatorului
  const useOpenRouter = openrouterApiKey && (preferredModel === 'claude' || !deepseekApiKey);
  const startTime = Date.now();
  
  // Facem request-ul la API-ul corespunzător
  let responseData;
  const userPrompt = `Evaluează această propunere de la agentul ${agentId}:\n\n${content}`;
  
  if (useOpenRouter) {
    // Folosim OpenRouter pentru a accesa modelele Claude
    responseData = await callOpenRouterApi(systemPrompt, userPrompt);
  } else {
    // Folosim Deepseek API ca fallback
    responseData = await callDeepseekApi(systemPrompt, userPrompt);
  }

  const feedback = responseData.choices[0].message.content;
  const endTime = Date.now();
  const responseTimeSeconds = (endTime - startTime) / 1000;
  const modelUsed = useOpenRouter ? 'claude-3-sonnet' : 'deepseek-chat';

  // Înregistrăm utilizarea API-ului
  await logApiUsage(responseData, useOpenRouter, responseTimeSeconds);

  // Salvăm feedback-ul în baza de date în funcție de tipul propunerii
  if (submissionId) {
    // Feedback pentru propunere de task
    await saveSubmissionFeedback(submissionId, feedback, isGodMode);
  } else if (proposalId) {
    // Feedback pentru propunere de cod
    await saveProposalFeedback(proposalId, feedback, isGodMode);
  }

  return {
    feedback,
    is_god_mode: isGodMode,
    model_used: modelUsed,
    message: isGodMode ? 'Feedback generat și propunere aprobată automat.' : 'Feedback generat cu succes.'
  };
}

// Main handler
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verificăm dacă există cel puțin o cheie API configurată
    validateApiKeys();
    
    // Extragem datele din request
    const requestData = await req.json();
    validateRequestData(requestData);
    
    // Generăm feedback-ul
    const result = await generateFeedback(requestData);
    
    // Returnăm rezultatul
    return new Response(
      JSON.stringify(result),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Eroare în funcția generate-agent-feedback:', error);
    
    return new Response(
      JSON.stringify({ error: error.message || 'A apărut o eroare la generarea feedback-ului.' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
