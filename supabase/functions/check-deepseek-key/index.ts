
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

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
    // Verificăm dacă avem o cheie API Deepseek configurată
    const deepseekKey = Deno.env.get('DEEPSEEK_API_KEY');
    
    // Nu trimitem cheia API înapoi, doar dacă există sau nu
    const hasKey = deepseekKey !== null && deepseekKey !== undefined && deepseekKey !== '';
    
    return new Response(
      JSON.stringify({ 
        hasKey,
        // Adăugăm detalii minime pentru debugging, fără a expune cheia
        keyInfo: hasKey ? {
          length: deepseekKey?.length,
          prefix: deepseekKey?.substring(0, 4) + '...'
        } : null
      }), 
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );
  } catch (err) {
    console.error('Eroare în check-deepseek-key:', err);
    return new Response(
      JSON.stringify({ error: 'Eroare la verificarea cheii API', details: err.message }), 
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});
