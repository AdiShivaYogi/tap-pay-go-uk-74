
export interface Transaction {
  id: string;
  user_id: string;
  amount: number;
  status: 'completed' | 'failed' | 'pending';
  created_at: string;
}
