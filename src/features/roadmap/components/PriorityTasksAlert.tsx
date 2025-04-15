
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { Category } from "../types";

interface CategoryCount {
  [key in Category]: number;
}

interface PriorityTasksAlertProps {
  highPriorityItemsCount: number;
  categoryCounts: CategoryCount;
}

export const PriorityTasksAlert = ({ highPriorityItemsCount, categoryCounts }: PriorityTasksAlertProps) => (
  <Alert className="border-amber-500/50 bg-amber-500/5 animate-in slide-in-from-bottom">
    <AlertTitle className="text-amber-500 font-bold text-lg flex items-center gap-2">
      <AlertTriangle className="h-5 w-5" />
      Organizare Task-uri Prioritare
    </AlertTitle>
    <AlertDescription>
      <p className="mt-2 text-foreground/90 leading-relaxed mb-2">
        Avem {highPriorityItemsCount} task-uri cu prioritate înaltă organizate în categorii pentru rezolvare eficientă. 
        Folosiți filtrele pentru vizualizarea și gestionarea acestor task-uri după categorie sau progres.
      </p>
      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mt-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary"></div>
          <span>Product: {categoryCounts.product || 0}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          <span>Development: {categoryCounts.development || 0}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-purple-500"></div>
          <span>Infrastructure: {categoryCounts.infrastructure || 0}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-600"></div>
          <span>Security: {categoryCounts.security || 0}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-600"></div>
          <span>DevOps: {categoryCounts.devops || 0}</span>
        </div>
      </div>
    </AlertDescription>
  </Alert>
);
