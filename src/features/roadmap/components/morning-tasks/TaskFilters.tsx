
import { Filter, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CompletionFilterType, SortByType } from "../../hooks/usePriorityTasks";

interface TaskFiltersProps {
  completionFilter: CompletionFilterType;
  setCompletionFilter: (filter: CompletionFilterType) => void;
  sortBy: SortByType;
  setSortBy: (sort: SortByType) => void;
}

export const TaskFilters = ({
  completionFilter,
  setCompletionFilter,
  sortBy,
  setSortBy
}: TaskFiltersProps) => {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-amber-700" />
          <span className="text-sm font-medium text-amber-900">Filtrare după progres:</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {/* Filter buttons */}
          <Button 
            size="sm" 
            variant={completionFilter === "all" ? "default" : "outline"}
            onClick={() => setCompletionFilter("all")}
            className={completionFilter === "all" ? "bg-amber-600 hover:bg-amber-700" : "border-amber-300 text-amber-800"}
          >
            Toate
          </Button>
          <Button 
            size="sm" 
            variant={completionFilter === "nearly-done" ? "default" : "outline"}
            onClick={() => setCompletionFilter("nearly-done")}
            className={completionFilter === "nearly-done" ? "bg-amber-600 hover:bg-amber-700" : "border-amber-300 text-amber-800"}
          >
            Aproape gata ({'>'}70%)
          </Button>
          <Button 
            size="sm" 
            variant={completionFilter === "started" ? "default" : "outline"}
            onClick={() => setCompletionFilter("started")}
            className={completionFilter === "started" ? "bg-amber-600 hover:bg-amber-700" : "border-amber-300 text-amber-800"}
          >
            În lucru (20-70%)
          </Button>
          <Button 
            size="sm" 
            variant={completionFilter === "stuck" ? "default" : "outline"}
            onClick={() => setCompletionFilter("stuck")}
            className={completionFilter === "stuck" ? "bg-amber-600 hover:bg-amber-700" : "border-amber-300 text-amber-800"}
          >
            De început ({'<'}20%)
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-amber-700" />
          <span className="text-sm font-medium text-amber-900">Sortare după:</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button 
            size="sm" 
            variant={sortBy === "progress" ? "default" : "outline"}
            onClick={() => setSortBy("progress")}
            className={sortBy === "progress" ? "bg-amber-600 hover:bg-amber-700" : "border-amber-300 text-amber-800"}
          >
            Procent Completare
          </Button>
          <Button 
            size="sm" 
            variant={sortBy === "estimate" ? "default" : "outline"}
            onClick={() => setSortBy("estimate")}
            className={sortBy === "estimate" ? "bg-amber-600 hover:bg-amber-700" : "border-amber-300 text-amber-800"}
          >
            Timp Rămas
          </Button>
          <Button 
            size="sm" 
            variant={sortBy === "priority" ? "default" : "outline"}
            onClick={() => setSortBy("priority")}
            className={sortBy === "priority" ? "bg-amber-600 hover:bg-amber-700" : "border-amber-300 text-amber-800"}
          >
            Prioritate
          </Button>
        </div>
      </div>
    </div>
  );
};
