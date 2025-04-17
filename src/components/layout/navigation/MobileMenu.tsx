
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
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
          {config.mainNav
            .filter(item => 
              !item.admin || (item.admin && isAdmin)
            )
            .map((item) => {
              const isActive = currentPath === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={handleLinkClick}
                  className={cn(
                    "flex items-center gap-2 py-2 px-3 text-base rounded-md hover:bg-accent",
                    isActive ? "text-foreground font-medium" : "text-muted-foreground"
                  )}
                >
                  {item.icon && <item.icon className="h-5 w-5" />}
                  <span>{item.title}</span>
                </Link>
              );
            })}
        </div>
      </SheetContent>
    </Sheet>
  );
}
