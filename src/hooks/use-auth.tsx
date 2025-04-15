
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

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
    // Verificăm sesiunea la încărcarea aplicației
    const checkSession = async () => {
      try {
        setLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        
        // Setăm userul dacă există o sesiune activă
        if (session) {
          const { data: profileData } = await supabase
            .from('profiles')
            .select('stripe_connected, stripe_account_id')
            .eq('id', session.user.id)
            .single();
            
          setUser({
            id: session.user.id,
            email: session.user.email,
            stripeConnected: profileData?.stripe_connected || false,
            stripeAccountId: profileData?.stripe_account_id
          });
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Eroare la verificarea sesiunii:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    // Apelăm verificarea sesiunii
    checkSession();

    // Setăm listener pentru schimbările de autentificare
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event);
        
        if (session) {
          try {
            const { data: profileData } = await supabase
              .from('profiles')
              .select('stripe_connected, stripe_account_id')
              .eq('id', session.user.id)
              .single();
              
            setUser({
              id: session.user.id,
              email: session.user.email,
              stripeConnected: profileData?.stripe_connected || false,
              stripeAccountId: profileData?.stripe_account_id
            });
          } catch (error) {
            console.error('Eroare la obținerea datelor de profil:', error);
            setUser({
              id: session.user.id,
              email: session.user.email,
              stripeConnected: false
            });
          }
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    // Cleanup la unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      });
      
      if (error) {
        console.error('Eroare la autentificare:', error.message);
        toast({
          title: "Eroare la autentificare",
          description: error.message,
          variant: "destructive"
        });
        throw error;
      }

      toast({
        title: "Autentificare reușită",
        description: "Bine ați revenit!",
      });
      
      return data;
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
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Eroare la deconectare:', error.message);
        throw error;
      }
      
      setUser(null);
      toast({
        title: "Deconectare reușită",
        description: "La revedere!",
      });
    } catch (error) {
      console.error('Eroare la deconectare:', error);
    } finally {
      setLoading(false);
    }
  };

  const connectStripe = async (accountId: string) => {
    try {
      setLoading(true);
      if (!user) throw new Error('Utilizatorul nu este autentificat');
      
      const { error } = await supabase
        .from('profiles')
        .update({
          stripe_connected: true,
          stripe_account_id: accountId
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      setUser({
        ...user,
        stripeConnected: true,
        stripeAccountId: accountId
      });
      
      toast({
        title: "Cont Stripe conectat",
        description: "Contul Stripe a fost conectat cu succes.",
      });
    } catch (error) {
      console.error('Eroare la conectarea Stripe:', error);
      toast({
        title: "Eroare la conectare",
        description: "Nu s-a putut conecta contul Stripe.",
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const disconnectStripe = async () => {
    try {
      setLoading(true);
      if (!user) throw new Error('Utilizatorul nu este autentificat');
      
      const { error } = await supabase
        .from('profiles')
        .update({
          stripe_connected: false,
          stripe_account_id: null
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      setUser({
        ...user,
        stripeConnected: false,
        stripeAccountId: undefined
      });
      
      toast({
        title: "Cont Stripe deconectat",
        description: "Contul Stripe a fost deconectat cu succes.",
      });
    } catch (error) {
      console.error('Eroare la deconectarea Stripe:', error);
      toast({
        title: "Eroare la deconectare",
        description: "Nu s-a putut deconecta contul Stripe.",
        variant: "destructive"
      });
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
