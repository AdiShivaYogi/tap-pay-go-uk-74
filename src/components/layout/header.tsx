
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { useUserRole } from "@/hooks/use-user-role";
import { NAVIGATION } from "@/config/navigation";
import { Menu, CreditCard, LogIn } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { NavLink } from "@/components/ui/themed-components";

export function Header() {
  const { signOut, user } = useAuth();
  const { isAdmin, isModerator, role } = useUserRole();
  
  // Verificăm dacă utilizatorul e super admin (email specific)
  const isSuperAdmin = user?.email === '114.adrian.gheorghe@gmail.com';
  
  // Function to determine if a navigation item should be visible
  const isVisible = (item: typeof NAVIGATION[0]) => {
    // If user is not authenticated
    if (!user) {
      return !item.showWhenAuth;
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
  };

  // Determine active route
  const currentPath = window.location.pathname;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center space-x-2">
              <img src="/favicon.ico" alt="Logo" className="h-8 w-8" />
              <span className="font-semibold text-primary">TapPayGo</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {NAVIGATION.map((item) => (
              isVisible(item) && (
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
              )
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

          {/* User Menu & Mobile Menu */}
          <div className="flex items-center gap-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.email ? `https://ui-avatars.com/api/?name=${user.email.charAt(0)}` : undefined} />
                      <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">Cont</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                      
                      {/* Badge-uri de status pentru contul utilizatorului */}
                      <div className="flex flex-wrap gap-1 mt-1">
                        {user.stripeConnected && (
                          <Badge variant="outline" className="w-fit">
                            Stripe conectat
                          </Badge>
                        )}
                        {isSuperAdmin && (
                          <Badge variant="destructive" className="w-fit text-xs">Super Admin</Badge>
                        )}
                        {isAdmin && !isSuperAdmin && (
                          <Badge variant="destructive" className="w-fit text-xs">Admin</Badge>
                        )}
                        {isModerator && !isAdmin && !isSuperAdmin && (
                          <Badge variant="default" className="w-fit text-xs">Moderator</Badge>
                        )}
                        {!isAdmin && !isModerator && !isSuperAdmin && (
                          <Badge variant="secondary" className="w-fit text-xs">Utilizator</Badge>
                        )}
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  
                  {/* Link-uri rapide în dropdown */}
                  <Link to="/dashboard">
                    <DropdownMenuItem className="cursor-pointer">
                      Dashboard
                    </DropdownMenuItem>
                  </Link>
                  <Link to="/account">
                    <DropdownMenuItem className="cursor-pointer">
                      Setări cont
                    </DropdownMenuItem>
                  </Link>
                  {!user.stripeConnected && (
                    <Link to="/connect-stripe">
                      <DropdownMenuItem className="cursor-pointer text-primary">
                        Conectare Stripe
                      </DropdownMenuItem>
                    </Link>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()} className="text-red-500 hover:text-red-600">
                    Deconectare
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : null}

            {/* Mobile Menu */}
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
                  {NAVIGATION.map((item) => (
                    isVisible(item) && (
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
                    )
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
          </div>
        </div>
      </div>
    </header>
  );
}

// Adăugăm utilitarul pentru className-uri dinamice
function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(' ');
}
