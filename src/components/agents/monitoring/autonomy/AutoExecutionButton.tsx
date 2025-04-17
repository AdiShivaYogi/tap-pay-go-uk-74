
import React from 'react';
import { Button } from "@/components/ui/button";
import { Zap, Loader2 } from "lucide-react";
import { useSafetyPanel } from "@/components/agents/monitoring/safety/hooks/useSafetyPanel";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useAgentMonitoring } from "../hooks";

interface AutoExecutionButtonProps {
  variant?: 'default' | 'headerButton';
  className?: string;
  onExecuteTasks?: () => void;
  disabled?: boolean;
}

export const AutoExecutionButton: React.FC<AutoExecutionButtonProps> = ({ 
  variant = 'default',
  className,
  onExecuteTasks,
  disabled = false
}) => {
  const [isExecuting, setIsExecuting] = React.useState(false);
  const { toast } = useToast();
  const { 
    startAutonomousExecution,
    agentsRunning
  } = useSafetyPanel();

  // Folosim hook-ul real pentru auto-învățare
  const { executeAutoLearning } = useAgentMonitoring();

  // Progress tracking for automated tasks
  const [autoProgress, setAutoProgress] = React.useState(0);

  const handleAutoExecution = async () => {
    if (isExecuting) return;
    
    setIsExecuting(true);
    setAutoProgress(0);
    
    try {
      // Simulăm un delay scurt pentru a arăta feedback vizual de procesare
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Lansăm execuția autonomă a agenților
      startAutonomousExecution();
      
      // Inițiem auto-învățarea și autodezvoltarea
      if (executeAutoLearning) {
        executeAutoLearning();
      }

      toast({
        title: "Autoexecuție activată",
        description: "Toți agenții operează acum în mod complet autonom.",
        duration: 5000,
      });

      // Execute the tasks automation if provided
      if (onExecuteTasks) {
        onExecuteTasks();
      }

      // Simulate progress for animation effect
      const progressInterval = setInterval(() => {
        setAutoProgress(prev => {
          const newProgress = prev + 5;
          if (newProgress >= 100) {
            clearInterval(progressInterval);
            setTimeout(() => setIsExecuting(false), 500);
            return 100;
          }
          return newProgress;
        });
      }, 300);
    } catch (error) {
      toast({
        title: "Eroare la activarea autoexecuției",
        description: "Nu s-a putut activa modul de autoexecuție. Încercați din nou.",
        variant: "destructive",
        duration: 5000,
      });
      setIsExecuting(false);
    }
  };

  if (variant === 'headerButton') {
    return (
      <Button
        onClick={handleAutoExecution}
        disabled={isExecuting || agentsRunning || disabled}
        className={cn(
          "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white", 
          agentsRunning && "opacity-50 cursor-not-allowed",
          className
        )}
      >
        {isExecuting ? (
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        ) : (
          <Zap className="h-4 w-4 mr-2" />
        )}
        {agentsRunning ? "Toți Agenții Activi" : "Activează Agenții"}
      </Button>
    );
  }

  return (
    <Button
      onClick={handleAutoExecution}
      disabled={isExecuting || agentsRunning || disabled}
      className={cn(
        "w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white gap-2",
        agentsRunning && "opacity-50 cursor-not-allowed",
        isExecuting && "animate-pulse",
        className
      )}
      size="lg"
    >
      {isExecuting ? (
        <Loader2 className="h-5 w-5 animate-spin text-white" />
      ) : (
        <Zap className="h-5 w-5 text-white" />
      )}
      {isExecuting ? "Executare automată..." : agentsRunning ? "Autoexecuție Activată" : "Activează Autoexecuție"}
    </Button>
  );
};
