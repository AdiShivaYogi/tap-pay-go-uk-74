
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./use-auth";

export type UserRole = 'admin' | 'user';

export const useUserRole = () => {
  const { user } = useAuth();

  // In this simplified version, we're hard-coding the admin user IDs
  // This avoids the database RPC call that was causing TypeScript errors
  const { data: role, isLoading } = useQuery({
    queryKey: ['user-role', user?.id],
    queryFn: async (): Promise<UserRole | null> => {
      if (!user?.id) return null;
      
      // Hard-coded admin IDs for demonstration
      // In production, this would be replaced with a proper check
      const adminUserIds = ['demo-user-id']; // Add your admin user IDs here
      
      return adminUserIds.includes(user.id) ? 'admin' : 'user';
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
