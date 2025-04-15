
import { roadmapItems } from "../data/roadmap-data";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Shield, BarChart2, Server } from "lucide-react";
import { cn } from "@/lib/utils";

export const RoadmapProgress = () => {
  const totalItems = roadmapItems.length;
  const completedItems = roadmapItems.filter(item => item.status === "completed").length;
  const inProgressItems = roadmapItems.filter(item => item.status === "in-progress").length;
  const completionPercentage = Math.round((completedItems / totalItems) * 100);

  const stats = [
    {
      label: "Securitate",
      icon: Shield,
      value: roadmapItems.filter(item => 
        item.category === "security" && item.status === "completed"
      ).length,
      total: roadmapItems.filter(item => item.category === "security").length,
      color: "text-green-500"
    },
    {
      label: "DevOps",
      icon: Server,
      value: roadmapItems.filter(item => 
        item.category === "devops" && item.status === "completed"
      ).length,
      total: roadmapItems.filter(item => item.category === "devops").length,
      color: "text-amber-500"
    },
    {
      label: "Total Progress",
      icon: BarChart2,
      value: completedItems,
      total: totalItems,
      color: "text-blue-500"
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat, idx) => (
        <Card key={idx} className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <stat.icon className={cn("h-5 w-5", stat.color)} />
              <h3 className="font-medium">{stat.label}</h3>
            </div>
            <span className="text-2xl font-bold">
              {Math.round((stat.value / stat.total) * 100)}%
            </span>
          </div>
          <Progress 
            value={(stat.value / stat.total) * 100} 
            className="h-2"
          />
          <p className="text-sm text-muted-foreground mt-2">
            {stat.value} din {stat.total} completate
          </p>
        </Card>
      ))}
    </div>
  );
};
