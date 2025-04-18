
export interface User {
  id: string;
  email: string | undefined;
  stripeConnected: boolean;
  stripeAccountId?: string;
  role?: 'admin' | 'user' | 'moderator';
  isAdmin?: boolean;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{error?: any}>;
  signOut: () => Promise<void>;
  connectStripe: (accountId: string) => Promise<void>;
  disconnectStripe: () => Promise<void>;
}
