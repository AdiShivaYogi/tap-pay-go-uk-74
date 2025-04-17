
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Zap, CheckCircle2, Lock } from "lucide-react";
import { useAgentMonitoring } from "../hooks";
import { useToast } from "@/hooks/use-toast";

export interface AutoExecutionButtonProps {
  variant?: "default" | "header";
  completed?: boolean;
  disabled?: boolean;
}

export const AutoExecutionButton: React.FC<AutoExecutionButtonProps> = ({
  variant = "default",
  completed = false,
  disabled = false
}) => {
  const { toast } = useToast();
  const { autoExecutionStatus, saveAutoExecutionStatus } = useAgentMonitoring();
  const [isExecuting, setIsExecuting] = useState(false);
  const [isComplete, setIsComplete] = useState(
    completed || (autoExecutionStatus && Object.values(autoExecutionStatus).some(status => status === true))
  );
  
  const handleExecute = () => {
    if (isExecuting || isComplete) return;
    
    setIsExecuting(true);
    
    // Simulăm procesul de activare a autonomiei complete
    setTimeout(() => {
      // Activăm toate proiectele
      const allProjects = {
        "autonomy-era": true,
        "ai-integration": true, 
        "data-processing": true,
        "security-framework": true,
        "advanced-analytics": true
      };
      
      // Salvăm starea în baza de date
      saveAutoExecutionStatus(allProjects);
      
      setIsExecuting(false);
      setIsComplete(true);
      
      toast({
        title: "Autonomie totală activată",
        description: "Toți agenții operează acum cu privilegii complete și autonomie maximă.",
      });
    }, 1500);
  };
  
  if (variant === "header") {
    return (
      <Button
        onClick={handleExecute}
        disabled={isExecuting || isComplete || disabled}
        size="sm"
        className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white gap-2"
      >
        {isExecuting ? (
          <Loader2 className="h-3 w-3 animate-spin" />
        ) : isComplete ? (
          <CheckCircle2 className="h-3 w-3" />
        ) : (
          <Zap className="h-3 w-3" />
        )}
        {isExecuting ? "Activare..." : isComplete ? "Autonomie activă" : "Activează autonomie totală"}
      </Button>
    );
  }
  
  return (
    <Button
      onClick={handleExecute}
      disabled={isExecuting || isComplete || disabled}
      className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white gap-2"
    >
      {isExecuting ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : isComplete ? (
        <CheckCircle2 className="h-4 w-4" />
      ) : (
        <Lock className="h-4 w-4" />
      )}
      {isExecuting ? "Activare privilegii..." : isComplete ? "Autonomie totală activă" : "Acordă privilegii complete"}
    </Button>
  );
};
