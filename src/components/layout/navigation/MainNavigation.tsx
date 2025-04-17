
import { cn } from "@/lib/utils";
import { config } from "@/config/navigation";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogIn, CreditCard, BrainCircuit } from "lucide-react";
import { useUserRole } from "@/hooks/use-user-role";
import { useLocation } from "react-router-dom";
import { NavigationItem } from "@/config/navigation";

interface MainNavigationProps {
  currentPath: string;
  isVisible: (item: any) => boolean;
  user: any | null;
}

export function MainNavigation({ currentPath, isVisible, user }: MainNavigationProps) {
  const { isAdmin } = useUserRole();
  const { pathname } = useLocation();
  
  // Adăugăm link-uri rapide către paginile de agenți
  const agentLinks: NavigationItem[] = [
    {
      title: "Agenți",
      href: "/agents",
      icon: BrainCircuit,
      admin: false,
    },
    {
      title: "Centru de Comandă",
      href: "/agent-central-command",
      icon: BrainCircuit,
      admin: true,
      highlight: true
    }
  ];
  
  // Combinăm link-urile de agenți cu restul navigației
  const combinedNavItems = [...config.mainNav, ...agentLinks.filter(
    item => !config.mainNav.some(navItem => navItem.href === item.href)
  )];
  
  // Filtrăm elementele de navigare relevante pentru tipul de utilizator
  const navItems = combinedNavItems.filter(item => {
    // Pentru utilizatori neautentificați, afișăm doar elementele marcate pentru noii utilizatori
    if (!user) {
      return item.newUser === true;
    }
    // Pentru utilizatori autentificați, afișăm toate elementele normale și cele admin dacă utilizatorul e admin
    return !item.admin || (item.admin && isAdmin);
  });

  return (
    <nav className="mx-6 hidden items-center space-x-1 lg:flex">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        // Verificăm dacă elementul de navigare trebuie evidențiat special
        const isHighlighted = item.highlight;
        const isNewUserItem = item.newUser;
        
        return (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center px-3 py-2 text-sm transition-colors hover:text-foreground",
              isActive 
                ? "text-foreground font-medium" 
                : "text-muted-foreground",
              isHighlighted && !isActive
                ? "bg-green-50/80 text-green-700 rounded-md hover:bg-green-100/80 hover:text-green-800"
                : "",
              isHighlighted && isActive
                ? "bg-green-100 text-green-800 rounded-md font-medium"
                : "",
              isNewUserItem && !isActive && !user
                ? "bg-primary/10 text-primary/90 rounded-md hover:bg-primary/20 hover:text-primary" 
                : ""
            )}
          >
            {item.icon && <item.icon className="mr-1 h-4 w-4" />}
            {item.title}
            {isHighlighted && (
              <span className="ml-1.5 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-200/70 text-green-800">
                Nou
              </span>
            )}
          </Link>
        );
      })}
      
      {/* Afișează butonul de autentificare sau conectare Stripe pentru utilizatorii neautentificați */}
      {!user && (
        <>
          <Link to="/auth">
            <Button variant="outline" size="sm" className="ml-2 bg-white border border-primary/20 text-primary hover:bg-primary/10">
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
