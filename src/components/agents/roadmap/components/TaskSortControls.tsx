
import React from 'react';
import { Badge } from "@/components/ui/badge";

interface TaskSortControlsProps {
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export const TaskSortControls: React.FC<TaskSortControlsProps> = ({ sortBy, onSortChange }) => {
  return (
    <div className="mb-4 flex items-center gap-2">
      <span className="text-sm font-medium">Sortează după:</span>
      <div className="flex flex-wrap gap-1">
        <Badge 
          variant={sortBy === "recommended" ? "default" : "outline"}
          className="cursor-pointer"
          onClick={() => onSortChange("recommended")}
        >
          Recomandat
        </Badge>
        <Badge 
          variant={sortBy === "difficulty" ? "default" : "outline"}
          className="cursor-pointer"
          onClick={() => onSortChange("difficulty")}
        >
          Dificultate
        </Badge>
        <Badge 
          variant={sortBy === "cost" ? "default" : "outline"}
          className="cursor-pointer"
          onClick={() => onSortChange("cost")}
        >
          Cost
        </Badge>
        <Badge 
          variant={sortBy === "progress" ? "default" : "outline"}
          className="cursor-pointer"
          onClick={() => onSortChange("progress")}
        >
          Progres
        </Badge>
      </div>
    </div>
  );
};
