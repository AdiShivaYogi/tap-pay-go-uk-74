
import React from "react";
import { Check } from "lucide-react";

interface TaskItemProps {
  name: string;
  completed: boolean;
}

export const TaskItem: React.FC<TaskItemProps> = ({ name, completed }) => {
  return (
    <li className="flex items-center text-sm">
      {completed ? (
        <Check className="h-4 w-4 mr-2 text-green-500" />
      ) : (
        <div className="h-4 w-4 mr-2 rounded-full border border-gray-300" />
      )}
      <span className={completed ? "" : "text-muted-foreground"}>
        {name}
      </span>
    </li>
  );
};
