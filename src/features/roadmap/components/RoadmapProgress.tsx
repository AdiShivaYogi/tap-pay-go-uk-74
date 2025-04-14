
import { CheckCircle2, Clock, CircleDot, ChevronRight } from "lucide-react";
import { roadmapItems } from "../data/roadmap-data";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";

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
      color: "text-green-500 bg-green-50"
    },
    {
      label: "În Lucru",
      value: inProgressItems,
      icon: Clock,
      color: "text-blue-500 bg-blue-50"
    },
    {
      label: "În Așteptare",
      value: pendingItems,
      icon: CircleDot,
      color: "text-gray-400 bg-gray-50"
    }
  ];

  const completionPercentage = Math.round((completedItems / totalItems) * 100);

  return (
    <div className="space-y-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Card 
            key={stat.label} 
            className="p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground/30" />
            </div>
          </Card>
        ))}
      </div>
      
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold mb-1">Progres General</h3>
            <p className="text-sm text-muted-foreground">
              {completedItems} din {totalItems} obiective completate
            </p>
          </div>
          <span className="text-2xl font-bold text-primary">
            {completionPercentage}%
          </span>
        </div>
        <Progress value={completionPercentage} className="h-2" />
      </Card>
    </div>
  );
};
