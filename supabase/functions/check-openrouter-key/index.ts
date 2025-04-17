
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

    // Obținem cheia API OpenRouter din secretele funcției
    const openrouterApiKey = Deno.env.get('OPENROUTER_API_KEY');

    // Verificăm dacă cheia există
    if (!openrouterApiKey) {
      return new Response(
        JSON.stringify({ 
          hasKey: false,
          isValid: false,
          message: 'Cheia API OpenRouter nu este configurată'
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200
        }
      );
    }

    // Verificăm dacă cheia este validă făcând o cerere simplă către API-ul OpenRouter pentru a lista modelele
    try {
      const response = await fetch('https://openrouter.ai/api/v1/models', {
        headers: {
          'Authorization': `Bearer ${openrouterApiKey}`,
          'HTTP-Referer': Deno.env.get('SUPABASE_URL') || 'https://tappaygo.com',
          'X-Title': 'TapPayGo Platform'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Răspuns negativ de la API-ul OpenRouter:', errorData);
        
        return new Response(
          JSON.stringify({ 
            hasKey: true,
            isValid: false,
            error: errorData.error?.message || 'Răspuns invalid de la API',
            message: 'Cheia API OpenRouter este configurată, dar nu este validă'
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200
          }
        );
      }

      const data = await response.json();
      const models = data.data?.map((model: any) => model.id) || [];
      
      // Verificăm dacă avem modele Claude disponibile
      const claudeModels = models.filter((model: string) => 
        model.toLowerCase().includes('claude') || 
        model.toLowerCase().includes('anthropic')
      );
      
      return new Response(
        JSON.stringify({ 
          hasKey: true,
          isValid: true,
          claudeAvailable: claudeModels.length > 0,
          models: models,
          message: 'Cheia API OpenRouter este configurată și validă'
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200
        }
      );
    } catch (error) {
      console.error('Eroare la validarea cheii OpenRouter:', error);
      
      return new Response(
        JSON.stringify({ 
          hasKey: true,
          isValid: false,
          error: error instanceof Error ? error.message : 'Eroare necunoscută',
          message: 'Cheia API OpenRouter este configurată, dar nu a putut fi validată'
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
