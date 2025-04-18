
import React from 'react';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { useQueryClient } from '@tanstack/react-query';

export const AgentTasksPanel = () => {
  const queryClient = useQueryClient();

  const handleTaskCreated = () => {
    queryClient.invalidateQueries({ queryKey: ['agent-tasks'] });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-4">Gestionare Sarcini Agenți</h2>
        <TaskForm onTaskCreated={handleTaskCreated} />
      </div>
      
      <div>
        <h3 className="text-xl font-semibold mb-4">Sarcini Active</h3>
        <TaskList />
      </div>
    </div>
  );
};
