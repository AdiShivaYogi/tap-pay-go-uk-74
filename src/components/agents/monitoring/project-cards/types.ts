
import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

export interface AgentTask {
  name: string;
  completed: boolean;
  inProgress?: boolean;
}

export interface AgentProject {
  title: string;
  description: string;
  status: "în progres" | "planificat" | "finalizat";
  priority: "înaltă" | "medie" | "scăzută";
  timeframe: "zile" | "săptămâni" | "luni" | "ani";
  timeUsed: number; // ore petrecute
  timeTotal: number; // ore estimate total
  icon: LucideIcon;
  tasks: AgentTask[];
  integrationProgress?: number; // Progresul de integrare pentru proiectele din noua eră de autonomie
}
