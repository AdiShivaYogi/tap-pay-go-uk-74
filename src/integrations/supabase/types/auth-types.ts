
import type { Database } from '../types';

// Authentication related types
export interface AuthTables {
  login_attempts: Database['public']['Tables']['login_attempts'];
  user_roles: Database['public']['Tables']['user_roles'];
}
