
import { useMemo } from 'react';
import { useRoadmapContext } from '../context/RoadmapContext';

export const useFocusData = () => {
  const { items } = useRoadmapContext();
  
  return useMemo(() => {
    // Recent achievements - completed items sorted by most recent first (assuming by timeEstimate)
    const recentAchievements = items
      .filter(item => item.status === 'completed')
      .sort((a, b) => b.timeEstimate.spent - a.timeEstimate.spent)
      .slice(0, 3);
      
    // Current tasks - items in progress sorted by priority
    const currentTasks = items
      .filter(item => item.status === 'inProgress')
      .sort((a, b) => {
        const priorityOrder: Record<string, number> = { high: 1, medium: 2, low: 3 };
        return (priorityOrder[a.priority || 'low'] - priorityOrder[b.priority || 'low']);
      })
      .slice(0, 3);
      
    // Upcoming focus - planned items sorted by priority
    const upcomingFocus = items
      .filter(item => item.status === 'planned' || item.status === 'pending')
      .sort((a, b) => {
        const priorityOrder: Record<string, number> = { high: 1, medium: 2, low: 3 };
        return (priorityOrder[a.priority || 'low'] - priorityOrder[b.priority || 'low']);
      })
      .slice(0, 3);
      
    return {
      recentAchievements,
      currentTasks,
      upcomingFocus
    };
  }, [items]);
};
