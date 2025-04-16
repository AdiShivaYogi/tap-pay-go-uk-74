
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
    
    // Get parameters from request if needed (e.g., date range)
    const { timeframe } = await req.json().catch(() => ({ timeframe: '30d' }));
    
    // Set time filter based on timeframe parameter
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

    // Get aggregated stats
    const { data: statsData, error: statsError } = await supabase
      .from('deepseek_api_usage')
      .select(`
        input_tokens, 
        output_tokens, 
        total_tokens, 
        input_cost,
        output_cost,
        total_cost,
        response_time_seconds
      `)
      .when(timeFilter !== '', true, query => query.filter('created_at', 'gte', timeFilter));

    if (statsError) {
      throw statsError;
    }

    // If there's no data yet, return mock stats
    if (!statsData || statsData.length === 0) {
      const mockStats = {
        totalTokens: 15234,
        totalCost: 2.45,
        totalPrompts: 127,
        avgResponseTime: 2.3
      };
      
      return new Response(
        JSON.stringify(mockStats),
        { 
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json' 
          }
        }
      );
    }

    // Calculate aggregated metrics
    const totalTokens = statsData.reduce((sum, item) => sum + (item.total_tokens || 0), 0);
    const totalCost = statsData.reduce((sum, item) => sum + (item.total_cost || 0), 0);
    const totalPrompts = statsData.length;
    
    // Calculate average response time
    const totalResponseTime = statsData.reduce((sum, item) => sum + (item.response_time_seconds || 0), 0);
    const avgResponseTime = totalPrompts > 0 ? totalResponseTime / totalPrompts : 0;
    
    // Get prompt type distribution
    const { data: promptTypeStats, error: promptTypeError } = await supabase
      .from('deepseek_api_usage')
      .select('prompt_type, count')
      .when(timeFilter !== '', true, query => query.filter('created_at', 'gte', timeFilter))
      .group('prompt_type');

    if (promptTypeError) {
      console.error('Error fetching prompt type stats:', promptTypeError);
    }

    // Prepare response data
    const stats = {
      totalTokens,
      totalCost,
      totalPrompts,
      avgResponseTime,
      promptTypeDistribution: promptTypeStats || []
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
