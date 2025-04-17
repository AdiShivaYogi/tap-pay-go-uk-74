
import React, { useState, useEffect } from "react";
import { StyledCard, StyledCardContent } from "@/components/ui/cards";
import { TaskList } from "./TaskList";
import { AgentProject } from "./types";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { logAgentActivity } from "../hooks/utils/activity-processing";
import { useAgentMonitoring } from "../hooks";
import { 
  ProjectHeader, 
  ProjectBadges, 
  ProjectProgress,
  ExecuteButton 
} from "./components";
import { handleTaskExecution, getProjectClass } from "./utils/execution-utils";

interface AgentProjectCardProps {
  project: AgentProject;
}

export const AgentProjectCard: React.FC<AgentProjectCardProps> = ({ project }) => {
  const IconComponent = project.icon;
  const isAutonomyProject = project.id === "autonomy-era";
  const { toast } = useToast();
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionComplete, setExecutionComplete] = useState(false);
  const [tasks, setTasks] = useState(project.tasks);
  const [progress, setProgress] = useState(0);
  
  const { autoExecutionStatus, saveAutoExecutionStatus } = useAgentMonitoring();
  
  // Calculați procentul de finalizare a taskurilor
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
        }
      }
    }
  }, [autoExecutionStatus, project.id]);
  
  const handleAutoExecution = async () => {
    if (isExecuting || allTasksCompleted) return;
    
    setIsExecuting(true);
    setProgress(5); // Inițiem progresul
    
    // Salvăm starea inițială pentru a putea calcula progresul
    const initialCompletedCount = tasks.filter(task => task.completed).length;
    const incompleteTasks = tasks
      .map((task, index) => !task.completed ? index : -1)
      .filter(index => index !== -1);
      
    if (incompleteTasks.length === 0) {
      setIsExecuting(false);
      setExecutionComplete(true);
      
      toast({
        title: "Toate taskurile sunt deja completate",
        description: `Proiectul "${project.title}" are toate taskurile finalizate.`,
        duration: 3000,
      });
      
      // Salvăm statusul în baza de date
      if (project.id) {
        saveAutoExecutionStatus(project.id, true);
      }
      
      return;
    }
    
    toast({
      title: "Autoexecuție inițiată",
      description: `Se inițiază execuția automată a ${incompleteTasks.length} taskuri pentru proiectul "${project.title}"`,
      duration: 3000,
    });
    
    // Procesăm taskurile unul câte unul, cu delay
    let currentTaskIndex = 0;
    const totalIncompleteTasks = incompleteTasks.length;
    
    // Logăm începerea execuției automate
    await logAgentActivity('system', `Execuție automată inițiată pentru proiectul: ${project.title}`, 'auto_execution');
    
    const processNextTask = async () => {
      if (currentTaskIndex >= incompleteTasks.length) {
        setIsExecuting(false);
        setExecutionComplete(true);
        setProgress(100);
        
        toast({
          title: "Execuție finalizată",
          description: `Toate taskurile pentru proiectul "${project.title}" au fost executate cu succes`,
          duration: 5000,
        });
        
        // Salvăm starea finală în baza de date și logăm finalizarea
        try {
          await logAgentActivity('system', `Execuție automată finalizată pentru proiectul: ${project.title}`, 'auto_execution');
          
          // Salvăm statusul de finalizare în baza de date
          if (project.id) {
            saveAutoExecutionStatus(project.id, true);
          }
        } catch (error) {
          console.error("Eroare la salvarea progresului:", error);
        }
        
        return;
      }
      
      const taskIndex = incompleteTasks[currentTaskIndex];
      
      await handleTaskExecution(
        taskIndex,
        tasks,
        setTasks,
        setProgress,
        totalIncompleteTasks,
        currentTaskIndex,
        project.title,
        toast
      );
      
      // Trecem la următorul task după un delay
      currentTaskIndex++;
      await new Promise(resolve => setTimeout(resolve, 800));
      processNextTask();
    };
    
    // Începem execuția
    processNextTask();
  };
  
  return (
    <StyledCard 
      className={cn(
        "w-full h-full", 
        getProjectClass(isAutonomyProject, executionComplete)
      )}
    >
      <StyledCardContent className="p-0">
        <div className="p-5 border-b border-border">
          <ProjectHeader 
            title={project.title}
            description={project.description}
            icon={IconComponent}
            isAutonomyProject={isAutonomyProject}
            executionComplete={executionComplete}
          />
          
          <ProjectBadges 
            status={project.status}
            priority={project.priority}
            timeframe={project.timeframe}
            integrationProgress={project.integrationProgress}
            isAutonomyProject={isAutonomyProject}
          />
        </div>
        
        <div className="p-5">
          <div className="mb-4">
            <ProjectProgress 
              isExecuting={isExecuting}
              progress={progress}
              timeUsed={project.timeUsed}
              timeTotal={project.timeTotal}
              isAutonomyProject={isAutonomyProject}
              executionComplete={executionComplete}
            />
          </div>
          <TaskList tasks={tasks} />
          
          <ExecuteButton 
            onClick={handleAutoExecution}
            isExecuting={isExecuting}
            isComplete={executionComplete || isAutonomyProject}
            disabled={isExecuting || allTasksCompleted || isAutonomyProject}
          />
        </div>
      </StyledCardContent>
    </StyledCard>
  );
};
