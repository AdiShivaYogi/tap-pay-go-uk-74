
import { cn } from "@/lib/utils";
import { config } from "@/config/navigation";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogIn, CreditCard } from "lucide-react";
import { useUserRole } from "@/hooks/use-user-role";
import { useLocation } from "react-router-dom";
import { Activity } from "lucide-react";

interface MainNavigationProps {
  currentPath: string;
  isVisible: (item: any) => boolean;
  user: any | null;
}

export function MainNavigation({ currentPath, isVisible, user }: MainNavigationProps) {
  const { isAdmin } = useUserRole();
  const { pathname } = useLocation();
  
  return (
    <nav className="mx-6 hidden items-center space-x-1 lg:flex">
      {config.mainNav
        .filter(item => 
          !item.admin || (item.admin && isAdmin)
        )
        .map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center px-3 py-2 text-sm transition-colors hover:text-foreground",
                isActive 
                  ? "text-foreground font-medium" 
                  : "text-muted-foreground"
              )}
            >
              {item.icon && <item.icon className="mr-1 h-4 w-4" />}
              {item.title}
            </Link>
          );
        })}
      
      {/* Afișează butonul de autentificare sau conectare Stripe pentru utilizatorii neautentificați */}
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
