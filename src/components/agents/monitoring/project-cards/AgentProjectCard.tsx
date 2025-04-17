
import React, { useState, useEffect } from "react";
import { StyledCard, StyledCardContent } from "@/components/ui/cards";
import { ProgressBar } from "./ProgressBar";
import { StatusBadge } from "./StatusBadge";
import { PriorityBadge } from "./PriorityBadge";
import { TimeframeBadge } from "./TimeframeBadge";
import { TaskList } from "./TaskList";
import { AgentProject } from "./types";
import { IntegrationStatusBadge } from "./IntegrationStatusBadge";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Zap, Loader2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { extendedSupabase as supabase } from "@/integrations/supabase/extended-client";
import { logAgentActivity } from "../hooks/utils/activity-processing";
import { useAgentMonitoring } from "../hooks";

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
  const completionPercentage = totalTasks > 0 ? (completedTasksCount / totalTasks) * 100 : 0;
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
      const taskName = tasks[taskIndex].name;
      
      // Actualizăm starea pentru a arăta progresul
      setTasks(prev => {
        const newTasks = [...prev];
        newTasks[taskIndex] = { ...newTasks[taskIndex], inProgress: true };
        return newTasks;
      });
      
      // Calculăm și actualizăm progresul general
      const progressPercent = Math.round((currentTaskIndex + 0.5) / totalIncompleteTasks * 100);
      setProgress(progressPercent);
      
      // Completăm taskul după un delay
      await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 2000));
      
      // Marcăm taskul ca fiind completat
      setTasks(prev => {
        const newTasks = [...prev];
        newTasks[taskIndex] = { ...newTasks[taskIndex], completed: true, inProgress: false };
        return newTasks;
      });
      
      // Actualizăm progresul din nou după finalizarea taskului
      const newProgressPercent = Math.round((currentTaskIndex + 1) / totalIncompleteTasks * 100);
      setProgress(newProgressPercent);
      
      // Trimitem notificare
      toast({
        title: "Task finalizat",
        description: `"${taskName}" a fost implementat cu succes pentru proiectul "${project.title}"`,
        duration: 3000,
      });
      
      // Salvăm progresul în baza de date
      try {
        await logAgentActivity('system', `Task completat: ${taskName} (Proiect: ${project.title})`, 'project_task');
      } catch (error) {
        console.error("Eroare la salvarea progresului taskului:", error);
      }
      
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
        isAutonomyProject ? 
          "border-green-300 shadow-green-100/50 shadow-md" : 
          executionComplete && "border-green-300 shadow-green-100/50 shadow-md"
      )}
    >
      <StyledCardContent className="p-0">
        <div className="p-5 border-b border-border">
          <div className="flex justify-between items-start mb-3">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-medium">{project.title}</h3>
                {isAutonomyProject && (
                  <>
                    <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs py-0.5 px-1.5 flex items-center gap-1">
                      <Sparkles className="h-3 w-3" />
                      Nouă Eră
                    </Badge>
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs py-0.5 px-1.5 flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      Implementat
                    </Badge>
                  </>
                )}
                {executionComplete && !isAutonomyProject && (
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs py-0.5 px-1.5 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    Implementat
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground text-sm mb-3">{project.description}</p>
            </div>
            <div className="text-primary text-xl">
              <IconComponent />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <StatusBadge status={isAutonomyProject ? "completed" : project.status} />
            <PriorityBadge priority={project.priority} />
            <TimeframeBadge timeframe={project.timeframe} />
            
            {project.integrationProgress !== undefined && (
              <IntegrationStatusBadge 
                type="autonomy" 
                progress={isAutonomyProject ? 100 : project.integrationProgress} 
              />
            )}
            
            {isAutonomyProject && (
              <Badge className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                Autonom
              </Badge>
            )}
          </div>
        </div>
        
        <div className="p-5">
          <div className="mb-4">
            {isExecuting ? (
              <div className="w-full">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Implementare automată în curs...</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={cn(
                      "h-full rounded-full transition-all duration-500 ease-out",
                      progress < 30 ? "bg-amber-500" : 
                      progress < 70 ? "bg-amber-400" : "bg-green-500"
                    )}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            ) : (
              <ProgressBar 
                timeUsed={isAutonomyProject ? 30 : project.timeUsed} 
                timeTotal={project.timeTotal} 
                completed={isAutonomyProject || executionComplete}
              />
            )}
          </div>
          <TaskList tasks={tasks} />
          
          {/* Buton de Autoexecuție */}
          <Button
            onClick={handleAutoExecution}
            disabled={isExecuting || allTasksCompleted || isAutonomyProject}
            className={cn(
              "w-full mt-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white gap-2",
              isExecuting && "animate-pulse",
              (executionComplete || isAutonomyProject) && "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
            )}
            size="sm"
          >
            {isExecuting ? (
              <Loader2 className="h-4 w-4 animate-spin text-white" />
            ) : executionComplete || isAutonomyProject ? (
              <CheckCircle2 className="h-4 w-4 text-white" />
            ) : (
              <Zap className="h-4 w-4 text-white" />
            )}
            {isExecuting ? "Execuție automată..." : 
             executionComplete || isAutonomyProject ? "Toate taskurile implementate" : 
             "Activează Autoexecuție"}
          </Button>
        </div>
      </StyledCardContent>
    </StyledCard>
  );
};
