
import React from 'react';
import { StyledCard } from '@/components/ui/cards';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface AutonomyFeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
}

export const AutonomyFeatureCard: React.FC<AutonomyFeatureCardProps> = ({
  title,
  description,
  icon: Icon,
  className,
}) => {
  return (
    <StyledCard className={cn("h-full", className)}>
      <div className="p-5">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white">
            <Icon className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-medium">{title}</h3>
        </div>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </StyledCard>
  );
};
