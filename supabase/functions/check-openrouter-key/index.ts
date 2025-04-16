
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
    // Verificăm dacă cheia este configurată
    const openrouterApiKey = Deno.env.get('OPENROUTER_API_KEY');
    
    if (!openrouterApiKey) {
      return new Response(JSON.stringify({ 
        hasKey: false 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      });
    }

    // Returnăm informații de bază despre cheie (fără să expunem cheia)
    const keyInfo = {
      length: openrouterApiKey.length,
      prefix: `${openrouterApiKey.substring(0, 4)}...`
    };

    return new Response(JSON.stringify({
      hasKey: true,
      keyInfo
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    });

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
