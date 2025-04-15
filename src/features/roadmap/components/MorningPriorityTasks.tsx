
import { useState, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { roadmapItems } from "../data/roadmap-data";
import { RoadmapCard } from "./RoadmapCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Clock, Timer, CheckCircle2, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

export const MorningPriorityTasks = () => {
  const [sortBy, setSortBy] = useState<"progress" | "estimate" | "priority">("progress");
  const [completionFilter, setCompletionFilter] = useState<"all" | "nearly-done" | "started" | "stuck">("all");
  
  // Get all high priority items
  const highPriorityItems = useMemo(() => 
    roadmapItems.filter(item => item.priority === "high" && item.status === "in-progress"),
    []
  );

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

  return (
    <Card className="border-amber-200 bg-gradient-to-r from-amber-50 to-amber-100/30">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <span className="text-amber-900">Priority Tasks Manager</span>
          </CardTitle>
          <Clock className="h-5 w-5 text-amber-500" />
        </div>
        <div className="text-sm text-amber-700 mt-2">
          {new Date().toLocaleDateString('ro-RO', {weekday: 'long'})} - Focus on completing high-impact work
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Morning recommendations section */}
        {morningRecommendations.length > 0 && (
          <div className="space-y-3 p-4 bg-amber-100/50 rounded-md border border-amber-200">
            <h4 className="font-medium flex items-center gap-2">
              <Timer className="h-4 w-4 text-amber-600" />
              <span className="text-amber-900">Morning Focus Recommendations</span>
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
                        <span>{task.timeRemaining} hours left</span>
                        <span>•</span>
                        <span>{task.progressPercentage}% complete</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-amber-100 text-amber-800">
                    {task.timeRemaining <= 4 ? "Quick win" : "Nearly done"}
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
              <span className="text-sm font-medium text-amber-900">Filter by completion:</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button 
                size="sm" 
                variant={completionFilter === "all" ? "default" : "outline"}
                onClick={() => setCompletionFilter("all")}
                className={completionFilter === "all" ? "bg-amber-600 hover:bg-amber-700" : "border-amber-300 text-amber-800"}
              >
                All Tasks
              </Button>
              <Button 
                size="sm" 
                variant={completionFilter === "nearly-done" ? "default" : "outline"}
                onClick={() => setCompletionFilter("nearly-done")}
                className={completionFilter === "nearly-done" ? "bg-amber-600 hover:bg-amber-700" : "border-amber-300 text-amber-800"}
              >
                Nearly Done ({'>'}70%)
              </Button>
              <Button 
                size="sm" 
                variant={completionFilter === "started" ? "default" : "outline"}
                onClick={() => setCompletionFilter("started")}
                className={completionFilter === "started" ? "bg-amber-600 hover:bg-amber-700" : "border-amber-300 text-amber-800"}
              >
                In Progress (20-70%)
              </Button>
              <Button 
                size="sm" 
                variant={completionFilter === "stuck" ? "default" : "outline"}
                onClick={() => setCompletionFilter("stuck")}
                className={completionFilter === "stuck" ? "bg-amber-600 hover:bg-amber-700" : "border-amber-300 text-amber-800"}
              >
                Just Started ({'<'}20%)
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-amber-700" />
              <span className="text-sm font-medium text-amber-900">Sort by:</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button 
                size="sm" 
                variant={sortBy === "progress" ? "default" : "outline"}
                onClick={() => setSortBy("progress")}
                className={sortBy === "progress" ? "bg-amber-600 hover:bg-amber-700" : "border-amber-300 text-amber-800"}
              >
                Completion %
              </Button>
              <Button 
                size="sm" 
                variant={sortBy === "estimate" ? "default" : "outline"}
                onClick={() => setSortBy("estimate")}
                className={sortBy === "estimate" ? "bg-amber-600 hover:bg-amber-700" : "border-amber-300 text-amber-800"}
              >
                Time Remaining
              </Button>
              <Button 
                size="sm" 
                variant={sortBy === "priority" ? "default" : "outline"}
                onClick={() => setSortBy("priority")}
                className={sortBy === "priority" ? "bg-amber-600 hover:bg-amber-700" : "border-amber-300 text-amber-800"}
              >
                Priority
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
              <p className="text-amber-700">No high priority tasks match your filters.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
