
export interface ActivityData {
  agentId: string;
  agentName: string;
  category: string;
  taskCount: number;
  proposalCount: number;
  conversationCount: number;
  learningCount?: number;
}

export interface ActivityLog {
  id: string;
  agentId: string;
  agentName: string;
  description: string;
  category: string; // 'task', 'proposal', 'conversation', 'learning', etc.
  timestamp: string;
}

export interface AgentInteraction {
  sourceAgentId: string;
  targetAgentId: string;
  learningType: string;
  timestamp: Date;
}

export interface AgentLearningRule {
  sourceAgentId: string;
  targetAgentId: string;
  learningTypes: string[];
  interval: number; // în minute
  isActive: boolean;
  lastExecuted?: Date;
}

export interface AgentMonitoringState {
  activityData: ActivityData[];
  activityLogs: ActivityLog[];
  isLoading: boolean;
  categories: string[];
  totalActivities: number;
  autoRefresh: boolean;
  lastRefresh: Date;
  learningRules: AgentLearningRule[];
}

export interface AgentMonitoringHook extends AgentMonitoringState {
  refreshData: () => void;
  logDetailedAgentActivity: (agentId: string, description: string, category?: string) => void;
  toggleAutoRefresh: () => void;
  logAgentInteraction: (sourceAgentId: string, targetAgentId: string, learningType: string) => AgentInteraction;
  addLearningRule: (rule: Omit<AgentLearningRule, 'lastExecuted'>) => void;
  removeLearningRule: (sourceId: string, targetId: string) => void;
  toggleLearningRule: (sourceId: string, targetId: string) => void;
}
