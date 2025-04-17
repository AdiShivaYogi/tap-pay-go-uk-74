
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

    // Validare format cheie Anthropic - strict pentru cheile care încep cu sk-ant-
    const anthropicKeyRegex = /^sk-ant-[a-zA-Z0-9-_]+$/;
    if (!anthropicKeyRegex.test(key)) {
      return new Response(JSON.stringify({ 
        error: 'Format invalid pentru cheia Anthropic',
        userMessage: 'Cheia Anthropic trebuie să înceapă cu sk-ant- și să conțină doar caractere alfanumerice, liniuțe și underscores.'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400
      });
    }

    console.log('Validare inițială reușită, se testează cheia Anthropic...');

    // Testăm cheia cu o cerere simplă către API-ul Anthropic
    try {
      const testResponse = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': key,
          'anthropic-version': '2023-06-01',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'claude-3-sonnet-20240229',
          max_tokens: 10,
          messages: [
            { role: 'user', content: 'Salut, funcționezi?' }
          ]
        })
      });

      if (!testResponse.ok) {
        const errorData = await testResponse.json();
        throw new Error(`Cheie API invalidă: ${errorData.error?.message || 'Eroare necunoscută'}`);
      }

      const responseData = await testResponse.json();
      const availableModel = responseData.model || 'claude-3-sonnet-20240229';
      
      // Stocăm cheia în secretele Supabase
      const { error } = await supabaseClient.functions.setSecret('ANTHROPIC_API_KEY', key);

      if (error) {
        console.error('Eroare la salvarea cheii Anthropic:', error);
        return new Response(JSON.stringify({ 
          error: 'Nu s-a putut salva cheia API', 
          userMessage: 'A apărut o problemă la salvarea cheii. Vă rugăm să încercați din nou.'
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500
        });
      }

      console.log('Cheia Anthropic a fost salvată cu succes');
      return new Response(JSON.stringify({ 
        message: 'Cheie API salvată cu succes',
        validated: true,
        availableModel: availableModel,
        userMessage: 'Cheia API Anthropic a fost configurată și validată cu succes.'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      });

    } catch (validationErr) {
      console.error('Eroare la validarea cheii Anthropic:', validationErr);
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
