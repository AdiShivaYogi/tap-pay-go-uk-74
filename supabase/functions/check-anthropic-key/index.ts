
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
    console.log("[check-anthropic-key] Verificare cheie Anthropic API...");
    const apiKey = Deno.env.get('ANTHROPIC_API_KEY');
    
    if (!apiKey) {
      console.log("[check-anthropic-key] Nu s-a găsit cheia API pentru Anthropic");
      return new Response(
        JSON.stringify({ hasKey: false, isValid: false, message: 'Cheia API pentru Anthropic nu este configurată' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Cheie găsită, verificăm dacă e validă
    console.log("[check-anthropic-key] Cheie API găsită, se verifică validitatea...");
    
    // Afișăm primele și ultimele caractere pentru a ajuta la debugging
    const keyStart = apiKey.substring(0, 8);
    const keyEnd = apiKey.substring(apiKey.length - 4);
    console.log(`[check-anthropic-key] Cheie găsită: ${keyStart}...${keyEnd}`);
    
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
    let modelInfo = null;
    
    if (isValid) {
      const responseData = await response.json();
      modelInfo = responseData.model || 'claude-3-haiku-20240307';
      console.log(`[check-anthropic-key] Verificare reușită. Model disponibil: ${modelInfo}`);
    } else {
      try {
        const errorData = await response.json();
        message = `Eroare validare API Anthropic: ${errorData.error?.message || 'Eroare necunoscută'}`;
        console.error(`[check-anthropic-key] Eroare validare: ${message}`);
      } catch (jsonError) {
        message = `Eroare validare API Anthropic: Cod HTTP ${response.status}`;
        console.error(`[check-anthropic-key] Eroare la parsarea răspunsului de eroare: ${jsonError.message}`);
      }
    }
    
    return new Response(
      JSON.stringify({ 
        hasKey: true, 
        isValid, 
        message,
        model: modelInfo,
        timestamp: new Date().toISOString() 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error(`[check-anthropic-key] Eroare neașteptată: ${err.message}`);
    return new Response(
      JSON.stringify({ 
        hasKey: true, 
        isValid: false, 
        message: `Eroare la testarea API-ului Anthropic: ${err.message}`,
        error: err.toString(),
        timestamp: new Date().toISOString() 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
