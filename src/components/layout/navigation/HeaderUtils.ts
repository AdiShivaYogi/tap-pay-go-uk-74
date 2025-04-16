
import { NavigationItem } from "@/config/navigation";

/**
 * Determines if a navigation item should be visible based on user authentication and roles
 */
export function determineNavItemVisibility(
  item: NavigationItem, 
  user: any | null, 
  isAdmin: boolean, 
  isModerator: boolean, 
  isSuperAdmin: boolean
) {
  // If user is not authenticated
  if (!user) {
    return item.showWhenAuth === false || !item.showWhenAuth;
  }
  
  // If user is authenticated
  if (item.hideWhenAuth) return false;
  
  // Super admin sees all menu items
  if (isSuperAdmin) return true;
  
  // If item is superAdminOnly, only show to super admin
  if (item.superAdminOnly && !isSuperAdmin) return false;
  
  // Admin users can see admin-only items
  if (item.adminOnly && !isAdmin) return false;
  
  // Moderator users can see moderator-only items
  if (item.moderatorOnly && !isModerator && !isAdmin) return false;
  
  // Regular user-only items should only be shown to regular users
  if (item.userOnly && isAdmin) return false;
  
  return true;
}

/**
 * Check if a user is a super admin based on their email
 */
export function checkSuperAdmin(userEmail: string | undefined | null): boolean {
  if (!userEmail) return false;
  
  return userEmail === '114.adrian.gheorghe@gmail.com';
}
