
import React from 'react';

interface TaskSortControlsProps {
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export const TaskSortControls: React.FC<TaskSortControlsProps> = ({ sortBy, onSortChange }) => {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm font-medium">Sortează după:</span>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          className={`rounded-full px-4 py-1 text-sm ${
            sortBy === "recommended" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => onSortChange("recommended")}
        >
          Recomandat
        </button>
        <button
          className={`rounded-full px-4 py-1 text-sm ${
            sortBy === "difficulty" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => onSortChange("difficulty")}
        >
          Dificultate
        </button>
        <button
          className={`rounded-full px-4 py-1 text-sm ${
            sortBy === "cost" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => onSortChange("cost")}
        >
          Cost
        </button>
        <button
          className={`rounded-full px-4 py-1 text-sm ${
            sortBy === "progress" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => onSortChange("progress")}
        >
          Progres
        </button>
      </div>
    </div>
  );
};
