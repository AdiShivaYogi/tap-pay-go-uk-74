
import { Activity } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useRoadmapProgress } from "../../hooks/useRoadmapProgress";

export const HeaderExecutionScore = () => {
  const {
    totalItems,
    completedItems,
    inProgressItems,
    executionScore,
    progressScore
  } = useRoadmapProgress();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          <span className="font-medium">Implementation Progress</span>
        </div>
        <span className="text-lg font-bold text-primary">{executionScore}%</span>
      </div>

      <Progress 
        value={progressScore} 
        className={cn("h-2 bg-background", "data-[value]:bg-primary")}
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
        <div className="px-3 py-1 rounded-full bg-green-100/50 text-green-700 text-center">
          {completedItems} Complete
        </div>
        <div className="px-3 py-1 rounded-full bg-amber-100/50 text-amber-700 text-center">
          {inProgressItems} In Progress
        </div>
        <div className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-center">
          {totalItems} Total Tasks
        </div>
        <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-center">
          {progressScore}% Overall
        </div>
      </div>
    </div>
  );
};
