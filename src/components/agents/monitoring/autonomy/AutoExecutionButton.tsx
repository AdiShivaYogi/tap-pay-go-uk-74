
import React from 'react';
import { Button } from "@/components/ui/button";
import { Zap, Loader2 } from "lucide-react";
import { useSafetyPanel } from "@/components/agents/monitoring/safety/hooks/useSafetyPanel";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface AutoExecutionButtonProps {
  variant?: 'default' | 'headerButton';
  className?: string;
}

export const AutoExecutionButton: React.FC<AutoExecutionButtonProps> = ({ 
  variant = 'default',
  className 
}) => {
  const [isExecuting, setIsExecuting] = React.useState(false);
  const { toast } = useToast();
  const { 
    startAutonomousExecution,
    agentsRunning
  } = useSafetyPanel();

  const handleAutoExecution = async () => {
    setIsExecuting(true);
    
    try {
      // Simulăm un delay scurt pentru a arăta feedback vizual de procesare
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Lansăm execuția autonomă a agenților
      startAutonomousExecution();
      
      toast({
        title: "Autoexecuție activată",
        description: "Toți agenții operează acum în mod complet autonom.",
        duration: 5000,
      });
    } catch (error) {
      toast({
        title: "Eroare la activarea autoexecuției",
        description: "Nu s-a putut activa modul de autoexecuție. Încercați din nou.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsExecuting(false);
    }
  };

  if (variant === 'headerButton') {
    return (
      <Button
        onClick={handleAutoExecution}
        disabled={isExecuting || agentsRunning}
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
        {agentsRunning ? "Toți Agenții Activi" : "Toți Agenții Activi"}
      </Button>
    );
  }

  return (
    <Button
      onClick={handleAutoExecution}
      disabled={isExecuting || agentsRunning}
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
      {agentsRunning ? "Autoexecuție Activată" : "Activează Autoexecuție"}
    </Button>
  );
};
