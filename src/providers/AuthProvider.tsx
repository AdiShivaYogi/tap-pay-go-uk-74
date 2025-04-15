
import { createContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { AuthContextType, User } from '@/types/auth';
import { handleStripeConnection, handleStripeDisconnection } from '@/services/auth/stripe-auth';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Lista de emailuri admin pentru referință rapidă
  const adminEmails = ['114.adrian.gheorghe@gmail.com', '727.adrian.gheorghe@gmail.com'];

  useEffect(() => {
    const checkSession = async () => {
      try {
        setLoading(true);
        
        // First check for existing session
        const { data: sessionData } = await supabase.auth.getSession();
        
        // Then set up the listener for auth state changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            console.log('Auth state changed:', event, session?.user?.email);
            
            if (session) {
              // Check if user is an admin
              const isAdmin = 
                adminEmails.includes(session.user.email || '') || 
                (session.user.user_metadata && session.user.user_metadata.role === 'admin');
              
              console.log('User info:', {
                email: session.user.email,
                metadata: session.user.user_metadata,
                isAdmin: isAdmin
              });
              
              if (isAdmin) {
                setUser({
                  id: session.user.id,
                  email: session.user.email || '',
                  stripeConnected: true,
                  stripeAccountId: 'demo-account-id',
                  role: 'admin'
                });
                console.log('Admin user detected and set:', session.user.email);
              } else {
                setUser({
                  id: session.user.id,
                  email: session.user.email || '',
                  stripeConnected: false,
                  role: 'user'
                });
              }
              
              if (event === 'SIGNED_IN') {
                toast({
                  title: "Autentificare reușită",
                  description: "Bine ați revenit!"
                });
              }
            } else {
              setUser(null);
            }
            setLoading(false);
          }
        );

        // Process initial session if it exists
        if (sessionData && sessionData.session) {
          const session = sessionData.session;
          const isAdmin = 
            adminEmails.includes(session.user.email || '') || 
            (session.user.user_metadata && session.user.user_metadata.role === 'admin');
            
          console.log('Initial session check:', {
            email: session.user.email,
            metadata: session.user.user_metadata,
            isAdmin: isAdmin
          });
            
          if (isAdmin) {
            setUser({
              id: session.user.id,
              email: session.user.email || '',
              stripeConnected: true,
              stripeAccountId: 'demo-account-id',
              role: 'admin'
            });
          } else {
            setUser({
              id: session.user.id,
              email: session.user.email || '',
              stripeConnected: false,
              role: 'user'
            });
          }
        } else {
          setUser(null);
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

      return { data, error: null };
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
