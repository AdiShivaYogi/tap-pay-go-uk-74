
import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "../card";

export const CardVariants = {
  default: "border-[1px] border-primary/10 relative overflow-hidden",
  pricing: "border-[1px] relative overflow-hidden",
  gradient: "bg-background border-[1px] border-primary/10",
  transparent: "bg-background/50 border-[1px] border-primary/20"
};

export interface StyledCardProps extends React.ComponentProps<typeof Card> {
  children: React.ReactNode;
  variant?: keyof typeof CardVariants;
  hover?: boolean;
  gradient?: boolean;
  icon?: LucideIcon;
  iconClassName?: string;
  animate?: boolean;
}

export function StyledCard({ 
  children,
  className,
  variant = "default",
  hover = true,
  gradient = true,
  icon: Icon,
  iconClassName,
  animate = true,
  ...props
}: StyledCardProps) {
  return (
    <Card
      className={cn(
        CardVariants[variant],
        hover && "transition-colors duration-300",
        animate && "animate-fade-in",
        className
      )}
      {...props}
    >
      {Icon && (
        <div className="absolute top-4 right-4 opacity-20">
          <Icon className={cn("h-8 w-8", iconClassName)} />
        </div>
      )}
      {children}
      {gradient && variant === "default" && (
        <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-primary to-transparent animate-pulse" />
      )}
    </Card>
  );
}

export const StyledCardHeader = CardHeader;
export const StyledCardContent = CardContent;
export const StyledCardTitle = CardTitle;
export const StyledCardDescription = CardDescription;
export const StyledCardFooter = CardFooter;
