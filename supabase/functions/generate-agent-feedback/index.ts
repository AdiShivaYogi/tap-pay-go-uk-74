
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Cors headers pentru a permite apeluri din browser
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Template pentru sistemul de feedback bazat pe Claude
function createSystemPromptForFeedback(itemType, item) {
  if (itemType === "submission") {
    return `
      Ești un agent expert în evaluarea propunerilor pentru taskuri de dezvoltare.
      
      Trebuie să evaluezi următoarea propunere de task:
      
      Titlu task: ${item.roadmap_tasks?.title || 'N/A'}
      Descriere task: ${item.roadmap_tasks?.description || 'N/A'}
      Progres curent: ${item.roadmap_tasks?.progress || 0}%
      
      Modificări propuse de agent:
      ${item.proposed_changes || 'N/A'}
      
      Progres propus: ${item.proposed_progress || 0}%
      
      Oferă feedback constructiv și detaliat care:
      1. Evaluează calitatea propunerii
      2. Analizează dacă progresul propus este rezonabil
      3. Sugerează îmbunătățiri specifice (dacă este cazul)
      4. Oferă recomandări pentru următorii pași
      
      Feedback-ul trebuie să fie profesionist, constructiv și să încurajeze dezvoltarea agentului.
    `;
  } else {
    return `
      Ești un agent expert în evaluarea propunerilor de cod.
      
      Trebuie să evaluezi următoarea propunere de cod:
      
      Fișiere propuse: ${item.proposed_files || 'N/A'}
      
      Motivație: ${item.motivation || 'N/A'}
      
      Oferă feedback constructiv și detaliat care:
      1. Evaluează calitatea propunerii
      2. Analizează dacă modificările de cod sunt bine justificate
      3. Sugerează îmbunătățiri specifice (dacă este cazul)
      4. Oferă recomandări pentru optimizări sau alternative
      
      Feedback-ul trebuie să fie tehnic, constructiv și să încurajeze dezvoltarea agenților autonomi.
    `;
  }
}

// Funcția de apelare a API-ului Anthropic direct
async function callAnthropicAPI(systemPrompt, message, apiKey) {
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        system: systemPrompt,
        messages: [
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 1500
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Eroare API Anthropic: ${errorData.error?.message || 'Eroare necunoscută'}`);
    }
    
    const data = await response.json();
    return data.content?.[0]?.text || "Nu am putut genera feedback cu Anthropic.";
  } catch (error) {
    console.error('Eroare la apelarea API-ului Anthropic:', error);
    throw error;
  }
}

// Funcția de apelare a API-ului OpenRouter pentru Claude
async function callOpenRouterAPI(systemPrompt, message, apiKey) {
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
        model: 'anthropic/claude-3-sonnet',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 1500
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Eroare API OpenRouter/Claude: ${errorData.error?.message || 'Eroare necunoscută'}`);
    }
    
    const data = await response.json();
    return data.choices?.[0]?.message?.content || data.choices?.[0]?.content || "Nu am putut genera feedback cu Claude.";
  } catch (error) {
    console.error('Eroare la apelarea API-ului OpenRouter:', error);
    throw error;
  }
}

// Funcția de apelare a API-ului DeepSeek
async function callDeepseekAPI(systemPrompt, message, apiKey) {
  try {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
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
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Eroare API DeepSeek: ${errorData.error?.message || 'Eroare necunoscută'}`);
    }
    
    const data = await response.json();
    return data.choices?.[0]?.message?.content || "Nu am putut genera feedback cu DeepSeek.";
  } catch (error) {
    console.error('Eroare la apelarea API-ului DeepSeek:', error);
    throw error;
  }
}

// Funcția principală pentru generarea de feedback
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Inițializare client Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseUrl || !supabaseServiceRoleKey) {
      throw new Error('Variabile de mediu lipsă pentru Supabase');
    }
    
    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
    
    // Parsing parametri din request
    const { userId, itemType, item, model = 'deepseek' } = await req.json();
    
    if (!userId || !itemType || !item) {
      return new Response(
        JSON.stringify({ error: 'Parametri lipsă: userId, itemType sau item' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400
        }
      );
    }
    
    // Obținere chei API pentru modele
    const deepseekApiKey = Deno.env.get('DEEPSEEK_API_KEY');
    const openrouterApiKey = Deno.env.get('OPENROUTER_API_KEY');
    const anthropicApiKey = Deno.env.get('ANTHROPIC_API_KEY');
    
    // Verificare chei API
    if (model === 'deepseek' && !deepseekApiKey) {
      return new Response(
        JSON.stringify({ error: 'Cheia API pentru DeepSeek nu este configurată' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500
        }
      );
    } else if (model === 'claude' && !openrouterApiKey) {
      return new Response(
        JSON.stringify({ error: 'Cheia API pentru OpenRouter nu este configurată' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500
        }
      );
    } else if (model === 'anthropic' && !anthropicApiKey) {
      return new Response(
        JSON.stringify({ error: 'Cheia API pentru Anthropic nu este configurată' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500
        }
      );
    }
    
    // Creează promptul sistem pentru cererea către model
    const systemPrompt = createSystemPromptForFeedback(itemType, item);
    const userPrompt = "Generează feedback detaliat pentru această propunere.";
    
    let responseText = '';
    let modelUsed = model;
    
    // Apelează API-ul corespunzător modelului selectat
    try {
      console.log(`Generare feedback folosind modelul: ${model}`);
      
      if (model === 'deepseek') {
        responseText = await callDeepseekAPI(systemPrompt, userPrompt, deepseekApiKey);
      } else if (model === 'claude') {
        responseText = await callOpenRouterAPI(systemPrompt, userPrompt, openrouterApiKey);
      } else if (model === 'anthropic') {
        responseText = await callAnthropicAPI(systemPrompt, userPrompt, anthropicApiKey);
      } else {
        throw new Error(`Model necunoscut: ${model}`);
      }
    } catch (apiError) {
      console.error(`Eroare la apelarea API-ului ${model}:`, apiError);
      
      // Încercăm fallback pe alt model dacă cel selectat eșuează
      if (model === 'anthropic' && openrouterApiKey) {
        console.log('Fallback la OpenRouter Claude');
        modelUsed = 'claude';
        responseText = await callOpenRouterAPI(systemPrompt, userPrompt, openrouterApiKey);
      } else if ((model === 'claude' || model === 'anthropic') && deepseekApiKey) {
        console.log('Fallback la DeepSeek');
        modelUsed = 'deepseek';
        responseText = await callDeepseekAPI(systemPrompt, userPrompt, deepseekApiKey);
      } else {
        throw apiError;
      }
    }
    
    // Înregistrăm utilizarea pentru monitorizare
    try {
      await supabase.from('ai_feedback_generations').insert({
        user_id: userId,
        item_type: itemType,
        item_id: item.id,
        model: modelUsed,
        generated_at: new Date().toISOString(),
        prompt_tokens: systemPrompt.length,  // Aproximativ
        completion_tokens: responseText.length,  // Aproximativ
        success: true
      });
    } catch (logError) {
      console.error('Eroare la înregistrarea utilizării:', logError);
      // Continuăm chiar dacă înregistrarea eșuează
    }
    
    // Returnează feedback-ul generat
    return new Response(JSON.stringify({ 
      feedback: responseText,
      model: modelUsed
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    });
    
  } catch (err) {
    console.error('Eroare în generate-agent-feedback:', err);
    
    return new Response(JSON.stringify({ 
      error: 'Eroare la generarea feedback-ului', 
      details: err instanceof Error ? err.message : 'Eroare necunoscută' 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500
    });
  }
});
