
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
  default: "border-[1px] border-primary/10 relative overflow-hidden",
  pricing: "border-[1px] relative overflow-hidden",
  gradient: "bg-background border-[1px] border-primary/10",
  transparent: "bg-background/50 border-[1px] border-primary/20"
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
    </Card>
  );
};

export const StyledCardHeader = CardHeader;
export const StyledCardContent = CardContent;
export const StyledCardTitle = CardTitle;
export const StyledCardDescription = CardDescription;
export const StyledCardFooter = CardFooter;

