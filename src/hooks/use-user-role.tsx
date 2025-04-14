
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./use-auth";

export type UserRole = 'admin' | 'user';

export const useUserRole = () => {
  const { user } = useAuth();

  const { data: role, isLoading } = useQuery({
    queryKey: ['user-role', user?.id],
    queryFn: async (): Promise<UserRole | null> => {
      if (!user?.id) return null;
      
      try {
        // Use a more generic query approach to avoid TypeScript errors
        // We're calling the database directly since the user_roles table
        // isn't in the generated types yet
        const { data, error } = await supabase
          .rpc('has_role', {
            _user_id: user.id,
            _role: 'admin'
          });

        if (error) {
          console.error('Error checking user role:', error);
          return null;
        }

        // has_role returns a boolean
        return data === true ? 'admin' : 'user';
      } catch (error) {
        console.error('Error fetching user role:', error);
        return null;
      }
    },
    enabled: !!user?.id,
  });

  const isAdmin = role === 'admin';

  return {
    role,
    isAdmin,
    isLoading,
  };
};
