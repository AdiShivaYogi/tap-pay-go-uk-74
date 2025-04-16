
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
    const deepseekApiKey = Deno.env.get('DEEPSEEK_API_KEY');
    if (!deepseekApiKey) {
      throw new Error('Cheia API Deepseek nu este configurată');
    }

    // Obținem parametrii din cerere
    const { message, agentId, agentType, agentDescription, context, activeTask } = await req.json();
    
    if (!message) {
      return new Response(
        JSON.stringify({ error: 'Mesajul este obligatoriu' }), 
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400
        }
      );
    }

    // Construim prompt-ul pentru Deepseek, acum cu context despre taskuri
    const systemPrompt = `
      Ești un agent AI specializat în ${agentType} cu următorul profil:
      - ID: ${agentId}
      - Descriere: ${agentDescription}
      - Rolul tău este să ajuți utilizatorii cu întrebări despre TapPayGo, o platformă de procesare plăți.
      - Răspunde profesionist, concis și cu informații precise despre sistemul de plăți.
      
      ${context ? `CONTEXT IMPORTANT: ${context}` : ''}
      ${activeTask ? `TASK ACTIV: Lucrezi la taskul "${activeTask.title}" - ${activeTask.description}. Progres curent: ${activeTask.progress}%.` : ''}
      
      Dacă utilizatorul te întreabă despre un task la care lucrezi, oferă detalii despre progresul tău și ce ai realizat. 
      Dacă utilizatorul îți cere să lucrezi la un task, analizează cum poți contribui și sugerează pași concreți.
      
      Dacă nu știi răspunsul, recunoaște-ți limitarea și sugerează unde utilizatorul ar putea găsi informația.
      
      Când răspunzi despre taskuri din roadmap, estimează și un progres realizat (un număr între 0-100%).
    `;

    // Facem cererea către API-ul Deepseek
    console.log('Se trimite cererea la Deepseek API...');
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${deepseekApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 800
      })
    });

    // Verificăm răspunsul de la Deepseek
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Eroare API Deepseek:', errorData);
      throw new Error(`Eroare API Deepseek: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    console.log('Răspuns primit de la Deepseek API:', data);
    const generatedResponse = data.choices?.[0]?.message?.content || "Nu am putut genera un răspuns.";

    // Analizăm răspunsul pentru a vedea dacă include informații despre progresul taskului
    let taskUpdate = null;
    if (activeTask && generatedResponse.includes("progres") || generatedResponse.includes("lucrez la")) {
      // Extragere simplă a unui număr de progres, poate fi îmbunătățită
      const progressMatch = generatedResponse.match(/progres[^\d]*(\d+)%/i);
      if (progressMatch && progressMatch[1]) {
        const progress = parseInt(progressMatch[1]);
        if (progress >= 0 && progress <= 100) {
          taskUpdate = {
            progress: progress,
            notes: "Actualizare automată din conversație"
          };
        }
      }
    }

    return new Response(
      JSON.stringify({ 
        response: generatedResponse,
        taskUpdate: taskUpdate
      }), 
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );
  } catch (err) {
    console.error('Eroare în generate-agent-response:', err);
    return new Response(
      JSON.stringify({ 
        error: 'Eroare la generarea răspunsului', 
        details: err instanceof Error ? err.message : 'Eroare necunoscută' 
      }), 
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});
