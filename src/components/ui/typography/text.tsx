
import React from "react";
import { cn } from "@/lib/utils";
import { theme } from "@/config/theme";

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
