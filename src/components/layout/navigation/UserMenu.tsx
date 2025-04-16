
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserMenuProps {
  user: any;
  signOut: () => void;
  isSuperAdmin: boolean;
  isAdmin: boolean;
  isModerator: boolean;
}

export function UserMenu({ user, signOut, isSuperAdmin, isAdmin, isModerator }: UserMenuProps) {
  return (
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
  );
}
