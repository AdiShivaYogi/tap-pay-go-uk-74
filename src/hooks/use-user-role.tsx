
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
        // Since the Supabase client isn't properly typed for user_roles table,
        // we need to use a more generic approach
        const { data, error } = await supabase
          .from('user_roles')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error) {
          console.error('Error fetching user role:', error);
          return null;
        }

        // Since TypeScript doesn't know about the role column, we need to use an assertion
        return (data as any)?.role || null;
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
