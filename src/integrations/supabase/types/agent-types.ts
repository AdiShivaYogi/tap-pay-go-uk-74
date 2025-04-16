
import { AgentTaskSubmissionTables } from './agent-task-submissions';
import { AgentTaskProgressTables } from './agent-task-progress';
import { AgentFeedbackTables } from './agent-feedback';
import { CodeProposalTables } from './code-proposals';
import { CodeProposalFeedbackTables } from './code-proposal-feedback';

// Re-export all agent related types
export type { 
  AgentTaskSubmissionTables,
  AgentTaskProgressTables,
  AgentFeedbackTables,
  CodeProposalTables,
  CodeProposalFeedbackTables
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
