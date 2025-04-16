
import { SupabaseClient } from '@supabase/supabase-js';
import { ExtendedDatabase } from './extended-database';

// Define the extended client type
export type ExtendedSupabaseClient = SupabaseClient<ExtendedDatabase>;
