
import { useState, useMemo } from 'react';
import { useRoadmapContext } from '../context/RoadmapContext';
import { TaskWithProgress } from '../types/task-types';
import { RoadmapItem } from '../types';

export const usePriorityTasks = (excludeBetaTasks: boolean) => {
  const { items } = useRoadmapContext();
  const [sortBy, setSortBy] = useState<'priority' | 'progress' | 'time'>('priority');
  const [completionFilter, setCompletionFilter] = useState<'all' | 'active' | 'completed'>('active');

  const priorityTasks = useMemo(() => {
    // Filter based on beta exclusion and completion status
    let filteredTasks = items.filter(task => {
      const isBeta = task.title.toLowerCase().includes('beta');
      const isActive = task.status === "inProgress" || task.status === "planned";
      
      if (excludeBetaTasks && isBeta) return false;
      if (completionFilter === 'active' && !isActive) return false;
      if (completionFilter === 'completed' && task.status !== 'completed') return false;
      
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
