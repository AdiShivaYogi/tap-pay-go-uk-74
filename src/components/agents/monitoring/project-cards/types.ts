
import { ReactNode } from "react";

export interface AgentProjectTask {
  name: string;
  completed: boolean;
}

export interface AgentProject {
  title: string;
  description: string;
  status: "în progres" | "planificat" | "finalizat";
  priority: "înaltă" | "medie" | "scăzută";
  timeframe: "zile" | "săptămâni" | "luni";
  timeUsed: number;
  timeTotal: number;
  icon: ReactNode;
  tasks: AgentProjectTask[];
}
