
import React from 'react';
import { AgentRoadmapPanelProps } from '../types/task.types';
import { StyledCard, StyledCardHeader, StyledCardTitle, StyledCardContent } from "@/components/ui/cards";
import { BarChart4, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TaskSortControls } from './TaskSortControls';
import { TasksList } from './TasksList';
import { PanelFooter } from './PanelFooter';
import { useAgentTasks } from '../hooks/useAgentTasks';

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
      <StyledCardHeader className="flex flex-row items-center justify-between pb-2">
        <StyledCardTitle className="flex items-center gap-2">
          <BarChart4 className="h-5 w-5 text-primary" />
          Taskuri Roadmap disponibile
        </StyledCardTitle>
        
        <Button 
          size="sm" 
          variant="outline"
          onClick={handleGenerateNewTaskProposal}
          disabled={isCreatingTask}
          className="flex items-center gap-1"
        >
          <PlusCircle className="h-3.5 w-3.5" />
          <span>Propune task nou</span>
        </Button>
      </StyledCardHeader>
      
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
