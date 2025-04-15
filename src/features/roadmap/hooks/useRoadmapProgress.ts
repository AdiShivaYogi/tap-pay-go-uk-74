
import { roadmapItems } from "../data/roadmap-data";
import { RoadmapItem } from "../types";

export const useRoadmapProgress = () => {
  const totalItems = roadmapItems.length;
  const completedItems = roadmapItems.filter(item => item.status === "completed").length;
  const inProgressItems = roadmapItems.filter(item => item.status === "in-progress").length;
  const pendingItems = roadmapItems.filter(item => item.status === "pending").length;

  const executionScore = Math.round((completedItems / totalItems) * 100);
  const progressScore = Math.round(((completedItems + (inProgressItems * 0.5)) / totalItems) * 100);

  return {
    totalItems,
    completedItems,
    inProgressItems,
    pendingItems,
    executionScore,
    progressScore
  };
};
