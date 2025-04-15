import { createContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { AuthContextType, User } from '@/types/auth';
import { handleStripeConnection, handleStripeDisconnection } from '@/services/auth/stripe-auth';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        setLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          if (session.user.email === 'admin@example.com') {
            setUser({
              id: session.user.id,
              email: session.user.email,
              stripeConnected: true,
              stripeAccountId: 'demo-account-id'
            });
          } else {
            setUser({
              id: session.user.id,
              email: session.user.email,
              stripeConnected: false
            });
          }
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

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event);
        
        if (session) {
          if (session.user.email === 'admin@example.com') {
            setUser({
              id: session.user.id,
              email: session.user.email,
              stripeConnected: true,
              stripeAccountId: 'demo-account-id'
            });
          } else {
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

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ 
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
    await handleStripeConnection(user, accountId, setUser, setLoading);
  };

  const disconnectStripe = async () => {
    await handleStripeDisconnection(user, setUser, setLoading);
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

export default AuthProvider;
