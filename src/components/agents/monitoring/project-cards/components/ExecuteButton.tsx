
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2, CheckCircle2, Zap } from "lucide-react";

interface ExecuteButtonProps {
  onClick: () => void;
  isExecuting: boolean;
  isComplete: boolean;
  disabled: boolean;
}

export const ExecuteButton: React.FC<ExecuteButtonProps> = ({
  onClick,
  isExecuting,
  isComplete,
  disabled,
}) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "w-full mt-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white gap-2",
        isExecuting && "animate-pulse",
        isComplete && "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
      )}
      size="sm"
    >
      {isExecuting ? (
        <Loader2 className="h-4 w-4 animate-spin text-white" />
      ) : isComplete ? (
        <CheckCircle2 className="h-4 w-4 text-white" />
      ) : (
        <Zap className="h-4 w-4 text-white" />
      )}
      {isExecuting ? "Execuție automată..." : 
       isComplete ? "Toate taskurile implementate" : 
       "Activează Autoexecuție"}
    </Button>
  );
};
