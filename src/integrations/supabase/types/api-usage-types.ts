
import type { Database } from '../types';

// API usage stats types
export interface ApiUsageTables {
  deepseek_api_usage: {
    Row: {
      id: string;
      created_at: string;
      input_tokens: number;
      output_tokens: number;
      total_tokens: number;
      input_cost: number;
      output_cost: number;
      total_cost: number;
      response_time_seconds: number;
      prompt_type: string;
      time_period: string | null;
      is_cache_hit: boolean | null;
    };
    Insert: {
      id?: string;
      created_at?: string;
      input_tokens?: number;
      output_tokens?: number;
      total_tokens?: number;
      input_cost?: number;
      output_cost?: number;
      total_cost?: number;
      response_time_seconds?: number;
      prompt_type?: string;
      time_period?: string | null;
      is_cache_hit?: boolean | null;
    };
    Update: {
      id?: string;
      created_at?: string;
      input_tokens?: number;
      output_tokens?: number;
      total_tokens?: number;
      input_cost?: number;
      output_cost?: number;
      total_cost?: number;
      response_time_seconds?: number;
      prompt_type?: string;
      time_period?: string | null;
      is_cache_hit?: boolean | null;
    };
    Relationships: [];
  };
}
