
import { AgentProject } from "../types";
import { safetyInfrastructureProjects } from "./safety-projects";
import { autonomyProjects, autonomyPriorityProject } from "./autonomy-projects";
import { innovationProjects } from "./innovation-projects";
import { monitoringProjects } from "./monitoring-projects";

// Combinăm toate proiectele pentru interfața principală
export const agentProjects: AgentProject[] = [
  autonomyPriorityProject,
  ...monitoringProjects,
  ...safetyInfrastructureProjects,
  ...autonomyProjects,
  ...innovationProjects
];

export * from "./safety-projects";
export * from "./autonomy-projects";
export * from "./innovation-projects";
export * from "./monitoring-projects";
