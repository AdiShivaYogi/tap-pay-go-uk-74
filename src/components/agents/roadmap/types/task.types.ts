
export interface AgentTask {
  id: string;
  title: string;
  description: string;
  status: "completed" | "inProgress" | "planned";
  progress: number;
  category?: string;
  assigned?: boolean;
  recommendationScore?: number;
  notes?: string;
}

export interface AgentTaskExtended extends AgentTask {
  difficulty: string;
  costEstimate: string;
  recommendationScore: number;
}

export interface AgentRoadmapPanelProps {
  agentId: string | null;
  onSelectTask?: (taskId: string) => Promise<boolean>;
}
