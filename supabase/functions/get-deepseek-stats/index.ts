
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseUrl || !supabaseServiceRoleKey) {
      throw new Error('Missing environment variables');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
    
    const { timeframe } = await req.json().catch(() => ({ timeframe: '30d' }));
    
    let timeFilter;
    switch(timeframe) {
      case '7d':
        timeFilter = 'created_at > now() - interval \'7 days\'';
        break;
      case '1d':
        timeFilter = 'created_at > now() - interval \'1 day\'';
        break;
      case 'all':
        timeFilter = '';
        break;
      case '30d':
      default:
        timeFilter = 'created_at > now() - interval \'30 days\'';
        break;
    }

    // Fetch aggregated stats with detailed cost tracking
    const { data: statsData, error: statsError } = await supabase
      .from('deepseek_api_usage')
      .select(`
        input_tokens, 
        output_tokens, 
        total_tokens, 
        input_cost,
        output_cost,
        total_cost,
        response_time_seconds,
        time_period,
        is_cache_hit,
        prompt_type
      `)
      .when(timeFilter !== '', true, query => query.filter('created_at', 'gte', timeFilter));

    if (statsError) {
      throw statsError;
    }

    // Calculate comprehensive metrics
    const totalTokens = statsData.reduce((sum, item) => sum + (item.total_tokens || 0), 0);
    const totalCost = statsData.reduce((sum, item) => sum + (item.total_cost || 0), 0);
    const totalPrompts = statsData.length;
    
    const totalResponseTime = statsData.reduce((sum, item) => sum + (item.response_time_seconds || 0), 0);
    const avgResponseTime = totalPrompts > 0 ? totalResponseTime / totalPrompts : 0;
    
    // Break down costs and tokens by time period and cache hit status
    const periodBreakdown = statsData.reduce((acc, item) => {
      if (!acc[item.time_period]) {
        acc[item.time_period] = { 
          totalTokens: 0, 
          totalCost: 0, 
          promptCount: 0,
          cacheHitRate: 0
        };
      }
      
      acc[item.time_period].totalTokens += item.total_tokens || 0;
      acc[item.time_period].totalCost += item.total_cost || 0;
      acc[item.time_period].promptCount++;
      
      return acc;
    }, {});

    // Prompt type distribution
    const promptTypeDistribution = statsData.reduce((acc, item) => {
      if (!acc[item.prompt_type]) {
        acc[item.prompt_type] = { count: 0, totalCost: 0 };
      }
      acc[item.prompt_type].count++;
      acc[item.prompt_type].totalCost += item.total_cost || 0;
      return acc;
    }, {});

    const stats = {
      totalTokens,
      totalCost: parseFloat(totalCost.toFixed(4)),
      totalPrompts,
      avgResponseTime: parseFloat(avgResponseTime.toFixed(2)),
      periodBreakdown,
      promptTypeDistribution
    };

    return new Response(
      JSON.stringify(stats),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        }
      }
    );

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        }
      }
    );
  }
});
