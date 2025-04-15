
import { useContext } from 'react';
import { AuthContextType } from '@/types/auth';
import { AuthContext } from '@/providers/AuthProvider';

export const useAuth = () => {
  const context = useContext<AuthContextType | undefined>(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth trebuie folosit în interiorul unui AuthProvider');
  }
  
  // Adăugăm logică pentru a verifica dacă utilizatorul este super admin
  if (context.user && context.user.email === '114.adrian.gheorghe@gmail.com') {
    // Atribuim explicit rolul de admin pentru super admin
    context.user.role = 'admin';
    console.log('Super admin detected in useAuth hook');
  }
  
  // Log authentication context for debugging
  console.log('Auth context:', {
    isAuthenticated: !!context.user,
    user: context.user,
    loading: context.loading
  });
  
  return context;
};
