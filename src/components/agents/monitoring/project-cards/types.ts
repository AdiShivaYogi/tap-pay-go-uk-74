
import { LucideIcon } from "lucide-react";

export type ProjectStatus = "completed" | "in-progress" | "planned" | "stuck";
export type ProjectPriority = "high" | "medium" | "low";
export type ProjectTimeframe = "days" | "weeks" | "months";

export interface TaskItem {
  id?: string;
  name: string;
  description?: string;
  completed: boolean;
  inProgress?: boolean;
}

export type Task = TaskItem;

export interface AgentProject {
  id?: string;
  agentId?: string;
  title: string;
  name?: string; // Facem opțional pentru a fi compatibil cu datele existente
  description: string;
  icon: LucideIcon;
  tasks: TaskItem[];
  timeUsed: number;
  timeTotal: number;
  status: ProjectStatus;
  priority: ProjectPriority;
  timeframe: ProjectTimeframe;
  integrationProgress?: number;
}
