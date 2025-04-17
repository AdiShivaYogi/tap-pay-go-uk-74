export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      agent_activity: {
        Row: {
          action: string
          agent_id: string
          agent_name: string
          category: string
          created_at: string
          id: string
        }
        Insert: {
          action?: string
          agent_id: string
          agent_name: string
          category: string
          created_at?: string
          id?: string
        }
        Update: {
          action?: string
          agent_id?: string
          agent_name?: string
          category?: string
          created_at?: string
          id?: string
        }
        Relationships: []
      }
      agent_activity_logs: {
        Row: {
          agent_id: string
          agent_name: string
          category: string
          description: string
          id: string
          timestamp: string
        }
        Insert: {
          agent_id: string
          agent_name: string
          category: string
          description: string
          id?: string
          timestamp?: string
        }
        Update: {
          agent_id?: string
          agent_name?: string
          category?: string
          description?: string
          id?: string
          timestamp?: string
        }
        Relationships: []
      }
      agent_task_progress: {
        Row: {
          agent_id: string
          created_at: string | null
          id: string
          notes: string | null
          progress_percentage: number
          status: string
          task_id: string | null
        }
        Insert: {
          agent_id: string
          created_at?: string | null
          id?: string
          notes?: string | null
          progress_percentage: number
          status: string
          task_id?: string | null
        }
        Update: {
          agent_id?: string
          created_at?: string | null
          id?: string
          notes?: string | null
          progress_percentage?: number
          status?: string
          task_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agent_task_progress_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "roadmap_tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_task_submissions: {
        Row: {
          agent_id: string
          approval_status: string
          created_at: string | null
          id: string
          notes: string | null
          proposed_changes: string
          proposed_progress: number
          proposed_status: string
          task_id: string | null
        }
        Insert: {
          agent_id: string
          approval_status?: string
          created_at?: string | null
          id?: string
          notes?: string | null
          proposed_changes: string
          proposed_progress: number
          proposed_status: string
          task_id?: string | null
        }
        Update: {
          agent_id?: string
          approval_status?: string
          created_at?: string | null
          id?: string
          notes?: string | null
          proposed_changes?: string
          proposed_progress?: number
          proposed_status?: string
          task_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agent_task_submissions_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "roadmap_tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      code_proposals: {
        Row: {
          agent_id: string
          approved_at: string | null
          approved_by: string | null
          created_at: string
          id: string
          motivation: string
          proposed_code: string
          proposed_files: string
          rejected_at: string | null
          rejected_by: string | null
          rejection_reason: string | null
          status: string
        }
        Insert: {
          agent_id: string
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
          id?: string
          motivation: string
          proposed_code: string
          proposed_files: string
          rejected_at?: string | null
          rejected_by?: string | null
          rejection_reason?: string | null
          status?: string
        }
        Update: {
          agent_id?: string
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
          id?: string
          motivation?: string
          proposed_code?: string
          proposed_files?: string
          rejected_at?: string | null
          rejected_by?: string | null
          rejection_reason?: string | null
          status?: string
        }
        Relationships: []
      }
      deepseek_api_usage: {
        Row: {
          created_at: string
          id: string
          input_cost: number
          input_tokens: number
          is_cache_hit: boolean | null
          output_cost: number
          output_tokens: number
          prompt_type: string
          response_time_seconds: number
          time_period: string | null
          total_cost: number
          total_tokens: number
        }
        Insert: {
          created_at?: string
          id?: string
          input_cost?: number
          input_tokens?: number
          is_cache_hit?: boolean | null
          output_cost?: number
          output_tokens?: number
          prompt_type?: string
          response_time_seconds?: number
          time_period?: string | null
          total_cost?: number
          total_tokens?: number
        }
        Update: {
          created_at?: string
          id?: string
          input_cost?: number
          input_tokens?: number
          is_cache_hit?: boolean | null
          output_cost?: number
          output_tokens?: number
          prompt_type?: string
          response_time_seconds?: number
          time_period?: string | null
          total_cost?: number
          total_tokens?: number
        }
        Relationships: []
      }
      login_attempts: {
        Row: {
          attempt_count: number | null
          created_at: string | null
          email: string
          id: string
          last_attempt: string | null
          locked_until: string | null
        }
        Insert: {
          attempt_count?: number | null
          created_at?: string | null
          email: string
          id?: string
          last_attempt?: string | null
          locked_until?: string | null
        }
        Update: {
          attempt_count?: number | null
          created_at?: string | null
          email?: string
          id?: string
          last_attempt?: string | null
          locked_until?: string | null
        }
        Relationships: []
      }
      roadmap_tasks: {
        Row: {
          category: string
          created_at: string | null
          description: string
          id: string
          last_updated_at: string | null
          last_updated_by: string | null
          progress: number | null
          status: string
          title: string
        }
        Insert: {
          category: string
          created_at?: string | null
          description: string
          id?: string
          last_updated_at?: string | null
          last_updated_by?: string | null
          progress?: number | null
          status?: string
          title: string
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string
          id?: string
          last_updated_at?: string | null
          last_updated_by?: string | null
          progress?: number | null
          status?: string
          title?: string
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number
          created_at: string
          currency: string
          id: string
          status: string
          stripe_payment_intent_id: string | null
          stripe_session_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string
          id?: string
          status: string
          stripe_payment_intent_id?: string | null
          stripe_session_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          id?: string
          status?: string
          stripe_payment_intent_id?: string | null
          stripe_session_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_login_attempts: {
        Args: { p_email: string }
        Returns: {
          is_locked: boolean
          minutes_left: number
        }[]
      }
      create_deepseek_api_usage_table: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      record_failed_attempt: {
        Args: { p_email: string }
        Returns: {
          is_locked: boolean
          minutes_left: number
        }[]
      }
      user_has_role: {
        Args: { _role: Database["public"]["Enums"]["app_role"] }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user" | "moderator"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user", "moderator"],
    },
  },
} as const
