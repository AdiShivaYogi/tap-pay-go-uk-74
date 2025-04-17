
import React from 'react';
import { Button } from "@/components/ui/button";
import { Zap, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectAutoExecutionButtonProps {
  className?: string;
  onExecute: () => void;
  isExecuting: boolean;
  isCompleted: boolean;
  label?: string;
}

export const ProjectAutoExecutionButton: React.FC<ProjectAutoExecutionButtonProps> = ({ 
  className,
  onExecute,
  isExecuting,
  isCompleted,
  label = "Activează Autoexecuție"
}) => {
  return (
    <Button
      onClick={onExecute}
      disabled={isExecuting || isCompleted}
      className={cn(
        "w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white gap-2",
        isExecuting && "animate-pulse",
        className
      )}
      size="sm"
    >
      {isExecuting ? (
        <Loader2 className="h-4 w-4 animate-spin text-white" />
      ) : (
        <Zap className="h-4 w-4 text-white" />
      )}
      {isExecuting ? "Execuție automată..." : label}
    </Button>
  );
};
