
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "./card";
import { cn } from "@/lib/utils";

interface StyledCardProps extends React.ComponentProps<typeof Card> {
  children: React.ReactNode;
  gradient?: boolean;
  hover?: boolean;
}

export const StyledCard = ({ 
  children, 
  className, 
  gradient = true, 
  hover = true,
  ...props 
}: StyledCardProps) => {
  return (
    <Card 
      className={cn(
        "border-2 border-primary/10 relative overflow-hidden",
        hover && "hover:shadow-md transition-shadow duration-300",
        className
      )} 
      {...props}
    >
      {children}
      {gradient && (
        <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-primary to-transparent animate-pulse" />
      )}
    </Card>
  );
};

export const StyledCardHeader = CardHeader;
export const StyledCardContent = CardContent;
export const StyledCardTitle = CardTitle;
export const StyledCardDescription = CardDescription;
export const StyledCardFooter = CardFooter;
