
import React from "react";
import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  timeUsed: number;
  timeTotal: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ timeUsed, timeTotal }) => {
  return (
    <div className="mb-3">
      <div className="flex justify-between text-sm mb-1">
        <span>Timp utilizat</span>
        <span>{timeUsed}/{timeTotal} zile</span>
      </div>
      <Progress 
        value={(timeUsed / timeTotal) * 100} 
        className="h-2" 
      />
    </div>
  );
};
