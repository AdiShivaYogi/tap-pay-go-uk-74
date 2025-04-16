
import type { Database } from '../types';

// Agent task submissions related types
export interface AgentTaskSubmissionTables {
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
      proposed_status: string;
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
}
