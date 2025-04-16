
import type { Database } from '../types';

// Agent-related types
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
