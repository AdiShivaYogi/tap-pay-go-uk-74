
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
import { 
  Home, 
  LayoutDashboard, 
  FileText, 
  Map, 
  User, 
  Key, 
  DollarSign, 
  Info 
} from "lucide-react";

const NAVIGATION = [
  { href: "/", label: "Acasă", icon: Home },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/reports", label: "Rapoarte", icon: FileText },
  { href: "/roadmap", label: "Roadmap", icon: Map, adminOnly: true },
  { href: "/admin", label: "Admin", icon: User, adminOnly: true },
  { href: "/admin-auth", label: "Admin Auth", icon: Key },
  { href: "/pricing", label: "Prețuri", icon: DollarSign },
  { href: "/about", label: "Despre", icon: Info },
];

export function Header() {
  const { signOut, user } = useAuth();
  const { isAdmin } = useUserRole();
  
  return (
    <header className="bg-white py-4 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="font-bold text-xl flex items-center gap-2">
            <img src="/favicon.ico" alt="Logo" className="h-8 w-8" />
            TapPayGo
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            {NAVIGATION.map((item) => {
              // Hide admin-only items for non-admin users
              if ((item.adminOnly || item.href === "/roadmap") && !isAdmin) return null;
              
              return (
                <Link 
                  key={item.href} 
                  to={item.href} 
                  className="hover:text-gray-600 flex items-center gap-2 text-sm"
                >
                  {item.icon && <item.icon className="h-4 w-4" />}
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Avatar>
                  <AvatarImage src={user.email ? `https://ui-avatars.com/api/?name=${user.email.charAt(0)}` : undefined} />
                  <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline">Account</Button>
                  </SheetTrigger>
                  <SheetContent className="sm:max-w-lg">
                    <SheetHeader>
                      <SheetTitle>Account</SheetTitle>
                      <SheetDescription>
                        Manage your account settings.
                      </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="name" className="text-right text-sm font-medium leading-none text-right">
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={user.email}
                          className="col-span-3 flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        />
                      </div>
                      <Button onClick={() => signOut()} variant="destructive">Sign Out</Button>
                    </div>
                  </SheetContent>
                </Sheet>
              </>
            ) : (
              <>
                <Link to="/onboarding">
                  <Button variant="outline">Sign In</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
