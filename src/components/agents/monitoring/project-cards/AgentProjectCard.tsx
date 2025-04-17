
import React, { useState, useEffect } from "react";
import { StyledCard, StyledCardContent } from "@/components/ui/cards";
import { TaskList } from "./TaskList";
import { AgentProject, TaskItem } from "./types";
import { useToast } from "@/hooks/use-toast";
import { logAgentActivity } from "../hooks/utils/activity-processing";
import { useAgentMonitoring } from "../hooks";
import { 
  ProjectHeader, 
  ProjectBadges, 
  ProjectProgress,
  ExecuteButton 
} from "./components";
import { handleTaskExecution } from "./utils/execution-utils";

interface AgentProjectCardProps {
  project: AgentProject;
}

export const AgentProjectCard: React.FC<AgentProjectCardProps> = ({ project }) => {
  const isAutonomyProject = project.id === "autonomy-era";
  const { toast } = useToast();
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionComplete, setExecutionComplete] = useState(false);
  const [tasks, setTasks] = useState(project.tasks);
  const [progress, setProgress] = useState(0);
  
  const { autoExecutionStatus, saveAutoExecutionStatus } = useAgentMonitoring();
  
  // Calculăm procentul de finalizare a taskurilor
  const completedTasksCount = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const allTasksCompleted = completedTasksCount === totalTasks;
  
  // Verificăm dacă este proiectul Noua Eră a Autonomiei și setăm starea completă manual
  useEffect(() => {
    if (isAutonomyProject || project.status === "completed") {
      setExecutionComplete(true);
      setTasks(project.tasks.map(task => ({ ...task, completed: true })));
    }
  }, [isAutonomyProject, project]);
  
  // Restaurăm starea de executare din baza de date la încărcarea componentei
  useEffect(() => {
    if (autoExecutionStatus && project.id) {
      const status = autoExecutionStatus[project.id];
      if (status) {
        setExecutionComplete(status);
        // Dacă execuția este completă, marcăm toate task-urile ca fiind completate
        if (status) {
          setTasks(prevTasks => 
            prevTasks.map(task => ({ ...task, completed: true, inProgress: false }))
          );
          setProgress(100); // Setăm progresul la 100%
        }
      }
    }
  }, [autoExecutionStatus, project.id]);
  
  const handleAutoExecution = async () => {
    if (isExecuting || allTasksCompleted) return;
    
    setIsExecuting(true);
    setProgress(5); // Inițiem progresul
    
    // Procesăm succesiv fiecare task
    for (let i = 0; i < tasks.length; i++) {
      if (!tasks[i].completed) {
        await handleTaskExecution(
          tasks[i], 
          setTasks, 
          toast, 
          setProgress,
          Math.floor((i + 1) / tasks.length * 100)
        );
      }
    }
    
    // Înregistrăm activitatea
    logAgentActivity(
      project.agentId || "autonomous-agent",
      `Proiectul "${project.title}" a fost finalizat cu succes prin execuție automată`,
      "auto_execution"
    );
    
    // Salvăm starea în baza de date folosind obiectul actualizat
    if (project.id) {
      const updatedStatus = {
        ...autoExecutionStatus,
        [project.id]: true
      };
      saveAutoExecutionStatus(updatedStatus);
    }
    
    setIsExecuting(false);
    setExecutionComplete(true);
    
    // Notificare
    toast({
      title: "Execuție autonomă finalizată",
      description: `Toate taskurile pentru "${project.title}" au fost implementate cu succes.`,
      duration: 5000,
    });
  };

  return (
    <StyledCard className={
      "h-full transition-all duration-300 " + 
      (isAutonomyProject ? "border-amber-300 shadow-amber-100/50" : "")
    }>
      <ProjectHeader 
        title={project.title} 
        description={project.description}
        icon={project.icon}
        isAutonomyProject={isAutonomyProject}
        executionComplete={executionComplete}
      />
      
      <StyledCardContent>
        <ProjectBadges 
          status={project.status}
          priority={project.priority}
          timeframe={project.timeframe}
          integrationProgress={project.integrationProgress}
          isAutonomyProject={isAutonomyProject}
        />
        
        <ProjectProgress
          progress={progress}
          completedTasks={completedTasksCount}
          totalTasks={totalTasks}
          isExecuting={isExecuting}
        />
        
        <TaskList 
          tasks={tasks}
          setTasks={setTasks}
          isExecuting={isExecuting}
        />
        
        <ExecuteButton 
          onClick={handleAutoExecution}
          isExecuting={isExecuting}
          isComplete={executionComplete}
          disabled={isExecuting || executionComplete}
        />
      </StyledCardContent>
    </StyledCard>
  );
};
