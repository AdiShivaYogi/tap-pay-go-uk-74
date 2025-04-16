
import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useRoadmapProgress } from "../hooks/useRoadmapProgress";

export const RoadmapProgress = () => {
  const {
    totalTasks,
    completedTasks,
    completionPercentage,
    difficultySum,
    estimatedTimeSum,
  } = useRoadmapProgress();

  const difficultyLabel = useMemo(() => {
    if (difficultySum <= 5) return "Ușor";
    if (difficultySum <= 10) return "Mediu";
    return "Avansat";
  }, [difficultySum]);

  const timeEstimationLabel = useMemo(() => {
    if (estimatedTimeSum <= 4) return "Scurt (1-4 ore)";
    if (estimatedTimeSum <= 12) return "Mediu (4-12 ore)";
    return "Lung (peste 12 ore)";
  }, [estimatedTimeSum]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Progres Roadmap</h3>
        <Badge variant="secondary">{completionPercentage}% finalizat</Badge>
      </div>
      <Progress value={completionPercentage} className="h-2" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Dificultate</p>
          <Badge>{difficultyLabel}</Badge>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Estimare timp</p>
          <Badge>{timeEstimationLabel}</Badge>
        </div>
      </div>
      <div className="text-sm text-muted-foreground">
        {completedTasks} / {totalTasks} sarcini finalizate
      </div>
    </div>
  );
};
