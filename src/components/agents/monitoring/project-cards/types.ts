
import { LucideIcon } from "lucide-react";

export interface AgentProjectTask {
  name: string;
  completed: boolean;
}

export interface AgentProject {
  title: string;
  description: string;
  status: "în progres" | "planificat" | "finalizat";
  priority: "înaltă" | "medie" | "scăzută";
  timeframe: "zile" | "săptămâni" | "luni" | "ani";
  timeUsed: number;
  timeTotal: number;
  icon: LucideIcon;
  tasks: AgentProjectTask[];
}
