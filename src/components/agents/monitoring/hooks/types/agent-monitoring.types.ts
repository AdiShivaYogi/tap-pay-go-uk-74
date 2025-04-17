
export interface ActivityData {
  agentId: string;
  agentName: string;
  category: string;
  taskCount: number;
  proposalCount: number;
  conversationCount: number;
}

export interface ActivityLog {
  id: string;
  agentId: string;
  agentName: string;
  description: string;
  category: string; // 'task', 'proposal', 'conversation', etc.
  timestamp: string;
}

export interface AgentMonitoringState {
  activityData: ActivityData[];
  activityLogs: ActivityLog[];
  isLoading: boolean;
  categories: string[];
  totalActivities: number;
}

export interface AgentMonitoringHook extends AgentMonitoringState {
  refreshData: () => void;
  logDetailedAgentActivity: (agentId: string, description: string) => void;
}
