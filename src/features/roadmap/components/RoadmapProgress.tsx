
import { CheckCircle2, Clock, CircleDot } from "lucide-react";
import { roadmapItems } from "../types";
import { Progress } from "@/components/ui/progress";

export const RoadmapProgress = () => {
  const totalItems = roadmapItems.length;
  const completedItems = roadmapItems.filter(item => item.status === "completed").length;
  const inProgressItems = roadmapItems.filter(item => item.status === "in-progress").length;
  const pendingItems = roadmapItems.filter(item => item.status === "pending").length;
  const highPriorityItems = roadmapItems.filter(item => item.priority === "high").length;

  const stats = [
    {
      label: "Completate",
      value: completedItems,
      icon: CheckCircle2,
      color: "text-green-500"
    },
    {
      label: "În Lucru",
      value: inProgressItems,
      icon: Clock,
      color: "text-blue-500"
    },
    {
      label: "În Așteptare",
      value: pendingItems,
      icon: CircleDot,
      color: "text-gray-400"
    }
  ];

  const completionPercentage = Math.round((completedItems / totalItems) * 100);

  return (
    <div className="space-y-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div 
            key={stat.label} 
            className="flex items-center gap-4 p-4 rounded-lg border bg-card"
          >
            <div className={`p-2 rounded-full bg-background ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="border rounded-lg p-4 bg-card">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold">Progres General</h3>
          <span className="text-sm font-medium">{completionPercentage}% completat</span>
        </div>
        <Progress value={completionPercentage} className="h-2" />
      </div>
    </div>
  );
};
