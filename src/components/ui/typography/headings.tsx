
import React from "react";
import { cn } from "@/lib/utils";
import { theme } from "@/config/theme";

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
