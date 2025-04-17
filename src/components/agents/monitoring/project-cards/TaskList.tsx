
import React from "react";
import { TaskItem } from "./TaskItem";
import { AgentProjectTask } from "./types";

interface TaskListProps {
  tasks: AgentProjectTask[];
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
