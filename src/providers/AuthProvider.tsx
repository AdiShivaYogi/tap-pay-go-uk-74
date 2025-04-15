
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
        
        // Mai întâi se configurează listener-ul pentru schimbările de stare
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            console.log('Auth state changed:', event);
            
            if (session) {
              // Verificăm dacă utilizatorul este admin@example.com sau are metadate specifice
              const isAdmin = 
                session.user.email === 'admin@example.com' || 
                (session.user.user_metadata && session.user.user_metadata.role === 'admin');
              
              console.log('User info:', {
                email: session.user.email,
                metadata: session.user.user_metadata,
                isAdmin: isAdmin
              });
              
              if (isAdmin) {
                setUser({
                  id: session.user.id,
                  email: session.user.email,
                  stripeConnected: true,
                  stripeAccountId: 'demo-account-id',
                  role: 'admin'
                });
                console.log('Admin user detected and set');
              } else {
                setUser({
                  id: session.user.id,
                  email: session.user.email,
                  stripeConnected: false,
                  role: 'user'
                });
                console.log('Regular user set');
              }
              
              if (event === 'SIGNED_IN') {
                toast({
                  title: "Autentificare reușită",
                  description: "Bine ați revenit!"
                });
              }
            } else {
              setUser(null);
              console.log('No session found, user set to null');
            }
            setLoading(false);
          }
        );

        // Apoi verificăm sesiunea curentă
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          const isAdmin = 
            session.user.email === 'admin@example.com' || 
            (session.user.user_metadata && session.user.user_metadata.role === 'admin');
            
          console.log('Initial session check:', {
            email: session.user.email,
            metadata: session.user.user_metadata,
            isAdmin: isAdmin
          });
            
          if (isAdmin) {
            setUser({
              id: session.user.id,
              email: session.user.email,
              stripeConnected: true,
              stripeAccountId: 'demo-account-id',
              role: 'admin'
            });
            console.log('Initial admin user set');
          } else {
            setUser({
              id: session.user.id,
              email: session.user.email,
              stripeConnected: false,
              role: 'user'
            });
            console.log('Initial regular user set');
          }
        } else {
          setUser(null);
          console.log('No initial session found');
        }
        
        setLoading(false);

        return () => {
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error('Eroare la verificarea sesiunii:', error);
        setUser(null);
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      console.log('Attempting to sign in with email:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      });
      
      if (error) {
        console.error('Eroare la autentificare:', error.message);
        throw error;
      }

      console.log('Sign in successful, data:', data);
      // Toast-ul va fi afișat de listener-ul onAuthStateChange
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
