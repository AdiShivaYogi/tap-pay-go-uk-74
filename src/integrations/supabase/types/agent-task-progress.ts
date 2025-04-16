
import type { Database } from '../types';

// Agent task progress related types
export interface AgentTaskProgressTables {
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
      status: string;
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
}
