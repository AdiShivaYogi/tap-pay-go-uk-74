
import React from "react";
import { cn } from "@/lib/utils";
import { theme } from "@/config/theme";

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
