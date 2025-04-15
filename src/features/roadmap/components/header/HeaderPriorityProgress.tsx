
import { AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { roadmapItems } from "../../data/roadmap-data";

export const HeaderPriorityProgress = () => {
  const highPriorityItems = roadmapItems.filter(item => item.priority === "high");
  const totalHighPriority = highPriorityItems.length;
  const completedHighPriority = highPriorityItems.filter(item => item.status === "completed").length;
  const highPriorityPercentage = totalHighPriority > 0 
    ? Math.round((completedHighPriority / totalHighPriority) * 100) 
    : 100;

  return (
    <div className="space-y-4 mt-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          <span className="font-medium">High Priority Tasks</span>
        </div>
        <span className="text-lg font-bold text-amber-500">
          {completedHighPriority}/{totalHighPriority} ({highPriorityPercentage}%)
        </span>
      </div>

      <Progress 
        value={highPriorityPercentage} 
        className={cn("h-2 bg-amber-100", "data-[value]:bg-amber-500")}
      />
    </div>
  );
};
