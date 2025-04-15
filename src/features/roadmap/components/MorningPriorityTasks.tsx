
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RoadmapCard } from "./RoadmapCard";
import { cn } from "@/lib/utils";
import { MorningHeader } from "./morning-tasks/MorningHeader";
import { ImmediateTasksList } from "./morning-tasks/ImmediateTasksList";
import { TaskFilters } from "./morning-tasks/TaskFilters";
import { usePriorityTasks } from "../hooks/usePriorityTasks";

export const MorningPriorityTasks = () => {
  const [excludeBetaTasks, setExcludeBetaTasks] = useState<boolean>(true);
  
  const {
    sortBy,
    setSortBy,
    completionFilter,
    setCompletionFilter,
    sortedTasks,
  } = usePriorityTasks(excludeBetaTasks);

  // Identify immediate necessary tasks (non-beta tasks with high progress or low remaining time)
  const immediateNecessaryTasks = sortedTasks
    .filter(task => 
      (task.progressPercentage >= 60 || task.timeRemaining <= 6) &&
      !task.title.toLowerCase().includes("beta")
    )
    .slice(0, 2);

  return (
    <Card className="border-amber-200 bg-gradient-to-r from-amber-50 to-amber-100/30">
      <MorningHeader />

      <CardContent className="space-y-6">
        {/* Beta task toggle */}
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-amber-800">Afișează task-uri Beta</span>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setExcludeBetaTasks(!excludeBetaTasks)}
            className={cn(
              "border-amber-300",
              excludeBetaTasks ? "bg-white text-amber-800" : "bg-amber-500 text-white hover:bg-amber-600"
            )}
          >
            {excludeBetaTasks ? "Ascunse" : "Vizibile"}
          </Button>
        </div>
        
        {/* Immediate necessary tasks */}
        <ImmediateTasksList tasks={immediateNecessaryTasks} />

        {/* Task filtering controls */}
        <TaskFilters
          completionFilter={completionFilter}
          setCompletionFilter={setCompletionFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {/* Task cards */}
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {sortedTasks.length > 0 ? (
            sortedTasks.map((item, index) => (
              <RoadmapCard key={index} item={item} />
            ))
          ) : (
            <div className="col-span-2 text-center p-6 border border-dashed border-amber-300 rounded-md">
              <p className="text-amber-700">Nu există taskuri care să corespundă filtrelor.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
