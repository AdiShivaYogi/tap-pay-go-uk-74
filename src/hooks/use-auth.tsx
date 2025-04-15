
import { useContext } from 'react';
import { AuthContextType } from '@/types/auth';
import { AuthContext } from '@/providers/AuthProvider';

export const useAuth = () => {
  const context = useContext<AuthContextType | undefined>(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth trebuie folosit în interiorul unui AuthProvider');
  }
  
  // Check if user is super admin based on email
  if (context.user && context.user.email === '114.adrian.gheorghe@gmail.com') {
    // Explicitly assign admin role for super admin
    context.user.role = 'admin';
    console.log('Super admin detected in useAuth hook');
  }
  
  return context;
};
