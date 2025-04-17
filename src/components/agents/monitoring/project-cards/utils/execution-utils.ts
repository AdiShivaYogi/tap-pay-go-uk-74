
import { logAgentActivity } from "../../hooks/utils/activity-processing";
import { AgentProject, TaskItem } from "../types";

export async function handleTaskExecution(
  taskIndex: number,
  tasks: (TaskItem & { inProgress?: boolean })[],
  setTasks: React.Dispatch<React.SetStateAction<(TaskItem & { inProgress?: boolean })[]>>,
  setProgress: React.Dispatch<React.SetStateAction<number>>,
  totalIncompleteTasks: number,
  currentTaskIndex: number,
  projectTitle: string,
  toast: any
) {
  const taskName = tasks[taskIndex].name;
  
  // Actualizăm starea pentru a arăta progresul
  setTasks(prev => {
    const newTasks = [...prev];
    newTasks[taskIndex] = { ...newTasks[taskIndex], inProgress: true };
    return newTasks;
  });
  
  // Calculăm și actualizăm progresul general
  const progressPercent = Math.round((currentTaskIndex + 0.5) / totalIncompleteTasks * 100);
  setProgress(progressPercent);
  
  // Completăm taskul după un delay
  await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 2000));
  
  // Marcăm taskul ca fiind completat
  setTasks(prev => {
    const newTasks = [...prev];
    newTasks[taskIndex] = { ...newTasks[taskIndex], completed: true, inProgress: false };
    return newTasks;
  });
  
  // Actualizăm progresul din nou după finalizarea taskului
  const newProgressPercent = Math.round((currentTaskIndex + 1) / totalIncompleteTasks * 100);
  setProgress(newProgressPercent);
  
  // Trimitem notificare
  toast({
    title: "Task finalizat",
    description: `"${taskName}" a fost implementat cu succes pentru proiectul "${projectTitle}"`,
    duration: 3000,
  });
  
  // Salvăm progresul în baza de date
  try {
    await logAgentActivity('system', `Task completat: ${taskName} (Proiect: ${projectTitle})`, 'project_task');
  } catch (error) {
    console.error("Eroare la salvarea progresului taskului:", error);
  }
}

export function getProjectClass(isAutonomyProject: boolean, executionComplete: boolean) {
  if (isAutonomyProject || executionComplete) {
    return "border-green-300 shadow-green-100/50 shadow-md";
  }
  return "";
}
