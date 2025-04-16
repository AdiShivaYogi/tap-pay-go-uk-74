
import type { Database } from '../types';

// Transaction related types
export interface TransactionTables {
  transactions: Database['public']['Tables']['transactions'];
}
