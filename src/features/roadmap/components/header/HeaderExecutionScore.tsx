
import { Activity } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { roadmapItems } from "../../data/roadmap-data";

export const HeaderExecutionScore = () => {
  const totalItems = roadmapItems.length;
  const completedItems = roadmapItems.filter(item => item.status === "completed").length;
  const inProgressItems = roadmapItems.filter(item => item.status === "in-progress").length;
  const executionScore = Math.round((completedItems / totalItems) * 100);
  const progressScore = Math.round(((completedItems + (inProgressItems * 0.5)) / totalItems) * 100);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-blue-600" />
          <span className="font-medium">Execution Score</span>
        </div>
        <span className="text-lg font-bold text-blue-600">{executionScore}%</span>
      </div>

      <Progress 
        value={progressScore} 
        className={cn("h-2 bg-blue-100", "data-[value]:bg-blue-600")}
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-sm">
        <div className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-center">
          {completedItems} Complete
        </div>
        <div className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-center">
          {inProgressItems} In Progress
        </div>
        <div className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-center">
          {totalItems} Total Tasks
        </div>
        <div className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-center">
          {progressScore}% Progress
        </div>
      </div>
    </div>
  );
};
