
import React, { useState } from "react";
import { Menu, X, LogIn, CreditCard, BrainCircuit } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { config } from "@/config/navigation";
import { Link } from "react-router-dom";
import { useUserRole } from "@/hooks/use-user-role";
import { NavigationItem } from "@/config/navigation";

interface MobileMenuProps {
  currentPath: string;
  isVisible: (item: any) => boolean;
  user: any | null;
}

export function MobileMenu({ currentPath, isVisible, user }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { isAdmin } = useUserRole();
  
  const handleLinkClick = () => {
    setIsOpen(false);
  };
  
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
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Deschide meniul</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <SheetHeader className="mb-4 border-b pb-4">
          <SheetTitle className="text-left">Meniu navigare</SheetTitle>
        </SheetHeader>
        <div className="grid gap-2 py-2">
          {navItems.map((item) => {
            const isActive = currentPath === item.href;
            const isHighlighted = item.highlight;
            const isNewUserItem = item.newUser;
            
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={handleLinkClick}
                className={cn(
                  "flex items-center gap-2 py-2 px-3 text-base rounded-md hover:bg-accent",
                  isActive ? "text-foreground font-medium" : "text-muted-foreground",
                  isHighlighted && !isActive
                    ? "bg-green-50/80 text-green-700 hover:bg-green-100/80 hover:text-green-800"
                    : "",
                  isHighlighted && isActive
                    ? "bg-green-100 text-green-800 font-medium"
                    : "",
                  isNewUserItem && !isActive && !user
                    ? "bg-primary/10 text-primary/90 hover:bg-primary/20 hover:text-primary" 
                    : ""
                )}
              >
                {item.icon && <item.icon className="h-5 w-5" />}
                <span>{item.title}</span>
                {isHighlighted && (
                  <span className="ml-1 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-200/70 text-green-800">
                    Nou
                  </span>
                )}
              </Link>
            );
          })}
          
          {/* Adăugăm butoane importante pentru utilizatorii neautentificați */}
          {!user && (
            <div className="mt-4 pt-4 border-t border-border/40 flex flex-col gap-2">
              <Link
                to="/auth"
                onClick={handleLinkClick}
                className="flex items-center gap-2 py-2 px-4 bg-primary/10 text-primary rounded-md hover:bg-primary/20"
              >
                <LogIn className="h-5 w-5" />
                <span>Autentificare</span>
              </Link>
              <Link
                to="/connect-stripe"
                onClick={handleLinkClick}
                className="flex items-center gap-2 py-2 px-4 bg-primary text-white rounded-md hover:bg-primary/90"
              >
                <CreditCard className="h-5 w-5" />
                <span>Conectare Stripe</span>
              </Link>
            </div>
          )}
          
          {/* Adăugăm și linkuri către Terms, Privacy și Help pentru utilizatorii neautentificați */}
          {!user && (
            <div className="mt-4 pt-4 border-t border-border/40">
              {config.footerNav.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={handleLinkClick}
                  className="flex items-center gap-2 py-2 px-3 text-sm text-muted-foreground hover:text-foreground"
                >
                  {item.icon && <item.icon className="h-4 w-4" />}
                  <span>{item.title}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
