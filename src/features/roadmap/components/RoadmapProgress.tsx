
import { roadmapItems } from "../data/roadmap-data";
import { Progress } from "@/components/ui/progress";
import { Shield, BarChart2, Server } from "lucide-react";
import { cn } from "@/lib/utils";
import { StyledCard, StyledCardContent } from "@/components/ui/styled-card";

export const RoadmapProgress = () => {
  const totalItems = roadmapItems.length;
  const completedItems = roadmapItems.filter(item => item.status === "completed").length;
  const completionPercentage = Math.round((completedItems / totalItems) * 100);

  const stats = [
    {
      label: "Securitate",
      icon: Shield,
      value: roadmapItems.filter(item => 
        item.category === "security" && item.status === "completed"
      ).length,
      total: roadmapItems.filter(item => item.category === "security").length,
      gradient: "from-green-500/5 to-green-500/10",
      progressColor: "bg-green-600"
    },
    {
      label: "DevOps",
      icon: Server,
      value: roadmapItems.filter(item => 
        item.category === "devops" && item.status === "completed"
      ).length,
      total: roadmapItems.filter(item => item.category === "devops").length,
      gradient: "from-amber-500/5 to-amber-500/10",
      progressColor: "bg-amber-600"
    },
    {
      label: "Total Progress",
      icon: BarChart2,
      value: completedItems,
      total: totalItems,
      gradient: "from-blue-500/5 to-blue-500/10",
      progressColor: "bg-blue-600"
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat, idx) => (
        <StyledCard 
          key={idx}
          className={cn(
            "bg-gradient-to-br backdrop-blur-sm",
            stat.gradient
          )}
        >
          <StyledCardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <stat.icon className="h-5 w-5 text-muted-foreground" />
                <h3 className="font-medium">{stat.label}</h3>
              </div>
              <span className="text-2xl font-bold">
                {Math.round((stat.value / stat.total) * 100)}%
              </span>
            </div>
            
            <Progress 
              value={(stat.value / stat.total) * 100} 
              className={cn("h-2", stat.progressColor)}
            />
            
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span>Completat</span>
              <span>{stat.value} din {stat.total}</span>
            </div>
          </StyledCardContent>
        </StyledCard>
      ))}
    </div>
  );
};
