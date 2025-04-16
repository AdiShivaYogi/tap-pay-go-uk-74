
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RoadmapIcon } from "./RoadmapIcon";
import { TimeEstimationBadge } from "./TimeEstimationBadge";
import { RoadmapItem } from "../types";
import { StyledCard } from "@/components/ui/cards";

interface RoadmapCardProps {
  item: RoadmapItem;
}

export const RoadmapCard = ({ item }: RoadmapCardProps) => {
  // Calculează procentul de timp utilizat
  const timeUsedPercent = item.timeEstimate?.total
    ? Math.min(100, Math.round((item.timeEstimate.spent / item.timeEstimate.total) * 100))
    : 0;

  return (
    <StyledCard className="overflow-hidden">
      <div className="p-5">
        {/* Header - title and icon */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-semibold">{item.title}</h3>
          <RoadmapIcon 
            type={item.iconType || "code"} 
            color={item.iconColor || "text-blue-500"}
          />
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4">{item.description}</p>

        {/* Status badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge
            variant="outline"
            className={`${
              item.status === "completed" 
                ? "border-green-200 bg-green-50 text-green-700" 
                : item.status === "inProgress"
                ? "border-blue-200 bg-blue-50 text-blue-700"
                : "border-amber-200 bg-amber-50 text-amber-700"
            }`}
          >
            {item.status === "completed" 
              ? "Finalizat" 
              : item.status === "inProgress"
              ? "În progres"
              : "Planificat"}
          </Badge>

          {item.priority && (
            <Badge 
              variant="outline"
              className={`${
                item.priority === "high"
                  ? "border-red-200 bg-red-50 text-red-700"
                  : item.priority === "medium"
                  ? "border-amber-200 bg-amber-50 text-amber-700"
                  : "border-green-200 bg-green-50 text-green-700"
              }`}
            >
              {item.priority === "high" 
                ? "Prioritate înaltă" 
                : item.priority === "medium" 
                ? "Prioritate medie"
                : "Prioritate scăzută"}
            </Badge>
          )}
          
          {item.timeEstimate && (
            <TimeEstimationBadge timeEstimate={
              item.timeEstimate.total <= 10 ? "days" :
              item.timeEstimate.total <= 30 ? "weeks" : "months"
            } />
          )}
        </div>

        {/* Progress display */}
        {item.timeEstimate && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Timp utilizat</span>
              <span className="font-medium">{item.timeEstimate.spent}/{item.timeEstimate.total} zile</span>
            </div>
            <Progress value={timeUsedPercent} className="h-1" />
          </div>
        )}

        {/* Details list */}
        {item.details && item.details.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <ul className="space-y-1 text-xs">
              {item.details.map((detail, index) => (
                <li key={index} className="text-muted-foreground">
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </StyledCard>
  );
};
