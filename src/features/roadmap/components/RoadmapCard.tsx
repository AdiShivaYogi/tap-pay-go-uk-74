
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { RoadmapItem } from "../types";
import { getStatusIcon, getStatusBadge, getPriorityBadge } from "./StatusBadges";
import { RoadmapIcon } from "./RoadmapIcon";
import { TimeEstimationBadge } from "./TimeEstimationBadge";
import { AlertTriangle } from "lucide-react";

interface RoadmapCardProps {
  item: RoadmapItem;
}

export const RoadmapCard = ({ item }: RoadmapCardProps) => {
  const isHighPriority = item.priority === "high";

  return (
    <Card className={`hover:shadow-lg transition-shadow ${isHighPriority ? 'border-primary border-2' : ''}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          {item.iconType && (
            <span>
              <RoadmapIcon iconType={item.iconType} iconColor={item.iconColor} />
            </span>
          )}
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            {item.title}
            {isHighPriority && (
              <span className="inline-flex items-center">
                <AlertTriangle className="h-4 w-4 text-primary animate-pulse" />
              </span>
            )}
          </CardTitle>
        </div>
        {getStatusIcon(item.status)}
      </CardHeader>
      <CardDescription className="px-6">
        {item.description}
      </CardDescription>
      <CardContent className="mt-4">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {getStatusBadge(item.status)}
          {getPriorityBadge(item.priority)}
        </div>
        <ul className="space-y-2">
          {item.details.map((detail, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className={`mt-2 w-2 h-2 rounded-full ${isHighPriority ? 'bg-primary' : 'bg-primary/20'} flex-shrink-0`} />
              <span>{detail}</span>
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
