
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "./card";
import { LucideIcon } from "lucide-react";

export interface StyledCardProps extends React.ComponentProps<typeof Card> {
  children: React.ReactNode;
  variant?: "default" | "pricing" | "gradient" | "transparent";
  hover?: boolean;
  gradient?: boolean;
  icon?: LucideIcon;
  iconClassName?: string;
  animate?: boolean;
}

export const CardVariants = {
  default: "border-2 border-primary/10 relative overflow-hidden hover:shadow-md transition-shadow duration-300",
  pricing: "transform transition-all duration-300 hover:scale-105 border-2 relative overflow-hidden",
  gradient: "bg-gradient-to-br from-card to-secondary/80 backdrop-blur-sm border-primary/10",
  transparent: "bg-card/50 backdrop-blur-sm border-primary/20"
};

export const StyledCard = ({ 
  children,
  className,
  variant = "default",
  hover = true,
  gradient = true,
  icon: Icon,
  iconClassName,
  animate = true,
  ...props
}: StyledCardProps) => {
  return (
    <Card
      className={cn(
        CardVariants[variant],
        hover && "hover:shadow-lg transition-all duration-300",
        animate && "animate-fade-in",
        className
      )}
      {...props}
    >
      {gradient && (
        <div className="absolute -inset-[1px] rounded-lg bg-gradient-to-r from-primary/50 via-primary to-primary/50 opacity-20 blur-lg -z-10" />
      )}
      {Icon && (
        <div className="absolute top-4 right-4 opacity-20">
          <Icon className={cn("h-8 w-8", iconClassName)} />
        </div>
      )}
      {children}
    </Card>
  );
};

export const StyledCardHeader = CardHeader;
export const StyledCardContent = CardContent;
export const StyledCardTitle = CardTitle;
export const StyledCardDescription = CardDescription;
export const StyledCardFooter = CardFooter;

