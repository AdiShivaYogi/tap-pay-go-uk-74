
import type { Database } from '../types';

// Code proposals related types
export interface CodeProposalTables {
  code_proposals: {
    Row: {
      id: string;
      created_at: string;
      approved_at: string | null;
      approved_by: string | null;
      rejected_at: string | null;
      rejected_by: string | null;
      agent_id: string;
      proposed_files: string;
      proposed_code: string;
      motivation: string;
      status: string;
      rejection_reason: string | null;
    };
    Insert: {
      id?: string;
      created_at?: string;
      approved_at?: string | null;
      approved_by?: string | null;
      rejected_at?: string | null;
      rejected_by?: string | null;
      agent_id: string;
      proposed_files: string;
      proposed_code: string;
      motivation: string;
      status?: string;
      rejection_reason?: string | null;
    };
    Update: {
      id?: string;
      created_at?: string;
      approved_at?: string | null;
      approved_by?: string | null;
      rejected_at?: string | null;
      rejected_by?: string | null;
      agent_id?: string;
      proposed_files?: string;
      proposed_code?: string;
      motivation?: string;
      status?: string;
      rejection_reason?: string | null;
    };
    Relationships: [];
  };
}
