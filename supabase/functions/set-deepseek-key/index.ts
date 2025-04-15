
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

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

    // Validate the key is not empty
    if (!key || key.trim() === '') {
      return new Response(JSON.stringify({ error: 'API key cannot be empty' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400
      });
    }

    console.log('Attempting to save Deepseek API key...');

    try {
      // Store the Deepseek API key as a secret
      const { error } = await supabaseClient.functions.setSecret('DEEPSEEK_API_KEY', key);

      if (error) {
        console.error('Error setting Deepseek API key:', error);
        return new Response(JSON.stringify({ 
          error: 'Failed to save API key', 
          details: error.message || 'Unknown error' 
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500
        });
      }

      console.log('Deepseek API key saved successfully');
      return new Response(JSON.stringify({ message: 'API key saved successfully' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      });
    } catch (setSecretErr) {
      console.error('Error in setSecret operation:', setSecretErr);
      return new Response(JSON.stringify({ 
        error: 'Exception occurred while saving API key', 
        details: setSecretErr.message || 'Unknown error during setSecret' 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
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
