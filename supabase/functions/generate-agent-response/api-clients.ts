
/**
 * Calls the Deepseek API with the provided message and system prompt
 * @param {string} systemPrompt - The system prompt to send to the API
 * @param {string} message - The user message to send to the API
 * @param {string} apiKey - The Deepseek API key
 * @returns {Promise<Object>} The API response
 */
export async function callDeepseekAPI(systemPrompt, message, apiKey) {
  return await fetch('https://api.deepseek.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      temperature: 0.7,
      max_tokens: 1500
    })
  });
}

/**
 * Calls the OpenRouter API to access Claude models
 * @param {string} systemPrompt - The system prompt to send to the API
 * @param {string} message - The user message to send to the API
 * @param {string} apiKey - The OpenRouter API key
 * @returns {Promise<Object>} The API response
 */
export async function callClaudeAPI(systemPrompt, message, apiKey) {
  // Obține modelul preferat din parametri sau folosește un model implicit
  // Preferințe de model în ordine: claude-3.5-sonnet, claude-3-opus, claude-3-sonnet, claude-3-haiku
  const preferredModel = "anthropic/claude-3.5-sonnet";
  const fallbackModels = [
    "anthropic/claude-3-opus:2024-05-16",
    "anthropic/claude-3-sonnet", 
    "anthropic/claude-3-haiku"
  ];
  
  // Prima încercare cu modelul preferat
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': Deno.env.get('SUPABASE_URL') || 'https://tappaygo.com',
        'X-Title': 'TapPayGo Platform'
      },
      body: JSON.stringify({
        model: preferredModel,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 1500
      })
    });
    
    if (response.ok) {
      return response;
    }
    
    // Dacă modelul preferat nu este disponibil, încearcă modelele de rezervă
    const errorData = await response.json();
    console.log(`Modelul preferat ${preferredModel} nu este disponibil: ${errorData.error?.message || 'Eroare necunoscută'}`);
    
    // Încearcă modelele alternative
    for (const fallbackModel of fallbackModels) {
      console.log(`Se încearcă modelul alternativ: ${fallbackModel}`);
      
      const fallbackResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': Deno.env.get('SUPABASE_URL') || 'https://tappaygo.com',
          'X-Title': 'TapPayGo Platform'
        },
        body: JSON.stringify({
          model: fallbackModel,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: message }
          ],
          temperature: 0.7,
          max_tokens: 1500
        })
      });
      
      if (fallbackResponse.ok) {
        console.log(`Se folosește modelul alternativ: ${fallbackModel}`);
        return fallbackResponse;
      }
    }
    
    // Dacă niciun model nu este disponibil, returnează eroarea inițială
    throw new Error(`Niciun model Claude disponibil: ${errorData.error?.message || 'Eroare necunoscută'}`);
    
  } catch (error) {
    console.error('Eroare la apelarea API-ului Claude:', error);
    throw error;
  }
}

/**
 * Calls the Anthropic API directly with the provided message and system prompt
 * @param {string} systemPrompt - The system prompt to send to the API
 * @param {string} message - The user message to send to the API
 * @param {string} apiKey - The Anthropic API key
 * @returns {Promise<Object>} The API response
 */
export async function callAnthropicAPI(systemPrompt, message, apiKey) {
  // Modelul preferat: claude-3-sonnet-20240229 este mai rapid și mai ieftin
  // Alternativ, claude-3-opus-20240229 este mai puternic dar mai scump și lent
  // claude-3-haiku-20240307 este cel mai rapid și ieftin, dar mai limitat
  const preferredModel = "claude-3-sonnet-20240229";
  
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: preferredModel,
        system: systemPrompt,
        messages: [
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 1500
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Eroare API Anthropic: ${errorData.error?.message || 'Eroare necunoscută'}`);
    }
    
    return response;
    
  } catch (error) {
    console.error('Eroare la apelarea API-ului Anthropic:', error);
    throw error;
  }
}
