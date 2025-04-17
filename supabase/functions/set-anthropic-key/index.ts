
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

    // Validare format cheie Anthropic
    if (!key.startsWith('sk-ant-')) {
      return new Response(JSON.stringify({ 
        error: 'Format invalid pentru cheia Anthropic. Cheile Anthropic încep cu sk-ant-' 
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
            { role: 'user', content: 'Hello' }
          ]
        })
      });

      if (!testResponse.ok) {
        const errorData = await testResponse.json();
        throw new Error(`Cheie API invalidă: ${errorData.error?.message || 'Eroare necunoscută'}`);
      }

      const responseData = await testResponse.json();
      const availableModel = responseData.model || 'claude-3-sonnet-20240229';
      
      // Store the Anthropic API key as a secret
      const { error } = await supabaseClient.functions.setSecret('ANTHROPIC_API_KEY', key);

      if (error) {
        console.error('Error setting Anthropic API key:', error);
        return new Response(JSON.stringify({ 
          error: 'Failed to save API key', 
          details: error.message || 'Unknown error' 
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500
        });
      }

      console.log('Anthropic API key saved successfully');
      return new Response(JSON.stringify({ 
        message: 'API key saved successfully',
        validated: true,
        availableModel: availableModel
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      });
    } catch (validationErr) {
      console.error('Error validating Anthropic key:', validationErr);
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
