
import { ProjectStatus, ProjectPriority, ProjectTimeframe } from "../types";

// Map for Romanian to English status terms
export const statusMap = {
  "în progres": "in-progress",
  "planificat": "planned",
  "finalizat": "completed",
  "blocat": "stuck"
} as const;

// Map for Romanian to English priority terms
export const priorityMap = {
  "înaltă": "high",
  "medie": "medium",
  "scăzută": "low"
} as const;

// Map for Romanian to English timeframe terms
export const timeframeMap = {
  "zile": "days",
  "săptămâni": "weeks",
  "luni": "months",
  "ani": "months" // Map "ani" (years) to months for compatibility
} as const;

// Helper function to convert status string to correct type
export function convertStatus(status: string): ProjectStatus {
  return statusMap[status as keyof typeof statusMap] || "planned";
}

// Helper function to convert priority string to correct type
export function convertPriority(priority: string): ProjectPriority {
  return priorityMap[priority as keyof typeof priorityMap] || "medium";
}

// Helper function to convert timeframe string to correct type
export function convertTimeframe(timeframe: string): ProjectTimeframe {
  return timeframeMap[timeframe as keyof typeof timeframeMap] || "weeks";
}

// Helper function to normalize project data
export function normalizeProjectData(projects: any[]) {
  return projects.map(project => ({
    ...project,
    status: convertStatus(project.status as string),
    priority: convertPriority(project.priority as string),
    timeframe: convertTimeframe(project.timeframe as string)
  }));
}
