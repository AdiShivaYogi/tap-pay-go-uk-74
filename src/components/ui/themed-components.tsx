
import React from "react";
import { cn } from "@/lib/utils";
import { theme } from "@/config/theme";
import { LucideIcon } from "lucide-react";

// Componente pentru tipografie
export function Heading1({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1 className={cn(theme.typography.h1, className)} {...props}>
      {children}
    </h1>
  );
}

export function Heading2({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2 className={cn(theme.typography.h2, className)} {...props}>
      {children}
    </h2>
  );
}

export function Heading3({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn(theme.typography.h3, className)} {...props}>
      {children}
    </h3>
  );
}

export function LeadText({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn(theme.typography.lead, className)} {...props}>
      {children}
    </p>
  );
}

export function Paragraph({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn(theme.typography.paragraph, className)} {...props}>
      {children}
    </p>
  );
}

export function MutedText({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn(theme.typography.muted, className)} {...props}>
      {children}
    </p>
  );
}

// Componente pentru layout
interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "alt";
  container?: boolean;
}

export function Section({ 
  className, 
  variant = "default", 
  container = true, 
  children, 
  ...props 
}: SectionProps) {
  return (
    <section 
      className={cn(
        theme.components.section[variant],
        className
      )} 
      {...props}
    >
      {container ? (
        <div className={theme.spacing.container}>{children}</div>
      ) : (
        children
      )}
    </section>
  );
}

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  gradient?: boolean;
  icon?: LucideIcon;
  children?: React.ReactNode;
}

export function PageHeader({ 
  className, 
  title, 
  description,
  icon: Icon, 
  children,
  gradient = true, 
  ...props 
}: PageHeaderProps) {
  return (
    <div className={cn("text-center mb-12 space-y-4", className)} {...props}>
      <div className="flex flex-col items-center justify-center">
        {Icon && (
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        )}
        <h1 className={cn(
          theme.typography.h1, 
          gradient ? theme.effects.gradient.primary : ""
        )}>
          {title}
        </h1>
        {description && (
          <p className={cn(theme.typography.lead, "max-w-2xl mx-auto")}>
            {description}
          </p>
        )}
        {children && <div className="mt-4">{children}</div>}
      </div>
    </div>
  );
}

export function Grid2Cols({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn(theme.layouts.grid2Cols, className)} {...props}>
      {children}
    </div>
  );
}

export function Grid3Cols({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn(theme.layouts.grid3Cols, className)} {...props}>
      {children}
    </div>
  );
}

export function Grid4Cols({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn(theme.layouts.grid4Cols, className)} {...props}>
      {children}
    </div>
  );
}

interface ThemedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "base" | "interactive" | "highlight";
}

export function ThemedCard({ 
  className, 
  children, 
  variant = "base", 
  ...props 
}: ThemedCardProps) {
  return (
    <div 
      className={cn(
        theme.components.card[variant],
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
}

// Componente pentru acțiuni și butoane
interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: LucideIcon;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export function ActionButton({
  children,
  className,
  icon: Icon,
  variant = "primary",
  size = "md",
  fullWidth = false,
  ...props
}: ActionButtonProps) {
  const sizeClasses = {
    sm: "py-1.5 px-3 text-sm",
    md: "py-2 px-4",
    lg: "py-2.5 px-5 text-lg"
  };
  
  const variantClasses = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
  };
  
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50",
        sizeClasses[size],
        variantClasses[variant],
        fullWidth ? "w-full" : "",
        className
      )}
      {...props}
    >
      {Icon && <Icon className={cn("h-4 w-4", children ? "mr-2" : "")} />}
      {children}
    </button>
  );
}

// Componente pentru navigare
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
