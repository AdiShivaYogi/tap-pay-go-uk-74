
import type { Database } from '../types';
import { 
  AgentTaskSubmissionTables, 
  AgentTaskProgressTables,
  AgentFeedbackTables,
  CodeProposalTables,
  CodeProposalFeedbackTables 
} from './agent-types';
import { ApiUsageTables } from './api-usage-types';
import { AuthTables } from './auth-types';
import { RoadmapTables } from './roadmap-types';
import { TransactionTables } from './transaction-types';

// Extinde tipurile Database pentru a include tabelele noi folosite de agenți
export interface ExtendedDatabase extends Database {
  public: {
    Tables: AuthTables & 
            TransactionTables & 
            AgentTaskSubmissionTables &
            AgentTaskProgressTables &
            AgentFeedbackTables &
            CodeProposalTables &
            CodeProposalFeedbackTables &
            RoadmapTables &
            ApiUsageTables;
    
    // Păstrăm restul definițiilor
    Views: Database['public']['Views'];
    Functions: Database['public']['Functions'];
    Enums: Database['public']['Enums'];
    CompositeTypes: Database['public']['CompositeTypes'];
  }
}
