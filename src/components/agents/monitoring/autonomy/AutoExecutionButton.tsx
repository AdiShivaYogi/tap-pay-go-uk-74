
import React from "react";
import { Button } from "@/components/ui/button";
import { Zap, Loader2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AutoExecutionButtonProps {
  onExecuteTasks?: () => void;
  className?: string;
  disabled?: boolean;
  completed?: boolean;
}

export const AutoExecutionButton: React.FC<AutoExecutionButtonProps> = ({ 
  onExecuteTasks, 
  className,
  disabled = false,
  completed = false
}) => {
  return (
    <Button
      onClick={onExecuteTasks}
      disabled={disabled}
      className={cn(
        "w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white gap-2",
        completed && "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700",
        className
      )}
    >
      {completed ? (
        <>
          <CheckCircle2 className="h-4 w-4 text-white" />
          Toate taskurile implementate
        </>
      ) : (
        <>
          <Zap className="h-4 w-4 text-white" />
          Activează Autoexecuție
        </>
      )}
    </Button>
  );
};
