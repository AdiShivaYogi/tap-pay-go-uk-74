
export interface User {
  id: string;
  email: string | undefined;
  stripeConnected: boolean;
  stripeAccountId?: string;
  role?: 'admin' | 'user' | 'moderator';  // Adăugat câmpul role
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  connectStripe: (accountId: string) => Promise<void>;
  disconnectStripe: () => Promise<void>;
}
