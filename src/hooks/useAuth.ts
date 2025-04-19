import { useState, useEffect } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebase';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: Error | null;
}

export const useAuth = (): AuthState => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        setAuthState({
          user,
          loading: false,
          error: null
        });
      },
      (error) => {
        setAuthState(prev => ({
          ...prev,
          loading: false,
          error
        }));
      }
    );

    return unsubscribe;
  }, []);

  return authState;
};

export const useProtectedRoute = (requiredRole?: string) => {
  const { user, loading } = useAuth();
  
  return {
    hasAccess: !loading && (requiredRole ? user?.role === requiredRole : !!user),
    loading
  };
};
