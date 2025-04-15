
import { useState, useMemo } from "react";
import { roadmapItems } from "../data/roadmap-data";

export const usePriorityTasks = (excludeBetaTasks: boolean = true) => {
  const [sortBy, setSortBy] = useState<"progress" | "estimate" | "priority">("progress");
  const [completionFilter, setCompletionFilter] = useState<"all" | "nearly-done" | "started" | "stuck">("all");

  // Get all high priority items, excluding beta-related tasks if needed
  const highPriorityItems = useMemo(() => {
    const inProgressItems = roadmapItems.filter(item => 
      item.priority === "high" && 
      item.status === "in-progress"
    );
    
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
        const priorityMapping = { high: 3, medium: 2, low: 1 };
        return [...filteredTasks].sort((a, b) => {
          const priorityDiff = (priorityMapping[b.priority || "medium"] || 0) - (priorityMapping[a.priority || "medium"] || 0);
          if (priorityDiff !== 0) return priorityDiff;
          return b.progressPercentage - a.progressPercentage;
        });
      default:
        return filteredTasks;
    }
  }, [filteredTasks, sortBy]);

  return {
    sortBy,
    setSortBy,
    completionFilter,
    setCompletionFilter,
    sortedTasks,
  };
};
