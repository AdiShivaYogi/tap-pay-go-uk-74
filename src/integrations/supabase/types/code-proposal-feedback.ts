
import type { Database } from '../types';

// Code proposal feedback related types
export interface CodeProposalFeedbackTables {
  code_proposal_feedback: {
    Row: {
      id: string;
      proposal_id: string;
      feedback: string;
      is_approved: boolean;
      is_god_mode: boolean;
      created_at: string;
    };
    Insert: {
      id?: string;
      proposal_id: string;
      feedback: string;
      is_approved: boolean;
      is_god_mode: boolean;
      created_at?: string;
    };
    Update: {
      id?: string;
      proposal_id?: string;
      feedback?: string;
      is_approved?: boolean;
      is_god_mode?: boolean;
      created_at?: string;
    };
    Relationships: [
      {
        foreignKeyName: 'code_proposal_feedback_proposal_id_fkey';
        columns: ['proposal_id'];
        referencedRelation: 'code_proposals';
        referencedColumns: ['id'];
        isOneToOne: false;
      }
    ];
  };
}
