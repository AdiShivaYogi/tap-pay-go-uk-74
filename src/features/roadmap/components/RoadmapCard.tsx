
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { RoadmapItem } from "../types";
import { getStatusIcon, getStatusBadge, getPriorityBadge } from "./StatusBadges";
import { RoadmapIcon } from "./RoadmapIcon";
import { TimeEstimationBadge } from "./TimeEstimationBadge";
import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface RoadmapCardProps {
  item: RoadmapItem;
}

export const RoadmapCard = ({ item }: RoadmapCardProps) => {
  const isHighPriority = item.priority === "high";
  const isCompleted = item.status === "completed";

  return (
    <Card className={cn(
      "hover:shadow-lg transition-shadow",
      isHighPriority && "border-primary/50",
      isCompleted && "bg-muted/30"
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          {item.iconType && (
            <span className="p-2 rounded-lg bg-primary/5">
              <RoadmapIcon iconType={item.iconType} iconColor={item.iconColor || "text-primary"} />
            </span>
          )}
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            {item.title}
            {isHighPriority && !isCompleted && (
              <span className="inline-flex items-center">
                <AlertTriangle className="h-4 w-4 text-primary animate-pulse" />
              </span>
            )}
          </CardTitle>
        </div>
        {getStatusIcon(item.status)}
      </CardHeader>
      <CardDescription className="px-6 text-sm">
        {item.description}
      </CardDescription>
      <CardContent className="mt-4">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {getStatusBadge(item.status)}
          {getPriorityBadge(item.priority)}
        </div>
        <ul className="space-y-2.5">
          {item.details.map((detail, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-sm">
              <span className={cn(
                "mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0",
                isHighPriority ? "bg-primary" : "bg-primary/20"
              )} />
              <span className="text-foreground/80">{detail}</span>
            </li>
          ))}
        </ul>
        <TimeEstimationBadge 
          timeEstimate={item.timeEstimate} 
          status={item.status}
        />
      </CardContent>
    </Card>
  );
};
