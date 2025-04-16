
import { useRoadmapContext } from "../context/RoadmapContext";

export const useRoadmapProgress = () => {
  const { items } = useRoadmapContext();
  
  // Calculează statisticile bazate pe elementele disponibile
  const totalTasks = items.length;
  const completedTasks = items.filter(item => item.status === "completed").length;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  // Calculează suma dificultăților și a timpului estimat
  let difficultySum = 0;
  let estimatedTimeSum = 0;
  
  items.forEach(item => {
    if (item.timeEstimate?.total) {
      estimatedTimeSum += item.timeEstimate.total;
    }
  });
  
  return {
    totalTasks,
    completedTasks,
    completionPercentage,
    difficultySum,
    estimatedTimeSum
  };
};
