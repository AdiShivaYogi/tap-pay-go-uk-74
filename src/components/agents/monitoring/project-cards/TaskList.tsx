
import React from "react";
import { TaskItem } from "./TaskItem";
import { TaskItem as AgentTask } from "./types";
import { Dispatch, SetStateAction } from "react";

interface TaskListProps {
  tasks: (AgentTask & { inProgress?: boolean })[];
  setTasks?: Dispatch<SetStateAction<AgentTask[]>>;
  isExecuting?: boolean;
}

export const TaskList: React.FC<TaskListProps> = ({ 
  tasks,
  setTasks,
  isExecuting 
}) => {
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
