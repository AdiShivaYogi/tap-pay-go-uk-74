
import { Clock, Robot } from "lucide-react";
import { TimeEstimate } from "../types";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { Label } from "@/components/ui/label";

interface TimeEstimationBadgeProps {
  timeEstimate: TimeEstimate;
  status: "completed" | "in-progress" | "pending";
}

export const TimeEstimationBadge = ({ timeEstimate, status }: TimeEstimationBadgeProps) => {
  const [showAiEstimate, setShowAiEstimate] = useState(false);
  
  const totalTime = showAiEstimate ? (timeEstimate.aiTotal || timeEstimate.total) : timeEstimate.total;
  
  const progress = status === "completed" 
    ? 100 
    : status === "in-progress" && timeEstimate.spent 
      ? Math.round((timeEstimate.spent / totalTime) * 100)
      : 0;

  return (
    <div className="flex flex-col gap-2 mt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {showAiEstimate ? (
            <Robot className="h-4 w-4" />
          ) : (
            <Clock className="h-4 w-4" />
          )}
          <span>
            {status === "completed" 
              ? `Finalizat în ${totalTime} ore`
              : status === "in-progress" && timeEstimate.spent
              ? `${timeEstimate.spent}/${totalTime} ore estimate`
              : `${totalTime} ore estimate`}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="estimate-toggle" className="text-xs text-muted-foreground">
            Estimare AI
          </Label>
          <Switch
            id="estimate-toggle"
            checked={showAiEstimate}
            onCheckedChange={setShowAiEstimate}
            size="sm"
          />
        </div>
      </div>
      <Progress value={progress} className="h-1.5" />
    </div>
  );
};
