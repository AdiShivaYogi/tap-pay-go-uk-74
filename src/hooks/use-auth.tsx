
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';

type User = {
  id: string;
  email?: string;
  stripeConnected: boolean;
  stripeAccountId?: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  connectStripe: (accountId: string) => Promise<void>;
  disconnectStripe: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulăm un user autentificat pentru demo
    const simulateAuth = () => {
      setUser({
        id: 'demo-user-id',
        email: 'demo@example.com',
        stripeConnected: true,
        stripeAccountId: 'acct_demo123456'
      });
      setLoading(false);
    };
    
    setTimeout(simulateAuth, 1000);
    
    // În implementarea reală, vom folosi Supabase Auth
    // const { data: { subscription } } = supabase.auth.onAuthStateChange(
    //   (event, session) => {
    //     if (session) {
    //       setUser({
    //         id: session.user.id,
    //         email: session.user.email,
    //         stripeConnected: false, // Vom actualiza din baza de date
    //       });
    //     } else {
    //       setUser(null);
    //     }
    //     setLoading(false);
    //   }
    // );
    // return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      // În implementarea reală
      // const { error } = await supabase.auth.signInWithPassword({ email, password });
      // if (error) throw error;
      
      // Pentru demo, simulăm autentificarea
      setUser({
        id: 'demo-user-id',
        email: email,
        stripeConnected: true,
        stripeAccountId: 'acct_demo123456'
      });
    } catch (error) {
      console.error('Eroare la autentificare:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      // În implementarea reală
      // await supabase.auth.signOut();
      
      // Pentru demo
      setUser(null);
    } catch (error) {
      console.error('Eroare la deconectare:', error);
    } finally {
      setLoading(false);
    }
  };

  const connectStripe = async (accountId: string) => {
    try {
      setLoading(true);
      // În implementarea reală vom actualiza în baza de date
      // await supabase.from('profiles').update({ 
      //   stripe_connected: true,
      //   stripe_account_id: accountId 
      // }).eq('id', user?.id);
      
      // Pentru demo
      if (user) {
        setUser({
          ...user,
          stripeConnected: true,
          stripeAccountId: accountId
        });
      }
    } catch (error) {
      console.error('Eroare la conectarea Stripe:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const disconnectStripe = async () => {
    try {
      setLoading(true);
      // În implementarea reală
      // await supabase.from('profiles').update({ 
      //   stripe_connected: false,
      //   stripe_account_id: null
      // }).eq('id', user?.id);
      
      // Pentru demo
      if (user) {
        setUser({
          ...user,
          stripeConnected: false,
          stripeAccountId: undefined
        });
      }
    } catch (error) {
      console.error('Eroare la deconectarea Stripe:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signOut,
        connectStripe,
        disconnectStripe
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth trebuie folosit în interiorul unui AuthProvider');
  }
  return context;
};
