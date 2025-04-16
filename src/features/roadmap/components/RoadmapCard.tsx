
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { TimeEstimationBadge } from "./TimeEstimationBadge";
import { calculateTaskDifficulty } from "../hooks/useRoadmapProgress";
import { ChevronDown, ChevronRight } from "lucide-react";
import { 
  StyledCard, 
  StyledCardHeader, 
  StyledCardContent, 
  StyledCardFooter,
  StyledCardTitle,
  StyledCardDescription
} from "@/components/ui/cards";
import { RoadmapIcon } from "./RoadmapIcon";

interface RoadmapCardProps {
  item: RoadmapItem;
  isExpanded: boolean;
  toggleExpand: () => void;
}

export interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  category: string;
  status: "planned" | "in_progress" | "completed";
  difficulty: "easy" | "medium" | "hard";
  time_estimation: "days" | "weeks" | "months";
  progress: number;
}

export const RoadmapCard: React.FC<RoadmapCardProps> = ({ item, isExpanded, toggleExpand }) => {
  const difficultyColor = calculateTaskDifficulty(item.difficulty);

  return (
    <StyledCard className="border-primary/10">
      <StyledCardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <StyledCardTitle className="text-sm font-medium flex items-center gap-2">
          <RoadmapIcon categoryType={item.category} />
          {item.title}
        </StyledCardTitle>
        <RoadmapCardActions item={item} isExpanded={isExpanded} toggleExpand={toggleExpand} />
      </StyledCardHeader>
      <StyledCardContent>
        {isExpanded && (
          <div className="space-y-4">
            <StyledCardDescription>{item.description}</StyledCardDescription>
            <Progress value={item.progress} className="h-2" />
            <div className="flex items-center justify-between">
              <Badge variant="outline" className={cn("capitalize", difficultyColor)}>
                {item.difficulty}
              </Badge>
              <TimeEstimationBadge timeEstimate={item.time_estimation} />
            </div>
          </div>
        )}
      </StyledCardContent>
      <StyledCardFooter className="text-xs text-muted-foreground">{item.category}</StyledCardFooter>
    </StyledCard>
  );
};

interface RoadmapCardActionsProps {
  item: RoadmapItem;
  isExpanded: boolean;
  toggleExpand: () => void;
}

const RoadmapCardActions: React.FC<RoadmapCardActionsProps> = ({ item, isExpanded, toggleExpand }) => {
  return (
    <button onClick={toggleExpand}>
      <Badge variant="secondary" className="gap-2">
        {item.status}
        {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </Badge>
    </button>
  );
};
