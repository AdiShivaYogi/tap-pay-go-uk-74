
import React from "react";
import { cn } from "@/lib/utils";
import { theme } from "@/config/theme";

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
}

export function PageHeader({ 
  className, 
  title, 
  description, 
  gradient = true, 
  ...props 
}: PageHeaderProps) {
  return (
    <div className={cn("text-center mb-12 space-y-4", className)} {...props}>
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
