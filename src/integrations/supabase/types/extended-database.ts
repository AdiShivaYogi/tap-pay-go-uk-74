
import type { Database } from '../types';
import { 
  AgentTaskSubmissionTables, 
  AgentTaskProgressTables,
  AgentFeedbackTables,
  CodeProposalTables,
  CodeProposalFeedbackTables,
  AgentActivityTables 
} from './agent-types';
import { ApiUsageTables } from './api-usage-types';
import { AuthTables } from './auth-types';
import { RoadmapTables } from './roadmap-types';
import { TransactionTables } from './transaction-types';

// User preferences table type definition
interface UserPreferencesTables {
  user_preferences: {
    Row: {
      id: string;
      user_id: string;
      god_mode_config: any;
      updated_at: string;
      created_at: string;
    };
    Insert: {
      id?: string;
      user_id: string;
      god_mode_config?: any;
      updated_at?: string;
      created_at?: string;
    };
    Update: {
      id?: string;
      user_id?: string;
      god_mode_config?: any;
      updated_at?: string;
      created_at?: string;
    };
    Relationships: [
      {
        foreignKeyName: "user_preferences_user_id_fkey";
        columns: ["user_id"];
        referencedRelation: "users";
        referencedColumns: ["id"];
      }
    ];
  };
}

// Extinde tipurile Database pentru a include tabelele noi folosite de agenți
export interface ExtendedDatabase {
  public: {
    Tables: Database['public']['Tables'] & 
            AuthTables & 
            TransactionTables & 
            AgentTaskSubmissionTables &
            AgentTaskProgressTables &
            AgentFeedbackTables &
            CodeProposalTables &
            CodeProposalFeedbackTables &
            RoadmapTables &
            ApiUsageTables &
            UserPreferencesTables &
            AgentActivityTables;
    
    // Păstrăm restul definițiilor
    Views: Database['public']['Views'];
    Functions: Database['public']['Functions'];
    Enums: Database['public']['Enums'];
    CompositeTypes: Database['public']['CompositeTypes'];
  }
}
