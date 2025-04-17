
import { AgentTaskSubmissionTables } from './agent-task-submissions';
import { AgentTaskProgressTables } from './agent-task-progress';
import { AgentFeedbackTables } from './agent-feedback';
import { CodeProposalTables } from './code-proposals';
import { CodeProposalFeedbackTables } from './code-proposal-feedback';

// Definirea tabelelor pentru monitorizarea activității agenților
export interface AgentActivityTables {
  agent_activity: {
    Row: {
      id: string;
      agent_id: string;
      agent_name: string;
      category: string;
      action: string;
      created_at: string;
    };
    Insert: {
      id?: string;
      agent_id: string;
      agent_name: string;
      category: string;
      action?: string;
      created_at?: string;
    };
    Update: {
      id?: string;
      agent_id?: string;
      agent_name?: string;
      category?: string;
      action?: string;
      created_at?: string;
    };
    Relationships: [];
  };
  
  agent_activity_logs: {
    Row: {
      id: string;
      agent_id: string;
      agent_name: string;
      category: string;
      description: string;
      timestamp: string;
    };
    Insert: {
      id?: string;
      agent_id: string;
      agent_name: string;
      category: string;
      description: string;
      timestamp?: string;
    };
    Update: {
      id?: string;
      agent_id?: string;
      agent_name?: string;
      category?: string;
      description?: string;
      timestamp?: string;
    };
    Relationships: [];
  };
}

// Re-export all agent related types
export type { 
  AgentTaskSubmissionTables,
  AgentTaskProgressTables,
  AgentFeedbackTables,
  CodeProposalTables,
  CodeProposalFeedbackTables,
  AgentActivityTables
};

// Export a combined type for backward compatibility
export interface AgentTaskSubmissionTablesComplete extends 
  AgentTaskSubmissionTables,
  AgentTaskProgressTables,
  AgentFeedbackTables {}

// Export a combined type for backward compatibility
export interface CodeProposalTablesComplete extends 
  CodeProposalTables,
  CodeProposalFeedbackTables {}
