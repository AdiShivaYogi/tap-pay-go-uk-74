
import { cn } from "@/lib/utils";
import { NAVIGATION } from "@/config/navigation";
import { NavLink } from "@/components/ui/themed-components";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogIn, CreditCard } from "lucide-react";

interface MainNavigationProps {
  currentPath: string;
  isVisible: (item: typeof NAVIGATION[0]) => boolean;
  user: any | null;
}

export function MainNavigation({ currentPath, isVisible, user }: MainNavigationProps) {
  return (
    <nav className="hidden md:flex items-center space-x-2">
      {NAVIGATION.filter(item => !item.showWhenAuth || (item.showWhenAuth && user))
        .filter(item => !item.hideWhenAuth || (item.hideWhenAuth && !user))
        .filter(item => {
          if (!user) return !item.adminOnly && !item.moderatorOnly && !item.superAdminOnly && !item.userOnly;
          return isVisible(item);
        })
        .map((item) => (
          <NavLink 
            key={item.href} 
            href={item.href}
            icon={item.icon}
            active={currentPath === item.href}
          >
            {item.label}
            {item.label === "Cont" && user?.stripeConnected && (
              <Badge variant="secondary" className="ml-2">
                Stripe conectat
              </Badge>
            )}
          </NavLink>
        ))}

      {/* Afișăm butonul de autentificare sau conectare Stripe pentru utilizatorii neautentificați */}
      {!user && (
        <>
          <Link to="/auth">
            <Button variant="outline" size="sm" className="ml-2">
              <LogIn className="mr-2 h-4 w-4" />
              Autentificare
            </Button>
          </Link>
          <Link to="/connect-stripe">
            <Button variant="default" size="sm" className="ml-2">
              <CreditCard className="mr-2 h-4 w-4" />
              Conectare Stripe
            </Button>
          </Link>
        </>
      )}
    </nav>
  );
}
