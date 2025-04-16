
import { useState, useMemo } from 'react';
import { useRoadmapContext } from '../context/RoadmapContext';
import { TaskWithProgress } from '../types/task-types';
import { RoadmapItem } from '../types';

export type CompletionFilterType = 'all' | 'nearly-done' | 'started' | 'stuck';
export type SortByType = 'priority' | 'progress' | 'estimate';

export const usePriorityTasks = (excludeBetaTasks: boolean) => {
  const { items } = useRoadmapContext();
  const [sortBy, setSortBy] = useState<SortByType>('priority');
  const [completionFilter, setCompletionFilter] = useState<CompletionFilterType>('all');

  const priorityTasks = useMemo(() => {
    // Filter based on beta exclusion and completion status
    let filteredTasks = items.filter(task => {
      const isBeta = task.title.toLowerCase().includes('beta');
      
      if (excludeBetaTasks && isBeta) return false;
      
      // Apply completion filter
      const progressPercent = task.timeEstimate.spent / task.timeEstimate.total * 100;
      
      if (completionFilter === 'nearly-done' && progressPercent < 70) return false;
      if (completionFilter === 'started' && (progressPercent < 20 || progressPercent > 70)) return false;
      if (completionFilter === 'stuck' && progressPercent >= 20) return false;
      
      return true;
    });

    // Calculate progress percentage and remaining time
    const tasksWithProgress: TaskWithProgress[] = filteredTasks.map(task => {
      const timeSpent = task.timeEstimate.spent;
      const totalTime = task.timeEstimate.total;
      const progressPercentage = Math.min(100, Math.round((timeSpent / totalTime) * 100));
      const timeRemaining = Math.max(0, totalTime - timeSpent);
      
      return {
        ...task,
        progressPercentage,
        timeRemaining
      };
    });

    // Sort based on selected criteria
    return tasksWithProgress.sort((a, b) => {
      if (sortBy === 'priority') {
        const priorityOrder: Record<string, number> = { high: 1, medium: 2, low: 3 };
        return (priorityOrder[a.priority || 'low'] - priorityOrder[b.priority || 'low']);
      } else if (sortBy === 'progress') {
        return b.progressPercentage - a.progressPercentage;
      } else {
        return a.timeRemaining - b.timeRemaining;
      }
    });
  }, [items, excludeBetaTasks, completionFilter, sortBy]);

  return {
    sortBy,
    setSortBy,
    completionFilter,
    setCompletionFilter,
    sortedTasks: priorityTasks
  };
};
