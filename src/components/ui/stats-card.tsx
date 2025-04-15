
import { LucideIcon } from "lucide-react";
import { StyledCard } from "./card-variants";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  colorClass?: string;
}

export function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  colorClass = "text-primary"
}: StatsCardProps) {
  return (
    <StyledCard variant="gradient" className="relative overflow-hidden">
      <div className="p-6 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <Icon className={`h-5 w-5 ${colorClass}`} />
        </div>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
      <div className={`absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r ${colorClass.replace('text', 'from')} to-transparent`} />
    </StyledCard>
  );
}
