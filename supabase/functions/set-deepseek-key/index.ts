
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
    // Obținem URL-ul Supabase și cheia de service role din variabilele de mediu
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    // Verificăm dacă avem informațiile necesare pentru a crea clientul Supabase
    if (!supabaseUrl || !supabaseServiceRoleKey) {
      console.error('Lipsesc variabilele de mediu SUPABASE_URL sau SUPABASE_SERVICE_ROLE_KEY');
      return new Response(
        JSON.stringify({ 
          error: 'Configurație lipsă', 
          details: 'Variabilele de mediu necesare nu sunt disponibile' 
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500
        }
      );
    }

    // Creăm clientul Supabase
    const supabaseClient = createClient(supabaseUrl, supabaseServiceRoleKey);

    // Parsăm corpul cererii pentru a obține cheia API
    const requestData = await req.json();
    const { key } = requestData;

    // Validăm cheia API
    if (!key || key.trim() === '') {
      return new Response(
        JSON.stringify({ error: 'Cheia API nu poate fi goală' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400
        }
      );
    }

    console.log('Se încearcă salvarea cheii API Deepseek...');

    try {
      // Salvăm cheia API Deepseek ca secret
      const { error } = await supabaseClient.functions.setSecret('DEEPSEEK_API_KEY', key);

      if (error) {
        console.error('Eroare la setarea cheii API Deepseek:', error);
        return new Response(
          JSON.stringify({ 
            error: 'Nu s-a putut salva cheia API', 
            details: error.message || 'Eroare necunoscută' 
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 500
          }
        );
      }

      console.log('Cheia API Deepseek a fost salvată cu succes');
      
      // Răspundem cu succes
      return new Response(
        JSON.stringify({ success: true, message: 'Cheia API a fost salvată cu succes' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200
        }
      );
    } catch (setSecretErr) {
      console.error('Eroare în operațiunea setSecret:', setSecretErr);
      return new Response(
        JSON.stringify({ 
          error: 'A apărut o excepție la salvarea cheii API', 
          details: setSecretErr instanceof Error ? setSecretErr.message : 'Eroare necunoscută în timpul setSecret' 
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500
        }
      );
    }

  } catch (err) {
    console.error('Eroare neașteptată:', err);
    return new Response(
      JSON.stringify({ 
        error: 'Eroare internă de server', 
        details: err instanceof Error ? err.message : 'Eroare necunoscută' 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});
