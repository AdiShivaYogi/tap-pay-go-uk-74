
import { Clock } from "lucide-react";
import { TimeEstimate } from "../types";
import { Progress } from "@/components/ui/progress";

interface TimeEstimationBadgeProps {
  timeEstimate: TimeEstimate;
  status: "completed" | "in-progress" | "pending";
}

export const TimeEstimationBadge = ({ timeEstimate, status }: TimeEstimationBadgeProps) => {
  const progress = status === "completed" 
    ? 100 
    : status === "in-progress" && timeEstimate.spent 
      ? Math.round((timeEstimate.spent / timeEstimate.total) * 100)
      : 0;

  return (
    <div className="flex flex-col gap-2 mt-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Clock className="h-4 w-4" />
        <span>
          {status === "completed" 
            ? `Finalizat în ${timeEstimate.total} ore`
            : status === "in-progress" && timeEstimate.spent
            ? `${timeEstimate.spent}/${timeEstimate.total} ore estimate`
            : `${timeEstimate.total} ore estimate`}
        </span>
      </div>
      <Progress value={progress} className="h-1.5" />
    </div>
  );
};
