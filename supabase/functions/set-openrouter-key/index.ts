
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
    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Parse the request body
    const { key } = await req.json();

    // Validare de bază
    if (!key || key.trim() === '') {
      return new Response(JSON.stringify({ error: 'API key cannot be empty' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400
      });
    }

    // Validare format cheie OpenRouter
    if (!key.startsWith('sk-or-')) {
      return new Response(JSON.stringify({ 
        error: 'Format invalid pentru cheia OpenRouter. Cheile OpenRouter încep cu sk-or-' 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400
      });
    }

    console.log('Validare inițială reușită, se testează cheia OpenRouter...');

    // Testăm cheia cu o cerere simplă către API-ul OpenRouter
    try {
      const testResponse = await fetch('https://openrouter.ai/api/v1/models', {
        headers: {
          'Authorization': `Bearer ${key}`,
          'HTTP-Referer': Deno.env.get('SUPABASE_URL') || 'https://tappaygo.com',
          'X-Title': 'TapPayGo Platform'
        }
      });

      if (!testResponse.ok) {
        const errorData = await testResponse.json();
        throw new Error(`Cheie API invalidă: ${errorData.error?.message || 'Eroare necunoscută'}`);
      }

      const modelsData = await testResponse.json();
      const availableModels = modelsData.data?.map((m: any) => m.id) || [];
      
      // Verifică dacă modelele Claude sunt disponibile
      const claudeModels = availableModels.filter((model: string) => 
        model.includes('claude') || model.includes('anthropic')
      );
      
      if (claudeModels.length === 0) {
        console.log('Avertisment: Nu s-au găsit modele Claude disponibile cu această cheie.');
      }

      // Store the OpenRouter API key as a secret
      const { error } = await supabaseClient.functions.setSecret('OPENROUTER_API_KEY', key);

      if (error) {
        console.error('Error setting OpenRouter API key:', error);
        return new Response(JSON.stringify({ 
          error: 'Failed to save API key', 
          details: error.message || 'Unknown error' 
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500
        });
      }

      console.log('OpenRouter API key saved successfully');
      return new Response(JSON.stringify({ 
        message: 'API key saved successfully',
        validated: true,
        availableModels: claudeModels.length > 0 ? claudeModels : [],
        claudeAvailable: claudeModels.length > 0
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      });
    } catch (validationErr) {
      console.error('Error validating OpenRouter key:', validationErr);
      return new Response(JSON.stringify({ 
        error: 'Validarea cheii a eșuat', 
        details: validationErr.message || 'Cheie API invalidă' 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400
      });
    }

  } catch (err) {
    console.error('Unexpected error:', err);
    return new Response(JSON.stringify({ 
      error: 'Internal server error', 
      details: err.message || 'Unknown error' 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500
    });
  }
});
