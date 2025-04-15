import { ReactNode } from "react";

export type Status = "completed" | "in-progress" | "pending";
export type Priority = "high" | "medium" | "low";
export type IconType = "shield-check" | "info" | "clock" | "shield" | "bar-chart-4" | 
  "test-tube-2" | "check" | "alert-circle" | "file-text" | "banknote" | 
  "smartphone" | "globe" | "users" | "webhook" | "database" | "cloud" | 
  "server-crash" | "server" | "server-cog" | "cloud-cog" | "network";

export interface TimeEstimate {
  total: number;
  spent?: number;
  aiTotal?: number; // AI's estimation in hours
}

export interface RoadmapItem {
  title: string;
  description: string;
  status: Status;
  priority?: Priority;
  details: string[];
  iconType?: IconType;
  iconColor?: string;
  timeEstimate: TimeEstimate;
}
