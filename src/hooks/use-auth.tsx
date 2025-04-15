
import { useContext } from 'react';
import { AuthContextType } from '@/types/auth';
import { AuthContext } from '@/providers/AuthProvider';

export const useAuth = () => {
  const context = useContext<AuthContextType | undefined>(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth trebuie folosit în interiorul unui AuthProvider');
  }
  
  // Log authentication context for debugging
  console.log('Auth context:', {
    isAuthenticated: !!context.user,
    user: context.user,
    loading: context.loading
  });
  
  return context;
};
