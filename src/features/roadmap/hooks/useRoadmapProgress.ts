
import { useMemo } from 'react';
import { useRoadmapContext } from '../context/RoadmapContext';

export const useRoadmapProgress = () => {
  const { items } = useRoadmapContext();

  return useMemo(() => {
    const totalTasks = items.length;
    const completedTasks = items.filter(item => item.status === 'completed').length;
    const completionPercentage = Math.round((completedTasks / totalTasks) * 100);
    
    // Calculate other metrics
    let difficultySum = 0;
    let estimatedTimeSum = 0;
    
    items.forEach(item => {
      estimatedTimeSum += item.timeEstimate.total;
    });
    
    return {
      totalTasks,
      completedTasks,
      completionPercentage,
      difficultySum,
      estimatedTimeSum
    };
  }, [items]);
};
