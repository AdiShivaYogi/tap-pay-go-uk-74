
import { LucideIcon } from "lucide-react";

export type ProjectStatus = "completed" | "in-progress" | "planned" | "stuck";
export type ProjectPriority = "high" | "medium" | "low";
export type ProjectTimeframe = "days" | "weeks" | "months";

export interface TaskItem {
  name: string;
  completed: boolean;
  inProgress?: boolean;
}

export interface AgentProject {
  id?: string;  // Adăugăm ID pentru a putea identifica și urmări proiectele
  title: string;
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
