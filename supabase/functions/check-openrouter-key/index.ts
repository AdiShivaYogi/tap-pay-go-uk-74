
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

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
    const apiKey = Deno.env.get('OPENROUTER_API_KEY');
    
    if (!apiKey) {
      return new Response(
        JSON.stringify({ hasKey: false, isValid: false, message: 'Cheia API pentru OpenRouter nu este configurată' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Facem o cerere simplă către API pentru a verifica validitatea cheii
    // Folosim un prompt minimal pentru a economisi tokeni
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': Deno.env.get('SUPABASE_URL') || 'https://tappaygo.com',
        'X-Title': 'TapPayGo Platform'
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3-haiku',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: 'Just respond with OK for API validation.' }
        ],
        temperature: 0,
        max_tokens: 10
      })
    });
    
    const isValid = response.ok;
    let message = isValid ? 'Cheia API pentru OpenRouter este validă' : 'Cheia API pentru OpenRouter este invalidă';
    
    if (!isValid) {
      const errorData = await response.json();
      message = `Eroare validare API OpenRouter: ${errorData.error?.message || errorData.error || 'Eroare necunoscută'}`;
    }
    
    return new Response(
      JSON.stringify({ hasKey: true, isValid, message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ hasKey: true, isValid: false, message: `Eroare la testarea API-ului OpenRouter: ${err.message}` }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
