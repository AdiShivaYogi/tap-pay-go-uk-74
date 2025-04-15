
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./use-auth";

export type UserRole = 'admin' | 'user' | 'moderator';

export const useUserRole = () => {
  const { user } = useAuth();

  const { data: role, isLoading } = useQuery({
    queryKey: ['user-role', user?.id],
    queryFn: async (): Promise<UserRole> => {
      if (!user?.id) return 'user';

      // Verificăm dacă utilizatorul are rol setat în contextul de autentificare
      if (user.role === 'admin') {
        console.log('Admin user detected from context');
        return 'admin';
      }

      // Lista de emailuri admin
      const adminEmails = [
        '114.adrian.gheorghe@gmail.com',
        '727.adrian.gheorghe@gmail.com'
      ];
      
      // Verificăm adresa de email pentru admin
      if (adminEmails.includes(user.email || '')) {
        console.log('Admin user detected by email:', user.email);
        return 'admin';
      }

      try {
        // Verificăm metadatele utilizatorului din Supabase
        const { data: userData, error: userError } = await supabase.auth.getUser();
        
        if (userError) {
          console.error('Error fetching user data:', userError);
        } else if (userData?.user?.user_metadata?.role === 'admin') {
          console.log('Admin user detected from metadata');
          return 'admin';
        }

        // Pentru utilizare reală, verificăm rolul din baza de date
        const { data: isAdmin, error: adminError } = await supabase
          .rpc('user_has_role', { _role: 'admin' as const });

        if (adminError) {
          console.error('Error checking admin role:', adminError);
          return 'user';
        }

        if (isAdmin) return 'admin';

        // Verificăm rolul de moderator
        const { data: isModerator, error: modError } = await supabase
          .rpc('user_has_role', { _role: 'moderator' as const });

        if (modError) {
          console.error('Error checking moderator role:', modError);
          return 'user';
        }

        if (isModerator) return 'moderator';

        // Dacă nu are niciun rol special, returnăm 'user'
        return 'user';
      } catch (error) {
        console.error('Error fetching user role:', error);
        return 'user';
      }
    },
    enabled: !!user?.id,
  });

  const isAdmin = role === 'admin';
  const isModerator = role === 'moderator';

  return {
    role,
    isAdmin,
    isModerator,
    isLoading,
  };
};
