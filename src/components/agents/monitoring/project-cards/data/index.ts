
import { agentProjects } from "./agent-projects";
import { AUTONOMY_PROJECTS } from "./autonomy-projects";
import { monitoringProjects } from "./monitoring-projects";
import { innovationProjects } from "./innovation-projects";
import { normalizeProjectData } from "./utils";

// Export the original projects
export { agentProjects };
export { AUTONOMY_PROJECTS };
export { monitoringProjects };
export { innovationProjects };

// Create and export normalized versions of all projects
export const normalizedAgentProjects = normalizeProjectData(agentProjects);
export const normalizedAutonomyProjects = normalizeProjectData(AUTONOMY_PROJECTS);
export const normalizedMonitoringProjects = normalizeProjectData(monitoringProjects);
export const normalizedInnovationProjects = normalizeProjectData(innovationProjects);

// Helper functions export
export * from "./utils";

// Export all categories for backwards compatibility
export const allAgentProjects = [
  ...normalizedAgentProjects,
  ...normalizedAutonomyProjects,
  ...normalizedMonitoringProjects,
  ...normalizedInnovationProjects
];
