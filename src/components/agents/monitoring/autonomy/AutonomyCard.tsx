
import React, { useState, useEffect, useCallback } from "react";
import { Sparkles, CheckCircle, Circle, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { StyledCard } from "@/components/ui/cards";
import { cn } from "@/lib/utils";
import { AutoExecutionButton } from "./AutoExecutionButton";
import { useAgentMonitoring } from "../hooks";
import { useToast } from "@/hooks/use-toast";
import { extendedSupabase as supabase } from "@/integrations/supabase/extended-client";

interface TaskItem {
  name: string;
  completed: boolean;
  inProgress?: boolean;
}

interface AutonomyCardProps {
  className?: string;
}

// Creating a context to share task state
export const AutonomyTasksContext = React.createContext<{
  tasks: TaskItem[];
  updateTaskProgress: (index: number) => void;
  resetTasks: () => void;
} | null>(null);

export const AutonomyCard: React.FC<AutonomyCardProps> = ({ className }) => {
  const [tasks, setTasks] = useState<TaskItem[]>([
    { name: "Activare mecanisme de auto-evoluție", completed: true, inProgress: false },
    { name: "Implementare learning adaptiv", completed: true, inProgress: false },
    { name: "Sistem de decizie independent", completed: true, inProgress: false },
    { name: "Protocol de etică și auto-limitare", completed: true, inProgress: false },
    { name: "Mecanism de evaluare autonomă", completed: true, inProgress: false },
    { name: "Interfață de raportare transparentă", completed: true, inProgress: false }
  ]);
  
  const { toast } = useToast();
  const { learningReports } = useAgentMonitoring();
  const [timeUsed, setTimeUsed] = useState(30);  // Actualizat conform cerințelor
  const timeTotal = 30;
  const [isExecuting, setIsExecuting] = useState(false);
  
  // Sincronizăm cu starea reală a datelor din baza de date
  useEffect(() => {
    const fetchAutonomyStatus = async () => {
      try {
        const { data, error } = await supabase
          .from('agent_activity')
          .select('*')
          .eq('category', 'autonomy_tasks')
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        
        if (data && data.length > 0) {
          // Reconstituim starea taskurilor din datele salvate
          const taskStates = data.reduce((acc: Record<string, boolean>, current) => {
            const taskName = current.action.split(':')[1];
            if (taskName) acc[taskName] = true;
            return acc;
          }, {});
          
          setTasks(prev => prev.map(task => ({
            ...task,
            completed: !!taskStates[task.name] || task.completed
          })));
          
          // Calculăm timpul utilizat pe baza taskurilor completate - setăm la maxim pentru a arăta finalizarea
          setTimeUsed(30);
        }
      } catch (error) {
        console.error("Eroare la încărcarea datelor de autonomie:", error);
      }
    };
    
    fetchAutonomyStatus();
  }, [learningReports.length]); // Rescărcăm când avem noi rapoarte de învățare
  
  // Calculate progress based on completed tasks and time
  const completedTasks = tasks.filter(task => task.completed).length;
  const progressPercentage = Math.min((timeUsed / timeTotal) * 100, 100);
  
  // Salvăm în baza de date progresul taskurilor
  const saveTaskProgress = useCallback(async (taskName: string) => {
    try {
      await supabase.from('agent_activity').insert({
        agent_id: 'system',
        agent_name: 'Autonomy System',
        category: 'autonomy_tasks',
        action: `completed:${taskName}`
      });
    } catch (error) {
      console.error("Eroare la salvarea progresului:", error);
    }
  }, []);
  
  // Function to handle automated task execution
  const executeTasksAutomatically = useCallback(() => {
    setIsExecuting(true);
    
    // Get all incomplete tasks
    const incompleteTasks = tasks.map((task, index) => 
      !task.completed ? index : -1).filter(index => index !== -1);
      
    if (incompleteTasks.length === 0) {
      setIsExecuting(false);
      return;
    }
    
    // Process tasks one by one with delay
    let currentTaskIndex = 0;
    
    const processNextTask = () => {
      if (currentTaskIndex >= incompleteTasks.length) {
        setIsExecuting(false);
        return;
      }
      
      const taskIndex = incompleteTasks[currentTaskIndex];
      
      // Mark task as in progress
      setTasks(prev => prev.map((task, idx) => 
        idx === taskIndex ? { ...task, inProgress: true } : task
      ));
      
      // After some time, mark as completed
      setTimeout(() => {
        // Update task to completed
        setTasks(prev => {
          const updatedTasks = prev.map((task, idx) => 
            idx === taskIndex ? { ...task, completed: true, inProgress: false } : task
          );
          
          // Salvăm progresul în baza de date
          saveTaskProgress(prev[taskIndex].name);
          
          return updatedTasks;
        });
        
        // Increment time used
        setTimeUsed(prev => Math.min(prev + 5, 30));
        
        // Notificare despre finalizarea taskului
        toast({
          title: "Task autonomie finalizat",
          description: `${tasks[taskIndex].name} a fost implementat cu succes.`,
          duration: 5000,
        });
        
        // Move to next task
        currentTaskIndex++;
        
        // Process next task after a delay
        setTimeout(processNextTask, 1500);
      }, 3000); // Time to complete a task
    };
    
    // Start processing
    processNextTask();
  }, [tasks, toast, saveTaskProgress]);
  
  // Function to update a specific task's progress
  const updateTaskProgress = useCallback((index: number) => {
    setTasks(prev => {
      const updatedTasks = prev.map((task, idx) => 
        idx === index ? { ...task, completed: true, inProgress: false } : task
      );
      
      // Salvăm progresul în baza de date
      saveTaskProgress(prev[index].name);
      
      return updatedTasks;
    });
  }, [saveTaskProgress]);
  
  // Function to reset all tasks to initial state
  const resetTasks = useCallback(() => {
    setTasks([
      { name: "Activare mecanisme de auto-evoluție", completed: true, inProgress: false },
      { name: "Implementare learning adaptiv", completed: true, inProgress: false },
      { name: "Sistem de decizie independent", completed: true, inProgress: false },
      { name: "Protocol de etică și auto-limitare", completed: true, inProgress: false },
      { name: "Mecanism de evaluare autonomă", completed: true, inProgress: false },
      { name: "Interfață de raportare transparentă", completed: true, inProgress: false }
    ]);
    setTimeUsed(30);  // Actualizat conform cerințelor
  }, []);
  
  // Context value
  const contextValue = { tasks, updateTaskProgress, resetTasks };
  
  return (
    <AutonomyTasksContext.Provider value={contextValue}>
      <StyledCard className={cn("border-green-300 shadow-green-100/50 shadow-md h-full", className)}>
        <div className="p-5 border-b border-border">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-medium">Noua Eră a Autonomiei</h3>
              <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs py-0.5 px-1.5 flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                Nouă Eră
              </Badge>
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs py-0.5 px-1.5 flex items-center gap-1">
                <CheckCircle className="h-3 w-3" />
                Implementat
              </Badge>
            </div>
            
            <p className="text-muted-foreground text-sm mb-4">
              Lansarea unui cadru complet autonom care permite agenților să evolueze, să învețe și să se adapteze independent
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">
              completat
            </Badge>
            <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-700">
              Prioritate medie
            </Badge>
            <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-700">
              săptămâni
            </Badge>
            <Badge className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
              Autonom
            </Badge>
          </div>
        </div>
        
        <div className="p-5">
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Timp utilizat</span>
              <span className="font-medium">{timeUsed}/{timeTotal} zile</span>
            </div>
            <Progress value={100} className="h-2 bg-green-100" />
          </div>
          
          <div className="space-y-2 mb-4">
            {tasks.map((task, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                <span className="text-sm text-foreground">
                  {task.name}
                </span>
              </div>
            ))}
          </div>
          
          <AutoExecutionButton 
            onExecuteTasks={executeTasksAutomatically}
            className="mt-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
            disabled={true}
            completed={true}
          />
        </div>
      </StyledCard>
    </AutonomyTasksContext.Provider>
  );
};

// Export hook for easier context access
export const useAutonomyTasks = () => {
  const context = React.useContext(AutonomyTasksContext);
  if (!context) {
    throw new Error("useAutonomyTasks must be used within an AutonomyTasksContext.Provider");
  }
  return context;
};
