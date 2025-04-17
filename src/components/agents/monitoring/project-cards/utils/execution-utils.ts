
import { Task } from "../types";
import { Dispatch, SetStateAction } from "react";

export const handleTaskExecution = async (
  task: Task,
  setTasks: Dispatch<SetStateAction<Task[]>>,
  toast: any,
  setProgress: (progress: number) => void,
  progressValue: number
): Promise<void> => {
  // Marcăm task-ul ca fiind în progres
  setTasks(prevTasks =>
    prevTasks.map(t =>
      t.id === task.id ? { ...t, inProgress: true } : t
    )
  );
  
  // Simulăm execuția task-ului
  await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));
  
  // Marcăm task-ul ca fiind completat
  setTasks(prevTasks =>
    prevTasks.map(t =>
      t.id === task.id ? { ...t, completed: true, inProgress: false } : t
    )
  );
  
  // Actualizăm progresul
  setProgress(progressValue);
  
  // Notificăm utilizatorul
  toast({
    title: "Task implementat",
    description: task.description,
    duration: 3000,
  });
};

export const getProjectClass = (project: any): string => {
  if (project.id === "autonomy-era") {
    return "border-amber-300 shadow-amber-100/50";
  }
  
  switch (project.status) {
    case "completed":
      return "border-green-300 shadow-green-100/50";
    case "in-progress":
      return "border-blue-300 shadow-blue-100/50";
    case "pending":
      return "border-orange-300 shadow-orange-100/50";
    default:
      return "";
  }
};
