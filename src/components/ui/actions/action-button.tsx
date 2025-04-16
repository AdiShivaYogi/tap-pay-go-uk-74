
import React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

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
