
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, CheckCircle2, Circle } from "lucide-react";

interface TaskProgress {
  name: string;
  status: "completed" | "in-progress" | "pending";
  percentage: number;
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
            <div key={index} className="flex items-center gap-4">
              {getStatusIcon(task.status)}
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">{task.name}</span>
                  <span className="text-sm text-muted-foreground">{task.percentage}%</span>
                </div>
                <Progress value={task.percentage} className="h-1.5" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
