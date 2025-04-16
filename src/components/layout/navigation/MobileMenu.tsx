
import { Link } from "react-router-dom";
import { Menu, LogIn, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { NAVIGATION } from "@/config/navigation";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface MobileMenuProps {
  currentPath: string;
  isVisible: (item: typeof NAVIGATION[0]) => boolean;
  user: any | null;
}

export function MobileMenu({ currentPath, isVisible, user }: MobileMenuProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="md:hidden" size="icon">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Meniu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Meniu</SheetTitle>
          <SheetDescription>
            Navigare și setări cont
          </SheetDescription>
        </SheetHeader>
        <nav className="flex flex-col space-y-1 mt-4">
          {NAVIGATION.filter(item => !item.showWhenAuth || (item.showWhenAuth && user))
            .filter(item => !item.hideWhenAuth || (item.hideWhenAuth && !user))
            .filter(item => {
              if (!user) return !item.adminOnly && !item.moderatorOnly && !item.superAdminOnly && !item.userOnly;
              return isVisible(item);
            })
            .map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
                  currentPath === item.href 
                    ? "bg-primary/10 text-primary font-medium" 
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
                {item.label === "Cont" && user?.stripeConnected && (
                  <Badge variant="secondary" className="ml-auto">
                    Stripe conectat
                  </Badge>
                )}
              </Link>
            ))}
          
          {/* Afișăm butoanele de autentificare sau conectare Stripe pentru utilizatorii neautentificați */}
          {!user && (
            <div className="pt-4 space-y-2">
              <Link to="/auth" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <LogIn className="mr-2 h-4 w-4" />
                  Autentificare
                </Button>
              </Link>
              <Link to="/connect-stripe" className="block">
                <Button variant="default" className="w-full justify-start">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Conectare Stripe
                </Button>
              </Link>
            </div>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

// Utility function
function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(' ');
}
