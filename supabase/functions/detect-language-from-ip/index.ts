
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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
    // Get client IP from request headers
    const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip');
    
    if (!clientIP) {
      throw new Error('Could not detect client IP');
    }

    // Call a geolocation API to get country code
    const response = await fetch(`http://ip-api.com/json/${clientIP}`);
    const data = await response.json();
    
    // Map country code to language code
    const countryToLang: { [key: string]: string } = {
      'RO': 'RO',
      'GB': 'EN',
      'US': 'EN',
      'FR': 'FR',
      'DE': 'DE',
      'ES': 'ES',
      'IT': 'IT',
      'PT': 'PT',
      'NL': 'NL',
      'PL': 'PL',
      'RU': 'RU'
    };

    const languageCode = countryToLang[data.countryCode] || 'RO';

    return new Response(
      JSON.stringify({ 
        ip_language: languageCode,
        country: data.country 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  } catch (error) {
    console.error('Error:', error.message);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
