
// Import the existing Supabase client
import { supabase as originalSupabase } from './client';
import { ExtendedSupabaseClient } from './types/supabase-client';

// Create and export a properly typed extended client
export const extendedSupabase = originalSupabase as unknown as ExtendedSupabaseClient;

// For backward compatibility
export const createExtendedSupabaseClient = () => {
  return extendedSupabase;
};

// Re-export with the original name for backward compatibility
// but this should be gradually replaced with extendedSupabase in new code
export { extendedSupabase as supabase };
