
import React from "react";
import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  timeUsed: number;
  timeTotal: number;
  completed?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  timeUsed, 
  timeTotal,
  completed = false
}) => {
  // Calculăm procentajul de progres
  const progressPercentage = Math.min((timeUsed / timeTotal) * 100, 100);
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Timp utilizat</span>
        <span className="font-medium">{timeUsed}/{timeTotal} zile</span>
      </div>
      <Progress 
        value={completed ? 100 : progressPercentage} 
        className={completed ? "h-2 bg-green-100" : "h-2"} 
      />
    </div>
  );
};
