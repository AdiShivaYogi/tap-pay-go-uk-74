
import { useRoadmapProgress } from "../hooks/useRoadmapProgress";
import { RoadmapIcon } from "./RoadmapIcon";
import { StyledCard } from "@/components/ui/card-variants";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, TrendingUp, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const ProgressOptimizationPanel = () => {
  const { 
    executionScore, 
    progressScore, 
    potentialScoreGain, 
    highImpactItems 
  } = useRoadmapProgress();

  return (
    <StyledCard className="border-primary/10">
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h3 className="font-medium">Optimizare Progres</h3>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-primary/10 text-primary">
              Actual: {progressScore}%
            </Badge>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <Badge variant="secondary" className="bg-primary text-primary-foreground">
              Potențial: {potentialScoreGain.potentialScore}%
            </Badge>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Câștig potențial</span>
            <span className="font-medium text-primary">+{potentialScoreGain.scoreIncrease}%</span>
          </div>
          <Progress 
            value={potentialScoreGain.scoreIncrease} 
            max={100 - executionScore}
            className="h-2"
          />
        </div>
        
        <div className="space-y-3">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <Zap className="h-4 w-4 text-amber-500" />
            Acțiuni cu impact maxim
          </h4>
          
          <div className="space-y-2">
            {highImpactItems.map((item, index) => {
              const timeRemaining = item.timeEstimate.total - (item.timeEstimate.spent || 0);
              const progress = ((item.timeEstimate.spent || 0) / item.timeEstimate.total) * 100;
              
              return (
                <div 
                  key={index} 
                  className="p-3 rounded-md border border-border bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {item.iconType && (
                        <div className="rounded-md p-1 bg-background">
                          <RoadmapIcon 
                            type={item.iconType} 
                            className={cn("h-4 w-4", item.iconColor || "text-primary")} 
                          />
                        </div>
                      )}
                      <div>
                        <h5 className="font-medium text-sm">{item.title}</h5>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="bg-amber-100/50 text-amber-700">
                        {timeRemaining}h rămas
                      </Badge>
                      <div className="mt-1">
                        <Progress value={progress} className="h-1 w-16" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </StyledCard>
  );
};
