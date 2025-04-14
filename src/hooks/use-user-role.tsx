
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

      // Pentru demo, returnăm direct 'admin' pentru utilizatorul demo
      if (user.id === 'demo-user-id') {
        console.log('Demo user detected, returning admin role');
        return 'admin';
      }

      try {
        // Verificăm rolul de admin
        const { data: isAdmin, error: adminError } = await supabase
          .rpc('user_has_role', { _role: 'admin' });

        if (adminError) {
          console.error('Error checking admin role:', adminError);
          return 'user';
        }

        if (isAdmin) return 'admin';

        // Verificăm rolul de moderator
        const { data: isModerator, error: modError } = await supabase
          .rpc('user_has_role', { _role: 'moderator' });

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
