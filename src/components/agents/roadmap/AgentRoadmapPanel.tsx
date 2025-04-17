
import React from 'react';
import { AgentRoadmapPanelProps } from './types/task.types';
import { StyledCard, StyledCardContent } from "@/components/ui/cards";
import { TaskSortControls } from './components/TaskSortControls';
import { TasksList } from './components/TasksList';
import { PanelFooter } from './components/PanelFooter';
import { PanelHeader } from './components/PanelHeader';
import { useAgentTasks } from './hooks/useAgentTasks';

export const AgentRoadmapPanel: React.FC<AgentRoadmapPanelProps> = ({ 
  agentId,
  onSelectTask 
}) => {
  const {
    tasks,
    loading,
    assigningTask,
    isCreatingTask,
    sortBy,
    setSortBy,
    handleAssignTask,
    handleGenerateNewTaskProposal
  } = useAgentTasks(agentId);
  
  if (!agentId) {
    return null;
  }
  
  // Verificăm dacă avem un onSelectTask valid și îl înfășurăm pentru a-l trece mai departe
  const handleTaskAssignment = async (taskId: string) => {
    if (onSelectTask) {
      await handleAssignTask(taskId, onSelectTask);
    }
  };
  
  return (
    <StyledCard className="mt-4">
      <PanelHeader 
        onGenerateTask={handleGenerateNewTaskProposal}
        isCreatingTask={isCreatingTask}
      />
      
      <StyledCardContent>
        <TaskSortControls 
          sortBy={sortBy} 
          onSortChange={(newSort) => {
            console.log("Changing sort to:", newSort);
            setSortBy(newSort);
          }} 
        />
        
        <TasksList 
          tasks={tasks}
          sortBy={sortBy}
          loading={loading}
          assigningTask={assigningTask}
          isCreatingTask={isCreatingTask}
          onAssignTask={handleTaskAssignment}
          onCreateTask={handleGenerateNewTaskProposal}
        />
        
        <PanelFooter />
      </StyledCardContent>
    </StyledCard>
  );
};

export default AgentRoadmapPanel;
