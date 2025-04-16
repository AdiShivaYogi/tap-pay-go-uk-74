
import type { Database } from '../types';

// Roadmap types
export interface RoadmapTables {
  roadmap_tasks: {
    Row: {
      id: string;
      title: string;
      description: string;
      category: string;
      status: string;
      progress: number;
      last_updated_by: string | null;
      last_updated_at: string | null;
      created_at: string;
    };
    Insert: {
      id?: string;
      title: string;
      description: string;
      category: string;
      status?: string;
      progress?: number;
      last_updated_by?: string | null;
      last_updated_at?: string | null;
      created_at?: string;
    };
    Update: {
      id?: string;
      title?: string;
      description?: string;
      category?: string;
      status?: string;
      progress?: number;
      last_updated_by?: string | null;
      last_updated_at?: string | null;
      created_at?: string;
    };
    Relationships: [];
  };
}
