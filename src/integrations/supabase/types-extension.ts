
// This file is maintained for backward compatibility
// New code should import from the specific files in the types/ directory

import { ExtendedDatabase } from './types/extended-database';
import { ExtendedSupabaseClient } from './types/supabase-client';
import { supabase, createExtendedSupabaseClient } from './extended-client';

export type { ExtendedDatabase, ExtendedSupabaseClient };
export { supabase, createExtendedSupabaseClient };
