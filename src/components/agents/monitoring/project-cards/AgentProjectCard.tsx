
import React, { useState } from "react";
import { StyledCard, StyledCardContent } from "@/components/ui/cards";
import { ProgressBar } from "./ProgressBar";
import { StatusBadge } from "./StatusBadge";
import { PriorityBadge } from "./PriorityBadge";
import { TimeframeBadge } from "./TimeframeBadge";
import { TaskList } from "./TaskList";
import { AgentProject } from "./types";
import { IntegrationStatusBadge } from "./IntegrationStatusBadge";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Zap, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { extendedSupabase as supabase } from "@/integrations/supabase/extended-client";

interface AgentProjectCardProps {
  project: AgentProject;
}

export const AgentProjectCard: React.FC<AgentProjectCardProps> = ({ project }) => {
  const IconComponent = project.icon;
  const isAutonomyProject = project.title === "Noua Eră a Autonomiei";
  const { toast } = useToast();
  const [isExecuting, setIsExecuting] = useState(false);
  const [tasks, setTasks] = useState(project.tasks);
  
  const handleAutoExecution = async () => {
    if (isExecuting) return;
    
    setIsExecuting(true);
    
    // Salvăm starea inițială pentru a putea calcula progresul
    const initialCompletedCount = tasks.filter(task => task.completed).length;
    const incompleteTasks = tasks
      .map((task, index) => !task.completed ? index : -1)
      .filter(index => index !== -1);
      
    if (incompleteTasks.length === 0) {
      setIsExecuting(false);
      return;
    }
    
    toast({
      title: "Autoexecuție inițiată",
      description: `Se inițiază execuția automată a ${incompleteTasks.length} taskuri pentru proiectul "${project.title}"`,
      duration: 3000,
    });
    
    // Procesăm taskurile unul câte unul, cu delay
    let currentTaskIndex = 0;
    
    const processNextTask = async () => {
      if (currentTaskIndex >= incompleteTasks.length) {
        setIsExecuting(false);
        
        toast({
          title: "Execuție finalizată",
          description: `Toate taskurile pentru proiectul "${project.title}" au fost executate cu succes`,
          duration: 5000,
        });
        
        // Salvăm starea finală în baza de date
        try {
          await supabase.from('agent_activity').insert({
            agent_id: 'system',
            agent_name: 'Auto Execution System',
            category: 'project_tasks',
            action: `completed:${project.title}`
          });
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
      
      // Completăm taskul după un delay
      await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 2000));
      
      // Marcăm taskul ca fiind completat
      setTasks(prev => {
        const newTasks = [...prev];
        newTasks[taskIndex] = { ...newTasks[taskIndex], completed: true, inProgress: false };
        return newTasks;
      });
      
      // Trimitem notificare
      toast({
        title: "Task finalizat",
        description: `"${taskName}" a fost implementat cu succes pentru proiectul "${project.title}"`,
        duration: 3000,
      });
      
      // Salvăm progresul în baza de date
      try {
        await supabase.from('agent_activity').insert({
          agent_id: 'system',
          agent_name: 'Auto Execution System',
          category: 'project_task',
          action: `completed:${taskName}`
        });
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
        isAutonomyProject ? "border-amber-300 shadow-amber-100/50 shadow-md" : ""
      )}
    >
      <StyledCardContent className="p-0">
        <div className="p-5 border-b border-border">
          <div className="flex justify-between items-start mb-3">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-medium">{project.title}</h3>
                {isAutonomyProject && (
                  <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs py-0.5 px-1.5 flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    Nouă Eră
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
            <StatusBadge status={project.status} />
            <PriorityBadge priority={project.priority} />
            <TimeframeBadge timeframe={project.timeframe} />
            
            {project.integrationProgress !== undefined && (
              <IntegrationStatusBadge 
                type="autonomy" 
                progress={project.integrationProgress} 
              />
            )}
          </div>
        </div>
        
        <div className="p-5">
          <ProgressBar timeUsed={project.timeUsed} timeTotal={project.timeTotal} />
          <TaskList tasks={tasks} />
          
          {/* Buton de Autoexecuție */}
          <Button
            onClick={handleAutoExecution}
            disabled={isExecuting || tasks.every(task => task.completed)}
            className={cn(
              "w-full mt-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white gap-2",
              isExecuting && "animate-pulse"
            )}
            size="sm"
          >
            {isExecuting ? (
              <Loader2 className="h-4 w-4 animate-spin text-white" />
            ) : (
              <Zap className="h-4 w-4 text-white" />
            )}
            {isExecuting ? "Execuție automată..." : "Activează Autoexecuție"}
          </Button>
        </div>
      </StyledCardContent>
    </StyledCard>
  );
};
