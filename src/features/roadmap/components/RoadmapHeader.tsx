
import { Compass, ChevronRight, Star, BarChart2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { roadmapItems } from "../data/roadmap-data";

export const RoadmapHeader = () => {
  const totalItems = roadmapItems.length;
  const completedItems = roadmapItems.filter(item => item.status === "completed").length;
  const completionPercentage = Math.round((completedItems / totalItems) * 100);
  
  return (
    <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-6 mb-8">
      <div className="flex items-center gap-2 text-muted-foreground mb-2">
        <Compass className="h-4 w-4" />
        <span>Roadmap</span>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">Development Progress</span>
      </div>
      
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-4">
            Development Roadmap
            <Star className="text-yellow-500 h-6 w-6" />
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Track our progress and commitment to security, transparency, and user experience
          </p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2 mb-2">
            <BarChart2 className="h-5 w-5 text-primary" />
            <span className="text-2xl font-bold">{completionPercentage}%</span>
          </div>
          <p className="text-sm text-muted-foreground">Overall Progress</p>
        </div>
      </div>
      
      <Progress value={completionPercentage} className="h-2 bg-primary/20" />
    </div>
  );
};
