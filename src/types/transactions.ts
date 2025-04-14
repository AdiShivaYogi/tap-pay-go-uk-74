
export interface Transaction {
  id: string;
  user_id: string;
  amount: number;
  status: 'completed' | 'failed' | 'pending' | 'expired' | string;
  created_at: string;
  currency?: string;
  stripe_session_id?: string;
  stripe_payment_intent_id?: string;
  updated_at?: string;
}
