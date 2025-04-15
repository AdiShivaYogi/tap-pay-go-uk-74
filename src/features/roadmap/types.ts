
import { ReactNode } from "react";
import { IconType as RoadmapIconType } from "./components/RoadmapIcon";

export type Status = "completed" | "in-progress" | "pending";
export type Priority = "high" | "medium" | "low";
export type Category = "product" | "development" | "infrastructure" | "security" | "devops" | "payment" | "ui" | "other" | "partnership"; // Added "partnership"
export type IconType = RoadmapIconType;

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
  category?: Category;
  details: string[];
  iconType?: IconType;
  iconColor?: string;
  timeEstimate: TimeEstimate;
}
