
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from './types';

// Extinde tipurile Database pentru a include tabelele noi folosite de agenți
export interface ExtendedDatabase extends Database {
  public: {
    Tables: {
      // Includem tabelele originale
      login_attempts: Database['public']['Tables']['login_attempts'];
      transactions: Database['public']['Tables']['transactions'];
      user_roles: Database['public']['Tables']['user_roles'];
      code_proposals: Database['public']['Tables']['code_proposals'];
      
      // Adăugăm tabelul pentru statistici API Deepseek
      deepseek_api_usage: {
        Row: {
          id: string;
          created_at: string;
          input_tokens: number;
          output_tokens: number;
          total_tokens: number;
          input_cost: number;
          output_cost: number;
          total_cost: number;
          response_time_seconds: number;
          prompt_type: string;
          time_period: string | null;
          is_cache_hit: boolean | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          input_tokens?: number;
          output_tokens?: number;
          total_tokens?: number;
          input_cost?: number;
          output_cost?: number;
          total_cost?: number;
          response_time_seconds?: number;
          prompt_type?: string;
          time_period?: string | null;
          is_cache_hit?: boolean | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          input_tokens?: number;
          output_tokens?: number;
          total_tokens?: number;
          input_cost?: number;
          output_cost?: number;
          total_cost?: number;
          response_time_seconds?: number;
          prompt_type?: string;
          time_period?: string | null;
          is_cache_hit?: boolean | null;
        };
        Relationships: [];
      };
      
      // Adăugăm tabelele noi
      agent_task_submissions: {
        Row: {
          id: string;
          task_id: string;
          agent_id: string;
          proposed_changes: string;
          proposed_status: string;
          proposed_progress: number;
          notes: string | null;
          approval_status: 'pending' | 'approved' | 'rejected';
          created_at: string;
        };
        Insert: {
          id?: string;
          task_id: string;
          agent_id: string;
          proposed_changes: string;
          proposed_status: string; // Made this required to match the base interface
          proposed_progress: number;
          notes?: string | null;
          approval_status?: 'pending' | 'approved' | 'rejected';
          created_at?: string;
        };
        Update: {
          id?: string;
          task_id?: string;
          agent_id?: string;
          proposed_changes?: string;
          proposed_status?: string;
          proposed_progress?: number;
          notes?: string | null;
          approval_status?: 'pending' | 'approved' | 'rejected';
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'agent_task_submissions_task_id_fkey';
            columns: ['task_id'];
            referencedRelation: 'roadmap_tasks';
            referencedColumns: ['id'];
            isOneToOne: false;
          }
        ];
      };
      
      agent_task_progress: {
        Row: {
          id: string;
          task_id: string;
          agent_id: string;
          progress_percentage: number;
          notes: string | null;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          task_id?: string; 
          agent_id: string;
          progress_percentage: number;
          notes?: string | null;
          status: string; // This is already required, which is correct
          created_at?: string;
        };
        Update: {
          id?: string;
          task_id?: string;
          agent_id?: string;
          progress_percentage?: number;
          notes?: string | null;
          status?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'agent_task_progress_task_id_fkey';
            columns: ['task_id'];
            referencedRelation: 'roadmap_tasks';
            referencedColumns: ['id'];
            isOneToOne: false;
          }
        ];
      };
      
      roadmap_tasks: {
        Row: {
          id: string;
          title: string;
          description: string;
          category: string;
          status: string;
          progress: number;
          last_updated_by: string | null;
          last_updated_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          category: string;
          status?: string;
          progress?: number;
          last_updated_by?: string | null;
          last_updated_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          category?: string;
          status?: string;
          progress?: number;
          last_updated_by?: string | null;
          last_updated_at?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    
    // Păstrăm restul definițiilor
    Views: Database['public']['Views'];
    Functions: Database['public']['Functions'];
    Enums: Database['public']['Enums'];
    CompositeTypes: Database['public']['CompositeTypes'];
  }
}

// Import the existing Supabase client
import { supabase as originalSupabase } from './client';

// Define the extended client type
export type ExtendedSupabaseClient = SupabaseClient<ExtendedDatabase>;

// Create and export a properly typed extended client
export const supabase = originalSupabase as unknown as ExtendedSupabaseClient;

// For backward compatibility
export const createExtendedSupabaseClient = () => {
  return supabase;
};
