
import React from "react";
import { TaskItem } from "./TaskItem";
import { TaskItem as AgentTask } from "./types";

interface TaskListProps {
  tasks: (AgentTask & { inProgress?: boolean })[];
}

export const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <div className="mt-4 space-y-2">
      {tasks.map((task, index) => (
        <TaskItem 
          key={index} 
          task={task} 
        />
      ))}
    </div>
  );
};
