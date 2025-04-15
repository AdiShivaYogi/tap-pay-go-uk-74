
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

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case "security": return "from-green-500/5 to-green-500/10";
      case "infrastructure": return "from-purple-500/5 to-purple-500/10";
      case "devops": return "from-amber-500/5 to-amber-500/10";
      case "product": return "from-blue-500/5 to-blue-500/10";
      default: return "from-gray-500/5 to-gray-500/10";
    }
  };

  // Debug item
  console.log("Rendering item:", item);

  return (
    <Card className={cn(
      "hover:shadow-lg transition-all duration-300 bg-gradient-to-br",
      getCategoryColor(item.category),
      isHighPriority && !isCompleted && "ring-2 ring-primary/20",
      isCompleted && "opacity-90"
    )}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="space-y-2">
          {item.iconType && (
            <span className="inline-flex p-2 rounded-lg bg-background/80 backdrop-blur-sm">
              <RoadmapIcon type={item.iconType} className="h-5 w-5" color={item.iconColor || "text-primary"} />
            </span>
          )}
          <CardTitle className="text-xl font-bold flex items-center gap-2 mt-2">
            {item.title}
            {isHighPriority && !isCompleted && (
              <AlertTriangle className="h-4 w-4 text-amber-500 animate-pulse" />
            )}
          </CardTitle>
        </div>
        {getStatusIcon(item.status)}
      </CardHeader>
      
      <CardContent className="space-y-4">
        <CardDescription className="text-sm">
          {item.description}
        </CardDescription>

        <div className="flex flex-wrap items-center gap-2">
          {getStatusBadge(item.status)}
          {getPriorityBadge(item.priority)}
        </div>

        <ul className="space-y-2">
          {item.details && item.details.map((detail, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm">
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
