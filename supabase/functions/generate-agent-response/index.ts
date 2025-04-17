
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders, recordTokenUsage } from './utils.ts'
import { createSystemPrompt, determinePromptType } from './prompt-handlers.ts'
import { callDeepseekAPI, callClaudeAPI, callAnthropicAPI } from './api-clients.ts'

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
    const anthropicApiKey = Deno.env.get("ANTHROPIC_API_KEY") || "";

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
    const modelToUse = params.model?.toLowerCase() === 'claude' ? 'claude' : 
                      params.model?.toLowerCase() === 'anthropic' ? 'anthropic' : 'deepseek';
    
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
    } else if (modelToUse === 'anthropic' && !anthropicApiKey) {
      return new Response(
        JSON.stringify({ 
          error: 'Cheia API Anthropic nu este configurată',
          details: 'Pentru a utiliza modelele Claude direct, configurați o cheie API Anthropic în setările aplicației.' 
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

    console.log(`Se trimite cererea la ${
      modelToUse === 'claude' ? 'Claude (OpenRouter)' : 
      modelToUse === 'anthropic' ? 'Claude (Anthropic)' : 'Deepseek'
    } API...`);
    
    const startTime = Date.now();
    
    // Call appropriate API based on model
    let response, data;
    if (modelToUse === 'claude') {
      response = await callClaudeAPI(systemPrompt, params.message, openrouterApiKey);
      data = await response.json();
    } else if (modelToUse === 'anthropic') {
      response = await callAnthropicAPI(systemPrompt, params.message, anthropicApiKey);
      data = await response.json();
    } else {
      response = await callDeepseekAPI(systemPrompt, params.message, deepseekApiKey);
      data = await response.json();
    }
    
    const responseTime = (Date.now() - startTime) / 1000; // Convert to seconds
    
    // Extract token usage information (with fallbacks since different APIs may have different response formats)
    let inputTokens = 0;
    let outputTokens = 0;
    
    if (modelToUse === 'deepseek') {
      inputTokens = data.usage?.prompt_tokens || 0;
      outputTokens = data.usage?.completion_tokens || 0;
    } else if (modelToUse === 'claude') {
      inputTokens = data.usage?.prompt_tokens || 0;
      outputTokens = data.usage?.completion_tokens || 0;
    } else if (modelToUse === 'anthropic') {
      inputTokens = data.usage?.input_tokens || 0;
      outputTokens = data.usage?.output_tokens || 0;
    }
    
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
    } else if (modelToUse === 'anthropic') {
      generatedResponse = data.content?.[0]?.text || 
                         "Nu am putut genera un răspuns cu Anthropic.";
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
