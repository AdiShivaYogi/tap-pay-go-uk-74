
import { Activity, BarChart2, Clock, ListTodo } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useRoadmapProgress } from "../../hooks/useRoadmapProgress";
import { Badge } from "@/components/ui/badge";

export const HeaderExecutionScore = () => {
  const {
    totalItems,
    completedItems,
    inProgressItems,
    pendingItems,
    executionScore,
    progressScore,
    timeEfficiency,
    categoryProgress
  } = useRoadmapProgress();

  const getProgressColor = (score: number) => {
    if (score >= 75) return "bg-green-500";
    if (score >= 50) return "bg-amber-500";
    return "bg-blue-500";
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          <span className="font-medium">Implementation Progress</span>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="bg-primary/10">
            <Clock className="h-4 w-4 mr-2" />
            Eficiență: {timeEfficiency}%
          </Badge>
          <span className="text-lg font-bold text-primary">{executionScore}%</span>
        </div>
      </div>

      <Progress 
        value={progressScore} 
        className={cn(
          "h-2 bg-background",
          getProgressColor(progressScore)
        )}
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
        <div className="px-3 py-2 rounded-lg bg-green-100/50 text-green-700 flex items-center justify-center gap-2">
          <ListTodo className="h-4 w-4" />
          {completedItems} Complete
        </div>
        <div className="px-3 py-2 rounded-lg bg-amber-100/50 text-amber-700 flex items-center justify-center gap-2">
          <BarChart2 className="h-4 w-4" />
          {inProgressItems} În Lucru
        </div>
        <div className="px-3 py-2 rounded-lg bg-muted text-muted-foreground flex items-center justify-center gap-2">
          <Activity className="h-4 w-4" />
          {totalItems} Total
        </div>
        <div className="px-3 py-2 rounded-lg bg-primary/10 text-primary flex items-center justify-center gap-2">
          <BarChart2 className="h-4 w-4" />
          {progressScore}% Overall
        </div>
      </div>

      {Object.entries(categoryProgress).length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
          {Object.entries(categoryProgress).map(([category, progress]) => {
            const completion = Math.round((progress.completed / progress.total) * 100);
            return (
              <div key={category} className="space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground capitalize">
                  <span>{category}</span>
                  <span>{completion}%</span>
                </div>
                <Progress 
                  value={completion} 
                  className={cn("h-1", getProgressColor(completion))}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
