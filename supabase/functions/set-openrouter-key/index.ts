
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
      return new Response(JSON.stringify({ 
        error: 'Cheia API nu poate fi goală',
        userMessage: 'Vă rugăm să introduceți o cheie API validă.'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400
      });
    }

    // Validare format cheie OpenRouter - strict pentru cheile care încep cu sk_or
    const openrouterKeyRegex = /^sk_or_[a-zA-Z0-9]+$/;
    if (!openrouterKeyRegex.test(key)) {
      return new Response(JSON.stringify({ 
        error: 'Format invalid pentru cheia OpenRouter',
        userMessage: 'Cheia OpenRouter trebuie să înceapă cu sk_or_ și să conțină doar caractere alfanumerice.'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400
      });
    }

    console.log('Validare inițială reușită, se testează cheia OpenRouter...');

    // Testăm cheia cu o cerere simplă către API-ul OpenRouter pentru a lista modelele disponibile
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
        console.error('Răspuns negativ de la API-ul OpenRouter:', errorData);
        throw new Error(`Cheie API invalidă: ${errorData.error?.message || 'Eroare necunoscută'}`);
      }

      const responseData = await testResponse.json();
      const availableModels = responseData.data?.map((model: any) => model.id) || [];
      
      // Stocăm cheia în secretele Supabase
      const { error } = await supabaseClient.functions.setSecret('OPENROUTER_API_KEY', key);

      if (error) {
        console.error('Eroare la salvarea cheii OpenRouter:', error);
        return new Response(JSON.stringify({ 
          error: 'Nu s-a putut salva cheia API', 
          userMessage: 'A apărut o problemă la salvarea cheii. Vă rugăm să încercați din nou.',
          details: error.message || 'Eroare la salvarea secretului'
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500
        });
      }

      console.log('Cheia OpenRouter a fost salvată cu succes');
      return new Response(JSON.stringify({ 
        message: 'Cheie API salvată cu succes',
        validated: true,
        models: availableModels,
        userMessage: 'Cheia API OpenRouter a fost configurată și validată cu succes.'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      });

    } catch (validationErr) {
      console.error('Eroare la validarea cheii OpenRouter:', validationErr);
      return new Response(JSON.stringify({ 
        error: 'Validarea cheii a eșuat', 
        userMessage: 'Cheia API nu este validă. Vă rugăm să verificați și să încercați din nou.',
        details: validationErr.message || 'Cheie API invalidă' 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400
      });
    }

  } catch (err) {
    console.error('Eroare neașteptată:', err);
    return new Response(JSON.stringify({ 
      error: 'Eroare internă', 
      userMessage: 'A apărut o eroare internă. Vă rugăm să încercați din nou mai târziu.',
      details: err.message || 'Eroare necunoscută' 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500
    });
  }
});
