
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, CheckCircle2, Circle, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TaskProgress {
  name: string;
  status: "completed" | "in-progress" | "pending";
  percentage: number;
  priority?: "high";
}

const betaLaunchTasks: TaskProgress[] = [
  {
    name: "Flux Onboarding",
    status: "in-progress",
    percentage: 70,
  },
  {
    name: "Autentificare & Invitații",
    status: "completed",
    percentage: 100,
  },
  {
    name: "Integrare Plăți (Test)",
    status: "in-progress",
    percentage: 85,
    priority: "high",
  },
  {
    name: "Sistem Feedback",
    status: "pending",
    percentage: 20,
  },
  {
    name: "Setup Comunicare",
    status: "in-progress",
    percentage: 45,
  },
];

export const BetaLaunchProgress = () => {
  const getStatusIcon = (status: TaskProgress["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "in-progress":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case "pending":
        return <Circle className="h-5 w-5 text-gray-400" />;
    }
  };

  const overallProgress = Math.round(
    betaLaunchTasks.reduce((acc, task) => acc + task.percentage, 0) / betaLaunchTasks.length
  );

  return (
    <Card className="mb-8">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          Progres Lansare Beta
          <span className="text-2xl text-primary">{overallProgress}%</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Progress value={overallProgress} className="h-2" />
        
        <div className="grid gap-4">
          {betaLaunchTasks.map((task, index) => (
            <div 
              key={index} 
              className={cn(
                "flex items-center gap-4 p-4 rounded-lg transition-colors",
                task.priority === "high" && "bg-amber-50/50 border border-amber-200"
              )}
            >
              {getStatusIcon(task.status)}
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{task.name}</span>
                    {task.priority === "high" && (
                      <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-200">
                        <Zap className="h-3 w-3 mr-1" />
                        Prioritate Înaltă
                      </Badge>
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground">{task.percentage}%</span>
                </div>
                <Progress 
                  value={task.percentage} 
                  className={cn(
                    "h-1.5",
                    task.priority === "high" && "bg-amber-100 [&>[role=progressbar]]:bg-amber-500"
                  )} 
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
