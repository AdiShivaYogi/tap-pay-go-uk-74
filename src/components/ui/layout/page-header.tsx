
import React from "react";
import { cn } from "@/lib/utils";
import { theme } from "@/config/theme";
import { LucideIcon } from "lucide-react";

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
