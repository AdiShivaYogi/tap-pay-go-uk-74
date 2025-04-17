
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
    // Verificăm dacă cheia este configurată
    const anthropicApiKey = Deno.env.get('ANTHROPIC_API_KEY');
    
    if (!anthropicApiKey) {
      return new Response(JSON.stringify({ 
        hasKey: false,
        message: 'Nu există o cheie Anthropic configurată'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      });
    }

    // Testăm cheia cu o cerere simplă către API-ul Anthropic
    try {
      const testResponse = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': anthropicApiKey,
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
        return new Response(JSON.stringify({ 
          hasKey: true,
          isValid: false,
          message: `Cheie configurată, dar invalidă: ${errorData.error?.message || 'Eroare necunoscută'}`,
          keyInfo: {
            length: anthropicApiKey.length,
            prefix: `${anthropicApiKey.substring(0, 8)}...`
          }
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200
        });
      }

      // Cheia este validă
      const responseData = await testResponse.json();
      const model = responseData.model || "claude-3-sonnet-20240229";
      
      return new Response(JSON.stringify({
        hasKey: true,
        isValid: true,
        message: 'Cheia Anthropic este configurată și validă',
        keyInfo: {
          length: anthropicApiKey.length,
          prefix: `${anthropicApiKey.substring(0, 8)}...`
        },
        model: model
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      });

    } catch (validationErr) {
      console.error('Eroare la validarea cheii Anthropic:', validationErr);
      return new Response(JSON.stringify({ 
        hasKey: true,
        isValid: false,
        message: `Eroare la validarea cheii: ${validationErr.message || 'Eroare necunoscută'}`,
        keyInfo: {
          length: anthropicApiKey.length,
          prefix: `${anthropicApiKey.substring(0, 8)}...`
        }
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      });
    }
  } catch (err) {
    console.error('Eroare la verificarea cheii Anthropic:', err);

    return new Response(JSON.stringify({ 
      error: 'Eroare internă la verificarea cheii API', 
      details: err.message || 'Eroare necunoscută'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500
    });
  }
});
