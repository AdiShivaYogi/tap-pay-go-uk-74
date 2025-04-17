
import React from 'react';
import { StyledCard } from '@/components/ui/cards';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2 } from 'lucide-react';

interface AutonomyFeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
  implemented?: boolean;
}

export const AutonomyFeatureCard: React.FC<AutonomyFeatureCardProps> = ({
  title,
  description,
  icon: Icon,
  className,
  implemented = false
}) => {
  return (
    <StyledCard className={cn(
      'h-full flex flex-col', 
      implemented ? 'border-green-300 shadow-green-100/50' : '',
      className
    )}>
      <div className="p-4 flex-grow">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-medium">{title}</h3>
          <div className="text-primary text-xl">
            <Icon />
          </div>
        </div>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      
      {implemented && (
        <div className="px-4 pb-4 mt-2">
          <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white flex items-center gap-1 w-full justify-center">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Implementat
          </Badge>
        </div>
      )}
    </StyledCard>
  );
};
