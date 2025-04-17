
import { createContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { AuthContextType, User } from '@/types/auth';
import { handleStripeConnection, handleStripeDisconnection } from '@/services/auth/stripe-auth';

// Define lock status type
type LockStatus = {
  is_locked: boolean;
  minutes_left: number;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Admin emails reference list
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

  const signIn = async (email: string, password: string): Promise<{error?: any}> => {
    try {
      setLoading(true);
      console.log('Attempting to sign in with email:', email);
      
      // Verificăm dacă contul este blocat
      const { data, error: lockCheckError } = await supabase.rpc('check_login_attempts', {
        p_email: email
      });
      
      if (lockCheckError) {
        console.error('Eroare la verificarea blocării contului:', lockCheckError);
      }
      
      // Process response - ensure we get a proper lock status object
      let lockStatus: LockStatus;
      
      if (Array.isArray(data)) {
        // If it's an array, take the first item
        lockStatus = data.length > 0 ? data[0] : { is_locked: false, minutes_left: 0 };
      } else {
        // If it's an object or null/undefined
        lockStatus = data || { is_locked: false, minutes_left: 0 };
      }
      
      if (lockStatus.is_locked) {
        return {
          error: {
            message: `Cont blocat temporar. Încercați din nou în ${lockStatus.minutes_left} minute.`
          }
        };
      }
      
      const { error } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      });
      
      if (error) {
        console.error('Eroare la autentificare:', error.message);
        return { error };
      }
      
      return {};
    } catch (error) {
      console.error('Eroare la autentificare:', error);
      return { error };
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
