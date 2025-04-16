
import type { Database } from '../types';

// Agent feedback related types
export interface AgentFeedbackTables {
  agent_feedback: {
    Row: {
      id: string;
      submission_id: string;
      feedback: string;
      is_approved: boolean;
      is_god_mode: boolean;
      created_at: string;
    };
    Insert: {
      id?: string;
      submission_id: string;
      feedback: string;
      is_approved: boolean;
      is_god_mode: boolean;
      created_at?: string;
    };
    Update: {
      id?: string;
      submission_id?: string;
      feedback?: string;
      is_approved?: boolean;
      is_god_mode?: boolean;
      created_at?: string;
    };
    Relationships: [
      {
        foreignKeyName: 'agent_feedback_submission_id_fkey';
        columns: ['submission_id'];
        referencedRelation: 'agent_task_submissions';
        referencedColumns: ['id'];
        isOneToOne: false;
      }
    ];
  };
}
