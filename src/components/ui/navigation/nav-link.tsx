
import React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  icon?: LucideIcon;
  active?: boolean;
  badge?: string | number;
}

export function NavLink({
  children,
  className,
  icon: Icon,
  active = false,
  badge,
  ...props
}: NavLinkProps) {
  return (
    <a
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
        active
          ? "bg-primary/10 text-primary font-medium"
          : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
        className
      )}
      {...props}
    >
      {Icon && <Icon className="h-4 w-4" />}
      <span>{children}</span>
      {badge && (
        <span className="ml-auto bg-primary/20 text-primary text-xs px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </a>
  );
}
