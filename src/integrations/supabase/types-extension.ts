
import { createClient } from '@supabase/supabase-js';
import { Database } from './types';

// Extinde tipurile Database pentru a include tabelele noi folosite de agenți
export interface ExtendedDatabase extends Database {
  public: {
    Tables: {
      // Includem tabelele originale
      login_attempts: Database['public']['Tables']['login_attempts'];
      transactions: Database['public']['Tables']['transactions'];
      user_roles: Database['public']['Tables']['user_roles'];
      
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
          proposed_status?: string;
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
          task_id: string;
          agent_id: string;
          progress_percentage: number;
          notes?: string | null;
          status?: string;
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

// Client Supabase extins pentru a folosi noile tipuri
export type ExtendedSupabaseClient = ReturnType<typeof createExtendedSupabaseClient>;

// Funcție pentru crearea unui client Supabase extins
export const createExtendedSupabaseClient = () => {
  // Returnăm clientul supabase original, dar cu tipurile extinse
  return supabase as unknown as any;
};

// Re-exportăm clientul Supabase existent pentru a-l folosi cu noile tipuri
import { supabase } from './client';
export { supabase };
