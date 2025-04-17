
import React from "react";
import { TaskItem } from "./TaskItem";
import { AgentTask } from "./types";

interface TaskListProps {
  tasks: AgentTask[];
}

export const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <ul className="space-y-2">
      {tasks.map((task, index) => (
        <TaskItem key={index} name={task.name} completed={task.completed} />
      ))}
    </ul>
  );
};
