
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
    const apiKey = Deno.env.get('ANTHROPIC_API_KEY');
    
    if (!apiKey) {
      return new Response(
        JSON.stringify({ hasKey: false, isValid: false, message: 'Cheia API pentru Anthropic nu este configurată' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Facem o cerere simplă către API pentru a verifica validitatea cheii
    // Folosim un prompt minimal pentru a economisi tokeni
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        messages: [
          { role: 'user', content: 'Just respond with "OK" for API validation.' }
        ],
        temperature: 0,
        max_tokens: 10
      })
    });
    
    const isValid = response.ok;
    let message = isValid ? 'Cheia API pentru Anthropic este validă' : 'Cheia API pentru Anthropic este invalidă';
    
    if (!isValid) {
      const errorData = await response.json();
      message = `Eroare validare API Anthropic: ${errorData.error?.message || 'Eroare necunoscută'}`;
    }
    
    return new Response(
      JSON.stringify({ hasKey: true, isValid, message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ hasKey: true, isValid: false, message: `Eroare la testarea API-ului Anthropic: ${err.message}` }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
