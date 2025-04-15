
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, ArrowUpCircle, CheckCircle2, Clock } from "lucide-react";
import { Category } from "../types";
import { Progress } from "@/components/ui/progress";

type CategoryCount = Record<Category | 'all' | 'other', number>;

interface PriorityTasksAlertProps {
  highPriorityItemsCount: number;
  categoryCounts: CategoryCount;
}

// Helper function to calculate task completion based on time estimates
const calculateCompletion = (spent: number, total: number) => {
  return Math.round((spent / total) * 100);
};

// Priority task item type
interface PriorityTaskInfo {
  title: string;
  completion: number;
  timeSpent: number;
  timeTotal: number;
  remaining: number;
}

// Sample priority task data - this would typically come from your roadmap data
const priorityTasks: PriorityTaskInfo[] = [
  { title: "Securitate Avansată Cloud", completion: calculateCompletion(20, 30), timeSpent: 20, timeTotal: 30, remaining: 10 },
  { title: "Monitorizare și Alertare", completion: calculateCompletion(15, 20), timeSpent: 15, timeTotal: 20, remaining: 5 },
  { title: "Optimizare și Monitorizare Cloud", completion: calculateCompletion(32, 35), timeSpent: 32, timeTotal: 35, remaining: 3 },
  { title: "Optimizare UX Mobile", completion: calculateCompletion(8, 18), timeSpent: 8, timeTotal: 18, remaining: 10 },
  { title: "Pregătire Integrări Viitoare", completion: calculateCompletion(5, 25), timeSpent: 5, timeTotal: 25, remaining: 20 },
  { title: "Îmbunătățiri Securitate Internă", completion: calculateCompletion(12, 20), timeSpent: 12, timeTotal: 20, remaining: 8 },
  { title: "Optimizare Performanță Back-end", completion: calculateCompletion(14, 22), timeSpent: 14, timeTotal: 22, remaining: 8 },
  { title: "Sistem de Backup și Recuperare", completion: calculateCompletion(13, 18), timeSpent: 13, timeTotal: 18, remaining: 5 },
  { title: "Automatizare și DevOps", completion: calculateCompletion(16, 24), timeSpent: 16, timeTotal: 24, remaining: 8 },
];

// Sort tasks by completion percentage (descending)
const sortedTasks = [...priorityTasks].sort((a, b) => b.completion - a.completion);

export const PriorityTasksAlert = ({ highPriorityItemsCount, categoryCounts }: PriorityTasksAlertProps) => (
  <Alert className="border-amber-500/50 bg-amber-500/5 animate-in slide-in-from-bottom">
    <AlertTitle className="text-amber-500 font-bold text-lg flex items-center gap-2">
      <AlertTriangle className="h-5 w-5" />
      Task-uri cu Prioritate Înaltă (x{highPriorityItemsCount})
    </AlertTitle>
    <AlertDescription className="mt-2">
      <div className="flex items-center gap-2 mb-3">
        <ArrowUpCircle className="h-4 w-4 text-amber-500" />
        <span className="text-amber-700 font-medium">
          Recomandare de abordare a task-urilor prioritare în funcție de progres
        </span>
      </div>
      
      <div className="space-y-3 mb-4">
        {sortedTasks.map((task, index) => (
          <div key={index} className="bg-white/70 border border-amber-200 rounded-md p-3">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                {task.completion >= 75 ? (
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                ) : (
                  <Clock className="h-4 w-4 text-amber-600" />
                )}
                <span className="font-medium">{task.title}</span>
              </div>
              <span className="text-sm font-semibold">
                {task.completion}% completat
              </span>
            </div>
            <Progress value={task.completion} className="h-1.5 mb-1" />
            <div className="text-xs text-gray-600 flex justify-between">
              <span>{task.timeSpent}/{task.timeTotal} ore</span>
              <span>{task.remaining} ore rămase</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {Object.entries(categoryCounts).map(([category, count]) => {
          if (count === 0 || category === 'all') return null;
          return (
            <div 
              key={category}
              className="flex items-center gap-2 p-2 rounded-md bg-white/50 border border-amber-200"
            >
              <div className="w-2 h-2 rounded-full bg-amber-500"></div>
              <span className="text-sm font-medium text-amber-800 capitalize">
                {category === 'other' ? 'Altele' : category}: {count}
              </span>
            </div>
          );
        })}
      </div>
    </AlertDescription>
  </Alert>
);
