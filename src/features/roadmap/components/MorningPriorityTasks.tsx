
import { useState, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { roadmapItems } from "../data/roadmap-data";
import { RoadmapCard } from "./RoadmapCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Clock, Timer, CheckCircle2, Filter, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export const MorningPriorityTasks = () => {
  const [sortBy, setSortBy] = useState<"progress" | "estimate" | "priority">("progress");
  const [completionFilter, setCompletionFilter] = useState<"all" | "nearly-done" | "started" | "stuck">("all");
  const [excludeBetaTasks, setExcludeBetaTasks] = useState<boolean>(true);
  
  // Get all high priority items, excluding beta-related tasks if needed
  const highPriorityItems = useMemo(() => {
    const inProgressItems = roadmapItems.filter(item => 
      item.priority === "high" && 
      item.status === "in-progress"
    );
    
    // If excludeBetaTasks is true, filter out items with "Beta" in the title or description
    return excludeBetaTasks 
      ? inProgressItems.filter(item => 
          !item.title.toLowerCase().includes("beta") && 
          !item.description.toLowerCase().includes("beta")
        )
      : inProgressItems;
  }, [excludeBetaTasks]);

  // Calculate estimated time remaining for each task
  const tasksWithTimeRemaining = useMemo(() => {
    return highPriorityItems.map(task => {
      const timeSpent = task.timeEstimate.spent || 0;
      const totalTime = task.timeEstimate.total;
      const timeRemaining = totalTime - timeSpent;
      const progressPercentage = Math.round((timeSpent / totalTime) * 100);
      
      return {
        ...task,
        timeRemaining,
        progressPercentage,
      };
    });
  }, [highPriorityItems]);

  // Filter tasks based on completion status
  const filteredTasks = useMemo(() => {
    switch (completionFilter) {
      case "nearly-done":
        return tasksWithTimeRemaining.filter(task => task.progressPercentage >= 70);
      case "started":
        return tasksWithTimeRemaining.filter(task => task.progressPercentage >= 20 && task.progressPercentage < 70);
      case "stuck":
        return tasksWithTimeRemaining.filter(task => task.progressPercentage < 20);
      default:
        return tasksWithTimeRemaining;
    }
  }, [tasksWithTimeRemaining, completionFilter]);

  // Sort tasks based on selected criteria
  const sortedTasks = useMemo(() => {
    switch (sortBy) {
      case "progress":
        return [...filteredTasks].sort((a, b) => b.progressPercentage - a.progressPercentage);
      case "estimate":
        return [...filteredTasks].sort((a, b) => a.timeRemaining - b.timeRemaining);
      case "priority":
        // Additional sorting by an implicit priority (could be enhanced with sub-priorities)
        const priorityMapping = { high: 3, medium: 2, low: 1 };
        return [...filteredTasks].sort((a, b) => {
          // First sort by explicit priority (though all should be high here)
          const priorityDiff = (priorityMapping[b.priority || "medium"] || 0) - (priorityMapping[a.priority || "medium"] || 0);
          if (priorityDiff !== 0) return priorityDiff;
          // Then by progress as secondary criteria
          return b.progressPercentage - a.progressPercentage;
        });
      default:
        return filteredTasks;
    }
  }, [filteredTasks, sortBy]);

  // Generate morning recommendations - focus on what can be completed today
  const morningRecommendations = useMemo(() => {
    // Filter tasks that are nearly done (>70%) or can be finished in 4 hours or less
    return sortedTasks
      .filter(task => task.progressPercentage >= 70 || task.timeRemaining <= 4)
      .slice(0, 3); // Top 3 recommendations
  }, [sortedTasks]);

  // Identify immediate necessary tasks (non-beta tasks with high progress or low remaining time)
  const immediateNecessaryTasks = useMemo(() => {
    return sortedTasks
      .filter(task => 
        (task.progressPercentage >= 60 || task.timeRemaining <= 6) &&
        !task.title.toLowerCase().includes("beta")
      )
      .slice(0, 2);
  }, [sortedTasks]);

  return (
    <Card className="border-amber-200 bg-gradient-to-r from-amber-50 to-amber-100/30">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <span className="text-amber-900">Imediat Necesar</span>
          </CardTitle>
          <Clock className="h-5 w-5 text-amber-500" />
        </div>
        <div className="text-sm text-amber-700 mt-2">
          {new Date().toLocaleDateString('ro-RO', {weekday: 'long'})} - Focus pe sarcinile cu impact prioritar
        </div>
      </CardHeader>

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
        
        {/* Morning recommendations section - immediate necessary tasks */}
        {immediateNecessaryTasks.length > 0 && (
          <div className="space-y-3 p-4 bg-amber-100/50 rounded-md border border-amber-200">
            <h4 className="font-medium flex items-center gap-2">
              <Zap className="h-4 w-4 text-amber-600" />
              <span className="text-amber-900">Priorități Imediate</span>
            </h4>
            
            <div className="grid gap-3">
              {immediateNecessaryTasks.map((task, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white rounded-md border border-amber-100">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-white font-medium",
                      "bg-red-500"
                    )}>
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
        )}

        {/* Morning recommendations section - standard */}
        {morningRecommendations.length > 0 && (
          <div className="space-y-3 p-4 bg-amber-100/50 rounded-md border border-amber-200">
            <h4 className="font-medium flex items-center gap-2">
              <Timer className="h-4 w-4 text-amber-600" />
              <span className="text-amber-900">Recomandări pentru Astăzi</span>
            </h4>
            
            <div className="grid gap-3">
              {morningRecommendations.map((task, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white rounded-md border border-amber-100">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-white font-medium",
                      index === 0 ? "bg-amber-500" : "bg-amber-400"
                    )}>
                      #{index + 1}
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
                    {task.timeRemaining <= 4 ? "Quick win" : "Aproape gata"}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Task filtering controls */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-amber-700" />
              <span className="text-sm font-medium text-amber-900">Filtrare după progres:</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
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
