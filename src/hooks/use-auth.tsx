
import { useContext } from 'react';
import { AuthContextType } from '@/types/auth';
import { AuthContext } from '@/providers/AuthProvider';

export const useAuth = () => {
  const context = useContext<AuthContextType | undefined>(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth trebuie folosit în interiorul unui AuthProvider');
  }
  
  // Check if user is super admin based on email, but only if user exists
  if (context.user) {
    // List of admin emails
    const adminEmails = [
      '114.adrian.gheorghe@gmail.com',
      '727.adrian.gheorghe@gmail.com'  // Added alternative admin email
    ];
    
    // Check if current user email is in admin list
    if (adminEmails.includes(context.user.email || '')) {
      // Explicitly assign admin role for super admin
      context.user.role = 'admin';
      console.log('Admin user detected in useAuth hook:', context.user.email);
    }
  }
  
  return context;
};
