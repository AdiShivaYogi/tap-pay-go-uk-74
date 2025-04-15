
export type User = {
  id: string;
  email?: string;
  stripeConnected: boolean;
  stripeAccountId?: string;
};

export type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  connectStripe: (accountId: string) => Promise<void>;
  disconnectStripe: () => Promise<void>;
};
