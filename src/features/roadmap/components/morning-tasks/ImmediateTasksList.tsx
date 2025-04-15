
import { Badge } from "@/components/ui/badge";
import { TaskWithProgress } from "../types/task-types";
import { Zap } from "lucide-react";

interface ImmediateTasksListProps {
  tasks: TaskWithProgress[];
}

export const ImmediateTasksList = ({ tasks }: ImmediateTasksListProps) => {
  if (tasks.length === 0) return null;

  return (
    <div className="space-y-3 p-4 bg-amber-100/50 rounded-md border border-amber-200">
      <h4 className="font-medium flex items-center gap-2">
        <Zap className="h-4 w-4 text-amber-600" />
        <span className="text-amber-900">Priorități Imediate</span>
      </h4>
      
      <div className="grid gap-3">
        {tasks.map((task, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-white rounded-md border border-amber-100">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-medium bg-red-500">
                !
              </div>
              <div>
                <h5 className="font-medium text-amber-900">{task.title}</h5>
                <div className="flex items-center gap-2 text-xs text-amber-700">
                  <span>{task.timeRemaining} ore rămase</span>
                  <span>•</span>
                  <span>{task.progressPercentage}% complet</span>
                </div>
              </div>
            </div>
            <Badge variant="outline" className="bg-amber-100 text-amber-800">
              {task.category || "Prioritate"}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
};
