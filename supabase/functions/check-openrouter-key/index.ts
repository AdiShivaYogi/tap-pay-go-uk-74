
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
    const openrouterApiKey = Deno.env.get('OPENROUTER_API_KEY');
    
    if (!openrouterApiKey) {
      return new Response(JSON.stringify({ 
        hasKey: false,
        message: 'Nu există o cheie OpenRouter configurată'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      });
    }

    // Testăm cheia cu o cerere simplă către API-ul OpenRouter
    try {
      const testResponse = await fetch('https://openrouter.ai/api/v1/models', {
        headers: {
          'Authorization': `Bearer ${openrouterApiKey}`,
          'HTTP-Referer': Deno.env.get('SUPABASE_URL') || 'https://tappaygo.com',
          'X-Title': 'TapPayGo Platform'
        }
      });

      if (!testResponse.ok) {
        const errorData = await testResponse.json();
        return new Response(JSON.stringify({ 
          hasKey: true,
          isValid: false,
          message: `Cheie configurată, dar invalidă: ${errorData.error?.message || 'Eroare necunoscută'}`,
          keyInfo: {
            length: openrouterApiKey.length,
            prefix: `${openrouterApiKey.substring(0, 6)}...`
          }
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200
        });
      }

      // Cheia este validă
      const modelsData = await testResponse.json();
      
      return new Response(JSON.stringify({
        hasKey: true,
        isValid: true,
        message: 'Cheia OpenRouter este configurată și validă',
        keyInfo: {
          length: openrouterApiKey.length,
          prefix: `${openrouterApiKey.substring(0, 6)}...`
        },
        models: modelsData.data?.slice(0, 5).map((m: any) => m.id) || [] // Primele 5 modele disponibile
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      });

    } catch (validationErr) {
      console.error('Eroare la validarea cheii OpenRouter:', validationErr);
      return new Response(JSON.stringify({ 
        hasKey: true,
        isValid: false,
        message: `Eroare la validarea cheii: ${validationErr.message || 'Eroare necunoscută'}`,
        keyInfo: {
          length: openrouterApiKey.length,
          prefix: `${openrouterApiKey.substring(0, 6)}...`
        }
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      });
    }
  } catch (err) {
    console.error('Eroare la verificarea cheii OpenRouter:', err);

    return new Response(JSON.stringify({ 
      error: 'Eroare internă la verificarea cheii API', 
      details: err.message || 'Eroare necunoscută'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500
    });
  }
});
