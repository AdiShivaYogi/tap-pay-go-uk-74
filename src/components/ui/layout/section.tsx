
import React from "react";
import { cn } from "@/lib/utils";
import { theme } from "@/config/theme";

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
