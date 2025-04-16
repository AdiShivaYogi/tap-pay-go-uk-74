
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const deepseekApiKey = Deno.env.get('DEEPSEEK_API_KEY');

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
    if (!deepseekApiKey) {
      throw new Error("DEEPSEEK_API_KEY nu este configurat.");
    }

    const { 
      submissionId, 
      proposalId,
      agentId, 
      content, 
      type, 
      isGodMode 
    } = await req.json();

    // Construim promptul pentru generarea feedback-ului
    let systemPrompt = `Ești un Agent Supervisor expert în evaluarea și îmbunătățirea propunerilor de la alți agenți AI. 
    Oferă un feedback constructiv, focusat și concis pentru propunerea de mai jos.`;
    
    if (isGodMode) {
      systemPrompt += `\nFuncționezi în God Mode, ceea ce înseamnă că propunerea va fi aprobată automat, dar agentul are nevoie de feedback pentru îmbunătățire continuă.`;
    } else {
      systemPrompt += `\nPropunerea necesită îmbunătățiri înainte de a fi aprobată. Oferă sugestii concrete pentru îmbunătățiri.`;
    }

    // Trimitem prompt-ul către Deepseek API
    const startTime = Date.now();
    
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${deepseekApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: `Evaluează această propunere de la agentul ${agentId}:\n\n${content}`
          }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`Deepseek API a returnat status ${response.status}`);
    }

    const responseData = await response.json();
    const feedback = responseData.choices[0].message.content;
    const endTime = Date.now();
    const responseTimeSeconds = (endTime - startTime) / 1000;

    // Înregistrăm utilizarea API-ului
    await fetch(`${Deno.env.get('SUPABASE_URL')}/rest/v1/deepseek_api_usage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': Deno.env.get('SUPABASE_ANON_KEY') as string,
        'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
      },
      body: JSON.stringify({
        input_tokens: responseData.usage.prompt_tokens,
        output_tokens: responseData.usage.completion_tokens,
        total_tokens: responseData.usage.total_tokens,
        input_cost: (responseData.usage.prompt_tokens * 0.0000005), // Aproximează costul pentru deepseek-chat
        output_cost: (responseData.usage.completion_tokens * 0.0000015), // Aproximează costul pentru deepseek-chat
        total_cost: ((responseData.usage.prompt_tokens * 0.0000005) + (responseData.usage.completion_tokens * 0.0000015)),
        response_time_seconds: responseTimeSeconds,
        prompt_type: 'agent-feedback',
      }),
    });

    // Salvăm feedback-ul în baza de date
    if (submissionId) {
      // Feedback pentru propunere de task
      await fetch(`${Deno.env.get('SUPABASE_URL')}/rest/v1/agent_feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': Deno.env.get('SUPABASE_ANON_KEY') as string,
          'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
        },
        body: JSON.stringify({
          submission_id: submissionId,
          feedback: feedback,
          is_approved: isGodMode,
          is_god_mode: isGodMode
        }),
      });
      
      // Dacă suntem în God Mode, aprobăm automat propunerea
      if (isGodMode) {
        await fetch(`${Deno.env.get('SUPABASE_URL')}/rest/v1/agent_task_submissions?id=eq.${submissionId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'apikey': Deno.env.get('SUPABASE_ANON_KEY') as string,
            'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify({
            approval_status: 'approved',
            notes: `Aprobat automat în God Mode cu feedback`
          }),
        });
      }
    } else if (proposalId) {
      // Feedback pentru propunere de cod
      await fetch(`${Deno.env.get('SUPABASE_URL')}/rest/v1/code_proposal_feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': Deno.env.get('SUPABASE_ANON_KEY') as string,
          'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
        },
        body: JSON.stringify({
          proposal_id: proposalId,
          feedback: feedback,
          is_approved: isGodMode,
          is_god_mode: isGodMode
        }),
      });
      
      // Dacă suntem în God Mode, aprobăm automat propunerea
      if (isGodMode) {
        const currentDate = new Date().toISOString();
        
        await fetch(`${Deno.env.get('SUPABASE_URL')}/rest/v1/code_proposals?id=eq.${proposalId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'apikey': Deno.env.get('SUPABASE_ANON_KEY') as string,
            'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify({
            status: 'approved',
            approved_at: currentDate
          }),
        });
      }
    }

    // Returnăm feedback-ul generat
    return new Response(
      JSON.stringify({
        feedback,
        is_god_mode: isGodMode,
        message: isGodMode ? 'Feedback generat și propunere aprobată automat.' : 'Feedback generat cu succes.'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Eroare în funcția generate-agent-feedback:', error);
    
    return new Response(
      JSON.stringify({ error: error.message || 'A apărut o eroare la generarea feedback-ului.' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
