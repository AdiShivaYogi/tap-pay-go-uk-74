
import { useMemo } from "react";
import { roadmapItems } from "../data/roadmap-data";
import { RoadmapItem } from "../types";

export const useRoadmapProgress = () => {
  const totalItems = roadmapItems.length;
  const completedItems = roadmapItems.filter(item => item.status === "completed").length;
  const inProgressItems = roadmapItems.filter(item => item.status === "in-progress").length;
  const pendingItems = roadmapItems.filter(item => item.status === "pending").length;

  const executionScore = Math.round((completedItems / totalItems) * 100);
  const progressScore = Math.round(((completedItems + (inProgressItems * 0.5)) / totalItems) * 100);

  // Calculate impact of completing in-progress items
  const potentialScoreGain = useMemo(() => {
    // If we complete all in-progress items, we gain 0.5 points per item
    const scoreIncrease = Math.round((inProgressItems * 0.5 / totalItems) * 100);
    const potentialScore = executionScore + scoreIncrease;
    
    return {
      scoreIncrease,
      potentialScore
    };
  }, [inProgressItems, totalItems, executionScore]);

  // Get high-impact items (prioritized by quick wins)
  const highImpactItems = useMemo(() => {
    return roadmapItems
      .filter(item => item.status === "in-progress")
      .sort((a, b) => {
        // First prioritize by remaining time (less time = higher priority)
        const aRemaining = a.timeEstimate.total - (a.timeEstimate.spent || 0);
        const bRemaining = b.timeEstimate.total - (b.timeEstimate.spent || 0);
        
        // If similar remaining time, prioritize by priority
        if (Math.abs(aRemaining - bRemaining) < 5) {
          const priorityOrder = { high: 1, medium: 2, low: 3 };
          return (priorityOrder[a.priority || "medium"] || 2) - 
                 (priorityOrder[b.priority || "medium"] || 2);
        }
        
        return aRemaining - bRemaining;
      })
      .slice(0, 3); // Top 3 items
  }, [roadmapItems]);

  return {
    totalItems,
    completedItems,
    inProgressItems,
    pendingItems,
    executionScore,
    progressScore,
    potentialScoreGain,
    highImpactItems
  };
};
