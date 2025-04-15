
import { CheckCircle2, Clock, CircleDot, ChevronRight, AlertTriangle } from "lucide-react";
import { roadmapItems } from "../data/roadmap-data";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const RoadmapProgress = () => {
  const navigate = useNavigate();
  const totalItems = roadmapItems.length;
  const completedItems = roadmapItems.filter(item => item.status === "completed").length;
  const inProgressItems = roadmapItems.filter(item => item.status === "in-progress").length;
  const pendingItems = roadmapItems.filter(item => item.status === "pending").length;
  const highPriorityItems = roadmapItems.filter(item => item.priority === "high").length;
  
  // Identificăm task-urile prioritare în progres și le sortăm după progresul realizat
  const highPriorityInProgress = roadmapItems
    .filter(item => item.priority === "high" && item.status === "in-progress")
    .sort((a, b) => {
      // Sortăm după progres (descrescător)
      const progressA = a.timeEstimate.spent / a.timeEstimate.total;
      const progressB = b.timeEstimate.spent / b.timeEstimate.total;
      return progressB - progressA;
    });

  // Top 3 task-uri prioritare aproape finalizate
  const topNearlyCompletedTasks = highPriorityInProgress
    .filter(item => item.timeEstimate.spent / item.timeEstimate.total > 0.6)
    .slice(0, 3);

  const [showPrioritySuggestions, setShowPrioritySuggestions] = useState(true);

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

  const focusOnNearlyCompleted = () => {
    navigate("/roadmap", { state: { focusCategory: "high-priority" } });
    // Scrollam la secțiunea de task-uri prioritare
    setTimeout(() => {
      document.getElementById("high-priority-tasks")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

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

      {showPrioritySuggestions && topNearlyCompletedTasks.length > 0 && (
        <Alert className="bg-amber-50 border-amber-200 animate-in fade-in slide-in-from-bottom">
          <div className="flex justify-between">
            <AlertTitle className="text-amber-800 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              Recomandare Începere Zi
            </AlertTitle>
            <Button variant="ghost" size="sm" onClick={() => setShowPrioritySuggestions(false)} className="h-6 w-6 p-0 rounded-full">
              ×
            </Button>
          </div>
          <AlertDescription>
            <p className="mb-2 text-amber-700">
              Avansați rapid completând aceste task-uri prioritare care sunt aproape finalizate:
            </p>
            <ul className="list-disc pl-5 mb-3 text-amber-800 space-y-1">
              {topNearlyCompletedTasks.map((task, idx) => {
                const progress = Math.round((task.timeEstimate.spent / task.timeEstimate.total) * 100);
                return (
                  <li key={idx} className="text-sm">
                    <span className="font-medium">{task.title}</span>
                    <span className="text-xs ml-2">({progress}% complet, {task.timeEstimate.total - task.timeEstimate.spent} ore rămase)</span>
                  </li>
                );
              })}
            </ul>
            <div className="flex justify-end">
              <Button 
                size="sm"
                variant="outline"
                className="border-amber-500 text-amber-700 hover:bg-amber-100"
                onClick={focusOnNearlyCompleted}
              >
                Arată toate task-urile prioritare
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {highPriorityItems > 0 && (
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <p className="text-sm font-medium text-amber-700">
              {highPriorityItems} task-uri cu prioritate înaltă necesită atenție
            </p>
          </div>
          <div className="text-xs text-muted-foreground">
            {new Date().toLocaleDateString('ro-RO', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}
          </div>
        </div>
      )}
    </div>
  );
};
