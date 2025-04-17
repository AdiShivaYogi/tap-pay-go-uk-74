
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
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check for model column in deepseek_api_usage table
    const { data: columnCheck, error: columnCheckError } = await supabase
      .from('deepseek_api_usage')
      .select('model')
      .limit(1);
    
    // If model column doesn't exist (error), add it
    if (columnCheckError) {
      // Add model column if it doesn't exist
      const { error: alterError } = await supabase.rpc('create_deepseek_api_usage_table');
      
      if (alterError) {
        throw new Error(`Error creating/updating table: ${alterError.message}`);
      }
      
      // Add model column to existing table
      const { error: addColumnError } = await supabase.query(`
        ALTER TABLE deepseek_api_usage 
        ADD COLUMN IF NOT EXISTS model TEXT DEFAULT 'deepseek'
      `);
      
      if (addColumnError) {
        throw new Error(`Error adding model column: ${addColumnError.message}`);
      }
    }
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'API usage table schema updated successfully' 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );
  } catch (error) {
    console.error('Error:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message || 'An unknown error occurred'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});
