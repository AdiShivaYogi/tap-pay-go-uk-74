
import { useAuth } from "@/hooks/use-auth";
import { useUserRole } from "@/hooks/use-user-role";
import { Logo } from "./navigation/Logo";
import { MainNavigation } from "./navigation/MainNavigation";
import { UserMenu } from "./navigation/UserMenu";
import { MobileMenu } from "./navigation/MobileMenu";
import { config } from "@/config/navigation";
import { checkSuperAdmin, determineNavItemVisibility } from "./navigation/HeaderUtils";

export function Header() {
  const { signOut, user } = useAuth();
  const { isAdmin, isModerator } = useUserRole();
  
  // Verificăm dacă utilizatorul e super admin (email specific)
  const isSuperAdmin = checkSuperAdmin(user?.email);
  
  // Function to determine if a navigation item should be visible
  const isVisible = (item: any) => {
    return determineNavItemVisibility(item, user, isAdmin, isModerator, isSuperAdmin);
  };

  // Determine active route
  const currentPath = window.location.pathname;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <MainNavigation 
            currentPath={currentPath} 
            isVisible={isVisible} 
            user={user} 
          />

          {/* User Menu & Mobile Menu */}
          <div className="flex items-center gap-4">
            {user ? (
              <UserMenu 
                user={user} 
                signOut={signOut}
                isSuperAdmin={isSuperAdmin}
                isAdmin={isAdmin}
                isModerator={isModerator}
              />
            ) : null}

            {/* Mobile Menu */}
            <MobileMenu 
              currentPath={currentPath} 
              isVisible={isVisible} 
              user={user} 
            />
          </div>
        </div>
      </div>
    </header>
  );
}
