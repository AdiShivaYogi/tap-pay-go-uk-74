
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Creăm clientul Supabase
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Obținem cheia API Anthropic din secretele funcției
    const anthropicApiKey = Deno.env.get('ANTHROPIC_API_KEY');

    // Verificăm dacă cheia există
    if (!anthropicApiKey) {
      return new Response(
        JSON.stringify({ 
          hasKey: false,
          isValid: false,
          message: 'Cheia API Anthropic nu este configurată'
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200
        }
      );
    }

    // Verificăm dacă cheia este validă făcând o cerere simplă către API-ul Anthropic
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': anthropicApiKey,
          'anthropic-version': '2023-06-01',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'claude-3-sonnet-20240229',
          max_tokens: 5,
          messages: [
            { role: 'user', content: 'Hello!' }
          ]
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Răspuns negativ de la API-ul Anthropic:', errorData);
        
        return new Response(
          JSON.stringify({ 
            hasKey: true,
            isValid: false,
            error: errorData.error?.message || 'Răspuns invalid de la API',
            message: 'Cheia API Anthropic este configurată, dar nu este validă'
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200
          }
        );
      }

      const data = await response.json();
      return new Response(
        JSON.stringify({ 
          hasKey: true,
          isValid: true,
          model: data.model || 'claude-3-sonnet-20240229',
          message: 'Cheia API Anthropic este configurată și validă'
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200
        }
      );
    } catch (error) {
      console.error('Eroare la validarea cheii Anthropic:', error);
      
      return new Response(
        JSON.stringify({ 
          hasKey: true,
          isValid: false,
          error: error instanceof Error ? error.message : 'Eroare necunoscută',
          message: 'Cheia API Anthropic este configurată, dar nu a putut fi validată'
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200
        }
      );
    }
  } catch (err) {
    console.error('Eroare neașteptată:', err);
    
    return new Response(
      JSON.stringify({ 
        error: 'Eroare internă',
        message: err instanceof Error ? err.message : 'Eroare necunoscută',
        hasKey: false,
        isValid: false
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});
