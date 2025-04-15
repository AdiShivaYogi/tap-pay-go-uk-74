
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, ArrowUpCircle } from "lucide-react";
import { Category } from "../types";

type CategoryCount = Record<Category | 'all' | 'other', number>;

interface PriorityTasksAlertProps {
  highPriorityItemsCount: number;
  categoryCounts: CategoryCount;
}

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
          Concentrare pe rezolvarea task-urilor prioritare pentru a avansa mai rapid
        </span>
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
