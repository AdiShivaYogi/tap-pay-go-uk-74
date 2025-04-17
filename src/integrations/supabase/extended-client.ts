
import { createClient } from '@supabase/supabase-js';
import { ExtendedSupabaseClient } from './types/supabase-client';
import { ExtendedDatabase } from './types/extended-database';

// Utilizăm aceleași credențiale ca și în clientul standard
const SUPABASE_URL = "https://utraomhphgnnrpyfwwla.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0cmFvbWhwaGdubnJweWZ3d2xhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzMDg4MDgsImV4cCI6MjA1OTg4NDgwOH0.wID5Ipuy1uoFe0aRHXel0dCdavGewz1hn6W_x73rok8";

// Creăm clientul extins pentru a lucra cu tipurile noastre extinse
export const extendedSupabase = createClient<ExtendedDatabase>(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
) as ExtendedSupabaseClient;

// For backward compatibility
export const createExtendedSupabaseClient = () => {
  return extendedSupabase;
};
