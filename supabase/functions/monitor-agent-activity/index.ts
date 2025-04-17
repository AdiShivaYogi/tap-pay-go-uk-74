
// Supabase Edge Function pentru înregistrarea activității agenților
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.5";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request) => {
  // Tratarea CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    // Obținere date din request
    const { agentId, agentName, category, description, action } = await req.json();

    // Validare date
    if (!agentId || !agentName || !category || !description) {
      return new Response(JSON.stringify({ 
        error: "Date lipsă: agentId, agentName, category și description sunt obligatorii." 
      }), { 
        status: 400, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      });
    }

    // Creare client Supabase cu cheile preluate din variabile de mediu
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Înregistrare activitate agent
    const { data: activityData, error: activityError } = await supabaseClient
      .from('agent_activity')
      .insert([
        { 
          agent_id: agentId,
          agent_name: agentName,
          category,
          action: action || 'default'
        }
      ])
      .select();

    if (activityError) {
      throw activityError;
    }

    // Înregistrare log de activitate
    const { data: logData, error: logError } = await supabaseClient
      .from('agent_activity_logs')
      .insert([
        {
          agent_id: agentId,
          agent_name: agentName,
          category,
          description,
          timestamp: new Date().toISOString()
        }
      ])
      .select();

    if (logError) {
      throw logError;
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        activity: activityData?.[0],
        log: logData?.[0]
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );

  } catch (error) {
    console.error("Eroare la înregistrarea activității agentului:", error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
