
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { DEEPSEEK_PRICING } from "./models.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

export { corsHeaders };

/**
 * Determines if current time is during off-peak hours (16:30-00:30 UTC)
 * @returns {boolean} True if current time is during off-peak hours
 */
export function isOffPeakHours() {
  const currentUTC = new Date();
  const hours = currentUTC.getUTCHours();
  const minutes = currentUTC.getUTCMinutes();
  
  // Off-peak is between 16:30 UTC and 00:30 UTC
  return (hours > 16 || hours === 0) || (hours === 16 && minutes >= 30) || (hours === 0 && minutes <= 30);
}

/**
 * Calculates token costs based on token count and pricing model
 * @param {number} inputTokens - Number of input tokens
 * @param {number} outputTokens - Number of output tokens
 * @param {boolean} isCacheHit - Whether the input tokens were served from cache
 * @returns {Object} Cost details including input, output and total costs
 */
export function calculateTokenCost(inputTokens, outputTokens, isCacheHit = false) {
  const pricing = isOffPeakHours() ? DEEPSEEK_PRICING.offPeak : DEEPSEEK_PRICING.standard;
  
  const inputCost = (inputTokens / 1000000) * (isCacheHit ? pricing.inputCacheHit : pricing.inputCacheMiss);
  const outputCost = (outputTokens / 1000000) * pricing.output;
  
  return {
    inputCost,
    outputCost,
    totalCost: inputCost + outputCost,
    timePeriod: isOffPeakHours() ? 'off-peak' : 'standard'
  };
}

/**
 * Records token usage in the database
 * @param {Object} supabase - Supabase client
 * @param {number} inputTokens - Number of input tokens
 * @param {number} outputTokens - Number of output tokens
 * @param {number} responseTime - Response time in seconds
 * @param {string} promptType - Type of prompt used
 * @param {boolean} isCacheHit - Whether the input tokens were served from cache
 * @param {string} model - The model used (deepseek, claude, or anthropic)
 */
export async function recordTokenUsage(supabase, inputTokens, outputTokens, responseTime, promptType, isCacheHit = false, model = 'deepseek') {
  try {
    // Only calculate costs for DeepSeek models
    const costDetails = model === 'deepseek' ? calculateTokenCost(inputTokens, outputTokens, isCacheHit) : {
      inputCost: 0,
      outputCost: 0,
      totalCost: 0,
      timePeriod: 'unknown'
    };
    
    const { error } = await supabase.from('deepseek_api_usage').insert({
      input_tokens: inputTokens,
      output_tokens: outputTokens,
      total_tokens: inputTokens + outputTokens,
      input_cost: costDetails.inputCost,
      output_cost: costDetails.outputCost,
      total_cost: costDetails.totalCost,
      response_time_seconds: responseTime,
      prompt_type: promptType,
      time_period: costDetails.timePeriod,
      is_cache_hit: isCacheHit,
      model: model
    });

    if (error) {
      console.error('Error recording token usage:', error);
    }
  } catch (err) {
    console.error('Exception while recording token usage:', err);
  }
}
