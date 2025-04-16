
// Main entry point for Supabase integration
import { supabase as originalSupabase } from './client';
export { originalSupabase as supabase } from './client';
export * from './extended-client';
export * from './types-extension';
export * from './types/extended-database';
export * from './types/supabase-client';
export * from './types/agent-types';
export * from './types/api-usage-types';
export * from './types/auth-types';
export * from './types/roadmap-types';
export * from './types/transaction-types';
