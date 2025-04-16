
// Import the existing Supabase client
import { supabase as originalSupabase } from './client';
import { ExtendedSupabaseClient } from './types/supabase-client';

// Create and export a properly typed extended client
export const supabase = originalSupabase as unknown as ExtendedSupabaseClient;

// For backward compatibility
export const createExtendedSupabaseClient = () => {
  return supabase;
};
