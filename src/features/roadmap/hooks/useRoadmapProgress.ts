
import { useMemo } from "react";
import { roadmapItems } from "../data/roadmap-data";
import { RoadmapItem } from "../types";

export const useRoadmapProgress = () => {
  const stats = useMemo(() => {
    const items = roadmapItems;
    const totalItems = items.length;
    const completedItems = items.filter(item => item.status === "completed").length;
    const inProgressItems = items.filter(item => item.status === "in-progress").length;
    const pendingItems = items.filter(item => item.status === "pending").length;

    // Calculate completion scores
    const executionScore = Math.round((completedItems / totalItems) * 100);
    
    // Enhanced progress calculation that weights in-progress items
    const progressScore = Math.round(
      ((completedItems + (inProgressItems * 0.5)) / totalItems) * 100
    );

    // Calculate efficiency metrics
    const timeEfficiency = items.reduce((acc, item) => {
      if (item.timeEstimate.spent && item.timeEstimate.total) {
        return acc + (item.timeEstimate.spent / item.timeEstimate.total);
      }
      return acc;
    }, 0) / items.length;

    // Calculate category completion rates
    const categoryProgress = items.reduce((acc, item) => {
      if (item.category) {
        if (!acc[item.category]) {
          acc[item.category] = {
            total: 0,
            completed: 0
          };
        }
        acc[item.category].total++;
        if (item.status === "completed") {
          acc[item.category].completed++;
        }
      }
      return acc;
    }, {} as Record<string, { total: number; completed: number }>);

    return {
      totalItems,
      completedItems,
      inProgressItems,
      pendingItems,
      executionScore,
      progressScore,
      timeEfficiency: Math.round(timeEfficiency * 100),
      categoryProgress
    };
  }, []);

  return stats;
};
