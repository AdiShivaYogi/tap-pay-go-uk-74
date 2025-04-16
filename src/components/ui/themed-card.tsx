
import React from "react";
import { cn } from "@/lib/utils";
import { theme } from "@/config/theme";

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
