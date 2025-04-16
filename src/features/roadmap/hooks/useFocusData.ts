
import { useMemo } from 'react';
import { useRoadmapContext } from '../context/RoadmapContext';

// Define the expected types for the achievements, tasks, and upcoming focus items
export interface Achievement {
  title: string;
  date: string;
  description: string;
}

export interface SubTask {
  name: string;
  completed: boolean;
}

export interface Task {
  title: string;
  description: string;
  progress: number;
  priority: "high" | "medium" | "low";
  daysLeft: number;
  subtasks: SubTask[];
}

export interface UpcomingFocusItem {
  title: string;
  timeframe: string;
  priority: "high" | "medium" | "low";
}

export const useFocusData = () => {
  const { items } = useRoadmapContext();
  
  return useMemo(() => {
    // Transform completed items to achievements
    const recentAchievements: Achievement[] = items
      .filter(item => item.status === 'completed')
      .slice(0, 3)
      .map(item => ({
        title: item.title,
        date: new Date().toLocaleDateString('ro-RO'),
        description: item.description
      }));

    // Transform in-progress items to current tasks
    const currentTasks: Task[] = items
      .filter(item => item.status === 'inProgress')
      .slice(0, 2)
      .map(item => {
        const timeSpent = item.timeEstimate?.spent || 0;
        const totalTime = item.timeEstimate?.total || 1;
        const progress = Math.min(100, Math.round((timeSpent / totalTime) * 100));
        const daysLeft = Math.max(0, totalTime - timeSpent);
        
        return {
          title: item.title,
          description: item.description,
          progress,
          priority: item.priority || 'medium',
          daysLeft,
          subtasks: (item.details || []).slice(0, 3).map(detail => ({
            name: detail,
            completed: detail.includes('✓')
          }))
        };
      });

    // Transform planned items to upcoming focus
    const upcomingFocus: UpcomingFocusItem[] = items
      .filter(item => item.status === 'planned' || item.status === 'pending')
      .slice(0, 3)
      .map(item => ({
        title: item.title,
        timeframe: item.timeEstimate?.total ? `${item.timeEstimate.total} zile` : 'Planificat',
        priority: item.priority || 'medium'
      }));

    return {
      recentAchievements,
      currentTasks,
      upcomingFocus
    };
  }, [items]);
};
