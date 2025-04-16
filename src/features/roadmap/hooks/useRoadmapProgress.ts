import { useMemo } from "react";
import { useRoadmapContext } from "../context/RoadmapContext";

export const calculateTaskDifficulty = (difficulty: string): string => {
  switch (difficulty) {
    case "easy":
      return "text-green-600";
    case "medium":
      return "text-yellow-600";
    case "hard":
      return "text-red-600";
    default:
      return "text-muted-foreground";
  }
};

export const useRoadmapProgress = (categoryId?: string) => {
  const { progressStats } = useRoadmapContext();
  
  const stats = useMemo(() => {
    // If a category is specified, return category-specific stats
    if (categoryId && progressStats.categoryProgress[categoryId]) {
      const categoryStats = progressStats.categoryProgress[categoryId];
      
      return {
        totalTasks: categoryStats.totalItems,
        completedTasks: categoryStats.completedItems,
        completionPercentage: categoryStats.progressPercentage,
        difficultySum: categoryStats.difficultyScore || 5,
        estimatedTimeSum: categoryStats.timeEstimation || 7,
      };
    }
    
    // Otherwise return overall stats
    return {
      totalTasks: progressStats.totalItems,
      completedTasks: progressStats.completedItems,
      completionPercentage: Math.round((progressStats.completedItems / progressStats.totalItems) * 100),
      difficultySum: 8,
      estimatedTimeSum: 14,
    };
  }, [categoryId, progressStats]);

  return stats;
};
